import { SectionHeading } from "@/components/sections/section-heading";

type ContentSectionProps = {
  id: string;
  title: string;
  description: string;
  className?: string;
  tone?: "light" | "blue";
};

export function ContentSection({
  id,
  title,
  description,
  className,
  tone = "light",
}: ContentSectionProps) {
  const isBlueTone = tone === "blue";

  return (
    <section
      id={id}
      className={
        isBlueTone
          ? "border-primary-700/60 bg-primary-900 scroll-mt-24 border-b"
          : "border-border/60 bg-card scroll-mt-24 border-b"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <SectionHeading
          title={title}
          description={description}
          className={className}
          width="compact"
          tone={isBlueTone ? "inverted" : "default"}
        />
      </div>
    </section>
  );
}
