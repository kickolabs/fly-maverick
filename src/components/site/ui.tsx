import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image: string }) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-24">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}

export const Container = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8", className)}>{children}</div>
);
