import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionHeadingVariants = cva("space-y-3", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
    },
    width: {
      default: "max-w-2xl",
      compact: "max-w-xl",
      full: "max-w-none",
    },
    tone: {
      default: "",
      inverted: "",
    },
  },
  defaultVariants: {
    align: "left",
    width: "default",
    tone: "default",
  },
});

type SectionHeadingProps = VariantProps<typeof sectionHeadingVariants> & {
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  title,
  description,
  align,
  width,
  tone,
  className,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className={cn(sectionHeadingVariants({ align, width, tone }), className)}>
      <HeadingTag
        className={cn(
          "text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          tone === "inverted" ? "text-white" : "text-primary-900 dark:text-foreground",
        )}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            tone === "inverted" ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
