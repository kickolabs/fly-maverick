// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// h3's HTTPError serializes to {"status":500,"unhandled":true,"message":"HTTPError"} —
// no stack, no cause — so a plain console.error(error) reaches the log pipeline with
// the failure detail stripped. Expand Error-like args into a string that keeps the
// message, stack, and the full cause chain.
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if (!(current instanceof Error)) {
      parts.push(typeof current === "string" ? current : safeStringify(current));
      break;
    }
    const label = depth === 0 ? "" : "caused by: ";
    const status = describeStatus(current);
    parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
    current = current.cause;
  }
  return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` (status ${value})` : "";
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

function isErrorLike(value: unknown): value is Error {
  return value instanceof Error;
}

/** Client closed the connection mid-request (refresh, navigation, HMR). Not an app failure. */
export function isClientAbortError(error: unknown, depth = 0): boolean {
  if (error == null || depth > CAUSE_DEPTH_LIMIT) return false;
  if (typeof error === "string") {
    return error === "aborted" || /operation was aborted/i.test(error);
  }
  if (!(error instanceof Error)) return false;
  if (error.name === "AbortError") return true;
  const code = (error as NodeJS.ErrnoException).code;
  if (code === "ECONNRESET" || code === "EPIPE" || code === "ABORT_ERR") return true;
  if (error.message === "aborted" || /operation was aborted/i.test(error.message)) return true;
  if (typeof error.stack === "string" && error.stack.includes("abortIncoming")) return true;
  return isClientAbortError(error.cause, depth + 1);
}

// Wrap console.error so errors logged by any layer — including h3's internal
// unhandled-error logging, which this file cannot hook directly — are both
// recorded for consumeLastCapturedError and expanded before serialization.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const errorArgs = args.filter(isErrorLike);
  // Always record first so server.ts can classify aborts after h3 swallows them.
  for (const err of errorArgs) record(err);

  // Browser/Vite often cancels in-flight SSR when navigating; don't spam the terminal.
  if (errorArgs.length > 0 && errorArgs.every((err) => isClientAbortError(err))) return;

  const expanded = args.map((arg) => {
    if (!isErrorLike(arg)) return arg;
    return describeError(arg);
  });
  originalConsoleError(...expanded);
};

/** Peek without clearing — useful when multiple normalizers run for one request. */
export function peekLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  return lastCapturedError.error;
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
