export interface LegalSectionModel {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDocumentModel {
  title: string;
  updatedAtLabel: string;
  intro: string;
  sections: LegalSectionModel[];
}

interface LegalDocumentProps {
  content: LegalDocumentModel;
}

/** Long-form text page (privacy policy, terms). All strings arrive ready to render. */
export function LegalDocument({ content }: LegalDocumentProps) {
  return (
    <article className="flex flex-col gap-8 py-6 wrap-break-word">
      <header className="flex flex-col gap-3">
        <h1 className="text-[1.75rem] font-semibold leading-snug text-text">
          {content.title}
        </h1>
        <p className="text-sm text-muted">{content.updatedAtLabel}</p>
        <p className="text-base leading-relaxed text-soft">{content.intro}</p>
      </header>

      {content.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="flex scroll-mt-6 flex-col gap-3"
        >
          <h2
            id={`${section.id}-heading`}
            className="text-xl font-semibold leading-snug text-text"
          >
            {section.heading}
          </h2>
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-soft"
            >
              {paragraph}
            </p>
          ))}
          {section.items && (
            <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-subtle">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="text-base leading-relaxed text-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
