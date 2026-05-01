import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./Process";

const faqs = [
  {
    q: "Can I use AI to create my resume?",
    a: "Yes. ResumAI uses advanced AI to draft summaries, rewrite bullet points, suggest keywords, and tailor your resume to specific job descriptions in seconds.",
  },
  {
    q: "Does it work on mobile?",
    a: "Absolutely. The full editor, analyzer, and preview are responsive and optimized for touch on phones and tablets.",
  },
  {
    q: "How long does it take?",
    a: "Most users finish a polished, ATS-ready resume in 5–10 minutes. The analyzer returns a full report in under 30 seconds.",
  },
  {
    q: "Is this the best AI resume tool?",
    a: "ResumAI consistently scores in the top tier for ATS compatibility, design quality, and AI accuracy across independent reviews.",
  },
  {
    q: "Can I pick my own layout?",
    a: "Yes. Choose any template, swap colors, fonts, and section order, and switch between layouts at any time without losing content.",
  },
  {
    q: "Is my data secure?",
    a: "Your resume is processed locally in your browser whenever possible. We never sell data, and uploads are encrypted in transit.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about ResumAI."
        />
        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border/60 rounded-2xl px-5 shadow-card"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
