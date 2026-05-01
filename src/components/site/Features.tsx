import { motion } from "framer-motion";
import { Brain, LayoutTemplate, FileEdit, TrendingUp } from "lucide-react";
import { SectionHeading } from "./Process";

const features = [
  {
    icon: Brain,
    title: "AI Suggestions",
    desc: "Get smart recommendations to strengthen every section of your resume.",
  },
  {
    icon: LayoutTemplate,
    title: "Stunning Templates",
    desc: "Choose from premium, recruiter-approved layouts designed to stand out.",
  },
  {
    icon: FileEdit,
    title: "AI Summaries",
    desc: "Generate compelling professional summaries tailored to your target role.",
  },
  {
    icon: TrendingUp,
    title: "Salary Improvement",
    desc: "Highlight quantified achievements that justify higher pay packages.",
  },
];

export function Features() {
  return (
    <section id="features" className="section">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to land your next role"
          subtitle="Powerful AI tools, stunning design, and recruiter-tested guidance."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative bg-card rounded-3xl p-7 shadow-card border border-border/60 hover:shadow-soft hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <div className="relative">
                <span className="grid place-items-center h-12 w-12 rounded-2xl gradient-primary text-primary-foreground shadow-soft mb-5">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
