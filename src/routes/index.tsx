import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Process } from "@/components/site/Process";
import { Templates } from "@/components/site/Templates";
import { Features } from "@/components/site/Features";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ResumAI — AI Resume Analyzer & Builder" },
      {
        name: "description",
        content:
          "Build a recruiter-ready, ATS-optimized resume in minutes. Upload your CV for an instant AI analysis and score.",
      },
      { property: "og:title", content: "ResumAI — AI Resume Analyzer & Builder" },
      {
        property: "og:description",
        content: "AI-powered resume builder and ATS analyzer that helps you land interviews faster.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Process />
        <Templates />
        <Features />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
