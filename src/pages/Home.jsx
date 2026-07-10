import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";

// Add more entries here as you build out new project notebooks.
const projects = [
  {
    id: "zomato",
    title: "Zomato Data Analysis",
    file: "zomato-data-analysis-using-python.ipynb",
    difficulty: "Beginner",
    category: "Data Analytics",
    tech: ["Python", "Pandas", "Seaborn"],
    path: "/project/zomato",
    available: true,
  },
  {
    id: "airbnb",
    title: "Airbnb Booking Analysis",
    file: "airbnb-booking-analysis-using-eda.ipynb",
    difficulty: "Intermediate",
    category: "EDA",
    tech: ["Python", "Pandas", "Seaborn"],
    path: "/project/airbnb",
    available: true,
  },
  {
    id: "covid",
    title: "COVID-19 Global Data Analysis",
    file: "covid-19-global-data-analysis.ipynb",
    difficulty: "Intermediate",
    category: "Data Visualization",
    tech: ["Python", "Pandas", "Plotly"],
    path: "/project/covid",
    available: true, // flip to true once covid-step-01.png ... 12.png exist
  },
  {
    id: "imdb",
    title: "IMDb Top 250 — Scraping & Analysis",
    file: "fresh-imdb-scraping.ipynb",
    difficulty: "Advanced",
    category: "Web Scraping",
    tech: ["Python", "Selenium", "Plotly"],
    path: "/project/imdb",
    available: true, // flip to true once imdb-step-01.png ... 12.png exist
  },
  {
    id: "email-spam-detection",
    title: "Email/Chat Spam Detection using LSTM",
    file: "email-spam-detection-lstm.ipynb",
    difficulty: "Advanced",
    category: "Natural Language Processing",
    tech: ["Python", "TensorFlow", "NLTK"],
    path: "/project/email-spam-detection",
    available: true, // flip to true once spam-step-01.png ... 12.png exist
  },
  {
    id: "flipkart-review-analysis",
    title: "Flipkart Review Sentiment Analysis",
    file: "flipkart-review-sentiment-analysis.ipynb",
    difficulty: "Intermediate",
    category: "Natural Language Processing",
    tech: ["Python", "Scikit-learn", "NLTK"],
    path: "/project/flipkart-review-analysis",
    available: true, // flip to true once flipkart-step-01.png ... 12.png exist
  },
  {
    id: "ipl",
    title: "IPL 2023 Data Analysis",
    file: "ipl-2023-data-analysis-using-pandas-ai.ipynb",
    difficulty: "Intermediate",
    category: "Data Analytics",
    tech: ["Python", "Pandas AI"],
    path: "#",
    available: false,
  },

];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E7E9EE] relative overflow-hidden">
      {/* ambient grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#8B93A1 1px, transparent 1px), linear-gradient(90deg, #8B93A1 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20">
        {/* terminal intro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm text-[#3EE8B8] flex items-center gap-2"
        >
          <span className="text-[#8B93A1]">portfolio@dev:~$</span>
          <span>ls ./projects</span>
          <span className="inline-block w-[7px] h-[16px] bg-[#3EE8B8] animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          AI / ML Portfolio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-[#8B93A1] max-w-xl leading-relaxed"
        >
          Real notebooks, walked step by step — every cell, every chart,
          every decision. Open a project below to run it interactively.
        </motion.p>

        {/* project grid */}
        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              {p.available ? (
                <Link to={p.path} className="group block h-full">
                  <ProjectCard project={p} />
                </Link>
              ) : (
                <div className="opacity-50 cursor-not-allowed h-full">
                  <ProjectCard project={p} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="h-full rounded-xl border border-[#232830] bg-[#12151B] p-5 transition-colors duration-200 group-hover:border-[#8B7CF6]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#8B93A1]">
          <FiFileText size={14} />
          <span className="font-mono text-xs truncate">{project.file}</span>
        </div>
        {project.available ? (
          <FiArrowUpRight
            size={16}
            className="text-[#8B93A1] group-hover:text-[#8B7CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        ) : (
          <span className="font-mono text-[10px] text-[#8B93A1] border border-[#232830] rounded px-1.5 py-0.5">
            soon
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>

      <div className="mt-3 flex gap-2 flex-wrap">
        <span className="text-[11px] font-mono px-2 py-1 rounded bg-[#171B22] text-[#F5A623] border border-[#232830]">
          {project.difficulty}
        </span>
        <span className="text-[11px] font-mono px-2 py-1 rounded bg-[#171B22] text-[#3EE8B8] border border-[#232830]">
          {project.category}
        </span>
      </div>

      <div className="mt-3 flex gap-1.5 flex-wrap">
        {project.tech.map((t) => (
          <span key={t} className="text-[11px] text-[#8B93A1] font-mono">
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}