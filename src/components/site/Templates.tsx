import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./Process";

const templates = [
  { name: "Eclipse", accent: "from-slate-700 to-slate-900", tag: "Modern" },
  { name: "Comet", accent: "from-blue-500 to-cyan-500", tag: "Creative" },
  { name: "Nebula", accent: "from-violet-500 to-fuchsia-500", tag: "Bold" },
  { name: "Lunar", accent: "from-emerald-500 to-teal-500", tag: "Minimal" },
  { name: "Aurora", accent: "from-orange-400 to-pink-500", tag: "Vibrant" },
];

export function Templates() {
  return (
    <section id="templates" className="section bg-muted/40">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Templates"
          title="Beautiful, ATS-friendly resume templates"
          subtitle="Hand-crafted layouts that pass automated screening and impress hiring managers."
        />

        <div className="mt-14 -mx-4 px-4 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {templates.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="w-72 shrink-0 group"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card border border-border/60 bg-card hover:shadow-glow transition-all hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.accent} opacity-90`} />
                  <ResumeMock name={t.name} />
                  <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                    {t.tag}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">Free template</p>
                  </div>
                  <Button variant="glow" size="sm">Use Template</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeMock({ name }: { name: string }) {
  return (
    <div className="absolute inset-3 rounded-2xl bg-white p-4 text-[8px] text-slate-700 overflow-hidden">
      <div className="flex items-center gap-2 border-b pb-2">
        <div className="h-7 w-7 rounded-full bg-slate-200" />
        <div className="flex-1">
          <div className="h-2 w-20 bg-slate-800 rounded mb-1" />
          <div className="h-1.5 w-14 bg-slate-300 rounded" />
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="h-1.5 w-full bg-slate-200 rounded" />
        <div className="h-1.5 w-5/6 bg-slate-200 rounded" />
        <div className="h-1.5 w-4/6 bg-slate-200 rounded" />
      </div>
      <div className="mt-3">
        <div className="h-2 w-12 bg-slate-700 rounded mb-1.5" />
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-slate-200 rounded" />
          <div className="h-1.5 w-5/6 bg-slate-200 rounded" />
          <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="mt-3">
        <div className="h-2 w-10 bg-slate-700 rounded mb-1.5" />
        <div className="flex flex-wrap gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1.5 w-6 bg-slate-300 rounded" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 right-3 text-[7px] font-bold text-slate-400 uppercase tracking-wider">
        {name}
      </div>
    </div>
  );
}
