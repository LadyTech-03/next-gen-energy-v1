import { SectionHeading } from "@/components/sections/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getChallengeFaqs } from "@/data/faqs";

type FaqSectionProps = {
  year?: number;
};

export function FaqSection({ year = 2026 }: FaqSectionProps) {
  const faqs = getChallengeFaqs(year);

  return (
    <section id="faq" className="border-primary-700/60 bg-primary-900 scroll-mt-24 border-b">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title="Frequently Asked Questions"
            description=""
            align="center"
            width="full"
            tone="inverted"
            className="mb-8"
          />

          <div className="rounded-lg border border-white/20 bg-white/[0.05] p-5 sm:p-6">
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="py-3 text-base font-medium text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-white/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

