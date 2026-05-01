import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] gradient-primary p-10 md:p-20 text-center shadow-glow"
        >
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground tracking-tight">
              Get noticed, get hired faster
            </h2>
            <p className="mt-4 text-primary-foreground/85 text-lg max-w-xl mx-auto">
              Join thousands of professionals using AI to land their dream job.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/analyze">
                <Button size="xl" className="bg-white text-primary hover:bg-white/90 shadow-soft">
                  Land your dream job now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
