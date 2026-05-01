import { motion } from "framer-motion";
import { LayoutTemplate, Wand2, Download } from "lucide-react";

const steps = [
  {
    icon: LayoutTemplate,
    title: "Choose a template",
    desc: "Pick from a curated library of recruiter-tested, ATS-friendly resume designs.",
  },
  {
    icon: Wand2,
    title: "Customize with AI",
    desc: "Let AI rewrite bullet points, suggest skills, and tailor your resume to any role.",
  },
  {
    icon: Download,
    title: "Download & apply",
    desc: "Export a clean, recruiter-ready PDF in one click and start landing interviews.",
  },
];

export function Process() {
  return (
    <section id="process" className="section">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="How it works"
          title="Create your job-winning, AI-powered resume in 3 steps"
          subtitle="From blank page to recruiter-ready in under five minutes."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6 relative">
          {/* connecting line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-card rounded-3xl p-8 shadow-card border border-border/60 hover:shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="grid place-items-center h-14 w-14 rounded-2xl gradient-primary text-primary-foreground shadow-soft">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="text-5xl font-display font-bold text-primary/15">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {eyebrow && (
        <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        {title.split(" ").map((w, i) =>
          /AI|AI-powered/.test(w) ? (
            <span key={i} className="gradient-text">{w} </span>
          ) : (
            <span key={i}>{w} </span>
          ),
        )}
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}
