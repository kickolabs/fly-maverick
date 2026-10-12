import { Container } from "./ui";

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <section className="pb-24 pt-36">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">This is a general summary and will be updated with Fly Maverick's final legal text.</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl font-bold">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
