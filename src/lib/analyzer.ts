// Lightweight client-side resume analyzer.
// Extracts text from PDF/DOCX/TXT files and computes a heuristic ATS score.
// No backend required.

const COMMON_KEYWORDS = [
  "javascript", "typescript", "react", "node", "python", "java", "sql",
  "aws", "docker", "kubernetes", "git", "agile", "scrum", "rest", "api",
  "leadership", "communication", "project management", "teamwork", "problem solving",
  "ci/cd", "testing", "html", "css", "tailwind", "figma", "design",
  "marketing", "seo", "analytics", "data", "ml", "ai",
];

const ACTION_VERBS = [
  "led", "built", "designed", "developed", "implemented", "launched", "shipped",
  "improved", "increased", "reduced", "delivered", "managed", "created", "drove",
  "owned", "architected", "optimized", "scaled",
];

export type AnalysisResult = {
  score: number;
  wordCount: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  hasContact: boolean;
  hasMetrics: boolean;
  actionVerbCount: number;
  suggestions: { type: "good" | "warn" | "bad"; text: string }[];
  preview: string;
};

export async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt")) return await file.text();
  if (name.endsWith(".pdf")) return await extractPdfText(file);
  if (name.endsWith(".docx")) return await extractDocxText(file);
  // fallback try as text
  return await file.text();
}

async function extractPdfText(file: File): Promise<string> {
  // dynamic import to avoid SSR issues
  const pdfjs: any = await import("pdfjs-dist/build/pdf.mjs");
  const workerUrl = (await import("pdfjs-dist/build/pdf.worker.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => it.str).join(" ") + "\n";
  }
  return text;
}

async function extractDocxText(file: File): Promise<string> {
  // DOCX is a zip with word/document.xml — quick & dirty extraction
  const JSZipMod: any = await import("jszip");
  const JSZip = JSZipMod.default || JSZipMod;
  const buf = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buf);
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) return "";
  return xml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function analyzeResume(text: string): AnalysisResult {
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const matchedKeywords = COMMON_KEYWORDS.filter((k) => lower.includes(k));
  const missingKeywords = COMMON_KEYWORDS
    .filter((k) => !lower.includes(k))
    .slice(0, 8);

  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.-]+/.test(text);
  const hasPhone = /(\+?\d[\d\s().-]{7,})/.test(text);
  const hasContact = hasEmail && hasPhone;

  const hasMetrics = /\d+\s?%|\$\d|\d+\+|\d+\s?(users|customers|clients|projects|years)/i.test(text);

  const actionVerbCount = ACTION_VERBS.reduce(
    (acc, v) => acc + (lower.match(new RegExp(`\\b${v}\\b`, "g"))?.length || 0),
    0,
  );

  // scoring
  let score = 40;
  score += Math.min(matchedKeywords.length * 2, 25);
  if (hasContact) score += 8;
  if (hasMetrics) score += 10;
  score += Math.min(actionVerbCount, 10);
  if (wordCount >= 250 && wordCount <= 900) score += 7;
  score = Math.max(0, Math.min(100, score));

  const suggestions: AnalysisResult["suggestions"] = [];
  if (!hasContact) {
    suggestions.push({ type: "bad", text: "Add a clear contact section with email and phone." });
  } else {
    suggestions.push({ type: "good", text: "Contact information is clearly present." });
  }
  if (!hasMetrics) {
    suggestions.push({
      type: "warn",
      text: "Quantify achievements with numbers (%, $, scale) to stand out to recruiters.",
    });
  } else {
    suggestions.push({ type: "good", text: "Great use of metrics and quantified outcomes." });
  }
  if (actionVerbCount < 5) {
    suggestions.push({
      type: "warn",
      text: "Use stronger action verbs (Led, Built, Launched, Improved) to start bullets.",
    });
  }
  if (wordCount < 250) {
    suggestions.push({ type: "warn", text: "Resume seems short — aim for 350–700 words." });
  } else if (wordCount > 900) {
    suggestions.push({ type: "warn", text: "Resume is dense — consider trimming to 1–2 pages." });
  } else {
    suggestions.push({ type: "good", text: "Resume length is in the recruiter sweet spot." });
  }
  if (missingKeywords.length) {
    suggestions.push({
      type: "warn",
      text: `Consider adding relevant keywords: ${missingKeywords.slice(0, 5).join(", ")}.`,
    });
  }

  return {
    score,
    wordCount,
    matchedKeywords,
    missingKeywords,
    hasContact,
    hasMetrics,
    actionVerbCount,
    suggestions,
    preview: text.slice(0, 600),
  };
}
