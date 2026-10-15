import "./lib/error-capture";

import { consumeLastCapturedError, isClientAbortError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

/** Client already left; avoid writing a full error page into a closed socket. */
function abortedResponse(): Response {
  return new Response(null, { status: 499, statusText: "Client Closed Request" });
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response, request: Request): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  const captured = consumeLastCapturedError();
  // Client disconnect / Vite HMR abort: h3 turns these into generic HTTPError JSON.
  if (request.signal.aborted || isClientAbortError(captured)) return abortedResponse();

  if (captured != null) {
    console.error(captured);
  } else if (import.meta.env.DEV) {
    // Dev-only: original stack was not captured (h3 stripped it). Keep genuine failures loud.
    console.error(
      "SSR unhandled HTTPError with no captured cause.",
      request.method,
      new URL(request.url).pathname,
      body,
    );
  } else {
    console.error(new Error(`SSR unhandled HTTPError on ${request.method} ${new URL(request.url).pathname}`));
  }

  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response, request);
    } catch (error) {
      if (isClientAbortError(error) || request.signal.aborted) return abortedResponse();
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
