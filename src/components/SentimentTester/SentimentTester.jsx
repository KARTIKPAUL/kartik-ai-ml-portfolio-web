import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSmile, FiFrown, FiSend, FiCircle } from "react-icons/fi";

// Small hand-picked lexicon for an in-browser demo. This is NOT the trained
// Decision Tree / TF-IDF model from the notebook (that only runs offline) —
// it's a lightweight keyword scorer so visitors get a real, instant result
// without needing a Python backend.
const POSITIVE_WORDS = [
  "good",
  "great",
  "excellent",
  "amazing",
  "love",
  "loved",
  "best",
  "perfect",
  "awesome",
  "happy",
  "satisfied",
  "recommend",
  "worth",
  "quality",
  "fast",
  "nice",
  "superb",
  "fantastic",
  "wonderful",
  "impressed",
  "smooth",
  "value",
  "durable",
  "comfortable",
  "beautiful",
  "reliable",
  "affordable",
  "solid",
];

const NEGATIVE_WORDS = [
  "bad",
  "worst",
  "poor",
  "terrible",
  "awful",
  "waste",
  "disappointed",
  "disappointing",
  "broken",
  "defective",
  "slow",
  "useless",
  "horrible",
  "refund",
  "return",
  "damaged",
  "cheap",
  "fake",
  "scam",
  "faulty",
  "regret",
  "junk",
  "flimsy",
  "overpriced",
  "late",
  "missing",
  "worse",
];

function analyzeSentiment(text) {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  let score = 0;
  words.forEach((w) => {
    if (POSITIVE_WORDS.includes(w)) score += 1;
    if (NEGATIVE_WORDS.includes(w)) score -= 1;
  });
  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
}

export default function SentimentTester({ step = 12 }) {
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!review.trim()) return;
    setResult(analyzeSentiment(review));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-8 rounded-xl overflow-hidden border border-[#232830] shadow-[0_8px_30px_rgba(0,0,0,0.35)] bg-[#12151B]"
    >
      {/* Editor title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#171B22] border-b border-[#232830]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="font-mono text-xs text-[#8B93A1] ml-2">
            sentiment_predictor.py
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3EE8B8]" />
          <span className="font-mono text-[11px] text-[#8B93A1]">
            kernel: interactive
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[#F5A623] text-sm">In [{step}]:</span>
          <h3 className="text-xl font-semibold text-[#E7E9EE]">
            Try It Yourself — Live Sentiment Predictor
          </h3>
        </div>

        <p className="mt-2 text-[#8B93A1] text-sm leading-relaxed pl-[3.1rem]">
          Type a product review below and get an instant sentiment call, right
          in your browser.
        </p>

        <div className="pl-[3.1rem] mt-5">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="e.g. The build quality is excellent and delivery was super fast!"
            rows={3}
            className="w-full rounded-lg bg-[#0D0F14] border border-[#232830] px-4 py-3 text-sm text-[#E7E9EE] font-mono placeholder:text-[#4A515C] focus:outline-none focus:border-[#8B7CF6] transition-colors resize-none"
          />

          <button
            onClick={handleAnalyze}
            disabled={!review.trim()}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3EE8B8] text-[#0A0C10] font-mono text-sm font-semibold hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <FiSend size={14} />
            Analyze Sentiment
          </button>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result + review}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FiCircle size={10} className="text-[#3EE8B8]" />
                  <span className="font-mono text-xs text-[#3EE8B8]">
                    Out [{step}]: prediction ready
                  </span>
                </div>

                {result === "positive" && (
                  <div className="flex items-center gap-3 border-l-2 border-[#3EE8B8] bg-[#0D0F14] px-5 py-4 rounded-r-lg">
                    <FiSmile size={22} className="text-[#3EE8B8] shrink-0" />
                    <div>
                      <p className="font-mono text-sm text-[#3EE8B8] font-semibold">
                        Positive Review 😊
                      </p>
                      {/* <p className="text-xs text-[#8B93A1] mt-0.5">
                        Detected favorable language in your text.
                      </p> */}
                    </div>
                  </div>
                )}

                {result === "negative" && (
                  <div className="flex items-center gap-3 border-l-2 border-[#FF6B6B] bg-[#0D0F14] px-5 py-4 rounded-r-lg">
                    <FiFrown size={22} className="text-[#FF6B6B] shrink-0" />
                    <div>
                      <p className="font-mono text-sm text-[#FF6B6B] font-semibold">
                        Negative Review 😞
                      </p>
                      <p className="text-xs text-[#8B93A1] mt-0.5">
                        Detected critical or unfavorable language in your text.
                      </p>
                    </div>
                  </div>
                )}

                {result === "neutral" && (
                  <div className="flex items-center gap-3 border-l-2 border-[#F5A623] bg-[#0D0F14] px-5 py-4 rounded-r-lg">
                    <FiCircle size={22} className="text-[#F5A623] shrink-0" />
                    <div>
                      <p className="font-mono text-sm text-[#F5A623] font-semibold">
                        Neutral / Unclear 🤔
                      </p>
                      <p className="text-xs text-[#8B93A1] mt-0.5">
                        Not enough strong sentiment language to call it either
                        way.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* <p className="mt-5 text-[11px] text-[#4A515C] font-mono leading-relaxed">
            * Simplified in-browser keyword demo — not the trained TF-IDF +
            Decision Tree model from the notebook, which runs offline on the
            real dataset.
          </p> */}
        </div>
      </div>
    </motion.div>
  );
}
