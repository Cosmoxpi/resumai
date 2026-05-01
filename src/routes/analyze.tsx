import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { analyzeResume, extractText, type AnalysisResult } from "@/lib/analyzer";

export const Route = createFileRoute("/analyze")({
  component: AnalyzePage,
  head: () => ({
    meta: [
      { title: "AI Resume Analyzer · ResumAI" },
      { name: "description", content: "Upload your resume and get an instant AI-powered ATS score with actionable suggestions." },
    ],
  }),
});

function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(async (f: File) => {
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File too large. Please upload a file under 5MB.");
      return;
    }
    setFile(f);
    setLoading(true);
    setResult(null);
    try {
      const text = await extractText(f);
      if (!text || text.trim().length < 30) {
        toast.error("Could not extract text from this file.");
        setLoading(false);
        return;
      }
      // tiny delay so the loader feels deliberate
      await new Promise((r) => setTimeout(r, 600));
      const r = analyzeResume(text);
      setResult(r);
      toast.success(`Analysis complete — ATS score ${r.score}/100`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to analyze file. Try a different format.");
    } finally {
      setLoading(false);
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const reset = () => { setFile(null); setResult(null); };

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
              AI Resume Analyzer
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Get your <span className="gradient-text">ATS score</span> in seconds
            </h1>
            <p className="mt-4 text-muted-foreground">
              Upload your resume (PDF, DOCX, TXT) and get instant feedback on what to improve.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12"
              >
                <label
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={onDrop}
                  className={`relative block bg-card rounded-3xl border-2 border-dashed p-12 md:p-16 text-center cursor-pointer transition-all shadow-card ${
                    dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    className="sr-only"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    disabled={loading}
                  />
                  <div className="flex flex-col items-center gap-4">
                    {loading ? (
                      <>
                        <div className="relative">
                          <div className="h-20 w-20 rounded-full gradient-primary opacity-20 blur-xl absolute inset-0" />
                          <Loader2 className="h-16 w-16 text-primary animate-spin relative" />
                        </div>
                        <div>
                          <p className="font-semibold">Analyzing your resume…</p>
                          <p className="text-sm text-muted-foreground mt-1">{file?.name}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="grid place-items-center h-20 w-20 rounded-3xl gradient-primary text-primary-foreground shadow-glow">
                          <UploadCloud className="h-9 w-9" />
                        </span>
                        <div>
                          <p className="text-lg font-semibold">Drop your resume here, or click to browse</p>
                          <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, or TXT · up to 5MB</p>
                        </div>
                        <Button variant="hero" type="button" className="mt-2 pointer-events-none">
                          Choose File
                        </Button>
                      </>
                    )}
                  </div>
                </label>
              </motion.div>
            ) : (
              <ResultView key="result" result={result} fileName={file?.name ?? ""} onReset={reset} />
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ResultView({ result, fileName, onReset }: { result: AnalysisResult; fileName: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-12 grid lg:grid-cols-3 gap-6"
    >
      {/* Score */}
      <div className="bg-card rounded-3xl p-8 shadow-card border border-border/60 text-center">
        <ScoreRing score={result.score} />
        <h3 className="mt-4 font-semibold text-lg">ATS Score</h3>
        <p className="text-sm text-muted-foreground mt-1">{verdict(result.score)}</p>
        <div className="mt-6 flex items-center gap-2 justify-center text-sm text-muted-foreground">
          <FileText className="h-4 w-4" /> <span className="truncate max-w-[200px]">{fileName}</span>
        </div>
        <Button variant="glow" size="sm" className="mt-5" onClick={onReset}>
          <RefreshCw className="h-4 w-4" /> Analyze another
        </Button>
      </div>

      {/* Suggestions */}
      <div className="lg:col-span-2 bg-card rounded-3xl p-8 shadow-card border border-border/60">
        <h3 className="font-semibold text-lg mb-5">Suggestions</h3>
        <ul className="space-y-3">
          {result.suggestions.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 p-3 rounded-2xl bg-muted/40"
            >
              {s.type === "good" && <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />}
              {s.type === "warn" && <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />}
              {s.type === "bad" && <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />}
              <span className="text-sm leading-relaxed">{s.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
        <Stat label="Word count" value={result.wordCount.toString()} />
        <Stat label="Action verbs" value={result.actionVerbCount.toString()} />
        <Stat label="Keywords matched" value={`${result.matchedKeywords.length}/${result.matchedKeywords.length + result.missingKeywords.length}`} />
      </div>

      {/* Keywords */}
      <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-3xl p-6 shadow-card border border-border/60">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Matched Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {result.matchedKeywords.length ? result.matchedKeywords.map((k) => (
              <span key={k} className="text-xs font-medium px-3 py-1 rounded-full bg-success/10 text-success">{k}</span>
            )) : <p className="text-sm text-muted-foreground">No common keywords detected.</p>}
          </div>
        </div>
        <div className="bg-card rounded-3xl p-6 shadow-card border border-border/60">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Suggested Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {result.missingKeywords.map((k) => (
              <span key={k} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{k}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative h-40 w-40 mx-auto">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="currentColor" className="text-muted" strokeWidth="12" fill="none" />
        <motion.circle
          cx="70" cy="70" r={r} strokeWidth="12" fill="none" strokeLinecap="round"
          stroke="url(#scoreGrad)"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.69 0.16 235)" />
            <stop offset="100%" stopColor="oklch(0.78 0.14 195)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-4xl font-bold gradient-text">{score}</div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-card border border-border/60">
      <div className="text-3xl font-bold gradient-text">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function verdict(score: number) {
  if (score >= 85) return "Excellent — ready to apply.";
  if (score >= 70) return "Good — minor tweaks recommended.";
  if (score >= 50) return "Fair — several improvements needed.";
  return "Needs work — follow the suggestions below.";
}
