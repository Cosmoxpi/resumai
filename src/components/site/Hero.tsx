import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, FileType2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero pt-28 md:pt-36 pb-20 md:pb-28">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-32 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered resume analyzer
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Your <span className="gradient-text">professional AI resume</span>, ready in minutes
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Our AI resume builder saves your time and helps you craft a recruiter-ready,
            ATS-optimized resume that gets interviews faster.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/analyze">
              <Button variant="hero" size="xl">
                Create AI Resume Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/analyze">
              <Button variant="glow" size="xl">Improve My Resume</Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <Stat value="48%" label="more likely to get hired" />
            <Stat value="12%" label="better pay on average" />
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute inset-0 -z-10 rounded-[3rem] gradient-primary opacity-20 blur-2xl" />
            <img
              src={heroImg}
              alt="Professional with telescope looking at career opportunities"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />

            {/* floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-6 -left-2 md:-left-6 glass rounded-2xl shadow-card p-3 flex items-center gap-2"
            >
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="text-xs">
                <div className="font-semibold">Summary Idea</div>
                <div className="text-muted-foreground">AI suggestion ready</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-10 -right-2 md:-right-4 glass rounded-2xl shadow-card p-3 flex items-center gap-2"
            >
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-success/10 text-success">
                <FileText className="h-4 w-4" />
              </span>
              <div className="text-xs">
                <div className="font-semibold">PDF · DOCX</div>
                <div className="text-muted-foreground">Export ready</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 -right-4 md:right-2 glass rounded-2xl shadow-card p-3"
            >
              <div className="flex items-center gap-2 text-xs">
                <FileType2 className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-semibold">ATS Score</div>
                  <div className="gradient-text font-bold">92/100</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold gradient-text">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
