import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlay,
  FiCheck,
  FiCircle,
  FiClock,
  FiLayers,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
  FiLock,
  FiAlertTriangle,
} from "react-icons/fi";
import NotebookCell from "../components/NotebookCell/NotebookCell";
import SentimentTester from "../components/SentimentTester/SentimentTester";
import registry from "../projects/registry";

export default function Project() {
  const { projectId } = useParams();
  const entry = registry[projectId];

  const [startLearning, setStartLearning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [unlockedUpTo, setUnlockedUpTo] = useState(0);

  // Reset all progress whenever the user navigates to a different project.
  useEffect(() => {
    setStartLearning(false);
    setCurrentStep(0);
    setUnlockedUpTo(0);
  }, [projectId]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#0A0C10] text-[#E7E9EE] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <FiAlertTriangle size={28} className="mx-auto text-[#F5A623]" />
          <h1 className="mt-4 text-2xl font-bold">Project not found</h1>
          <p className="mt-2 text-[#8B93A1] text-sm">
            "{projectId}" doesn't match any project in the registry yet.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-5 py-2.5 rounded-lg bg-[#8B7CF6] text-white font-mono text-sm font-semibold hover:brightness-110 transition"
          >
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const { project, steps, getImage } = entry;
  const progressPct = Math.round(((currentStep + 1) / steps.length) * 100);

  const goToStep = (index) => {
    if (index < 0 || index > unlockedUpTo || index > steps.length - 1) return;
    setCurrentStep(index);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E7E9EE]">
      <div className="max-w-6xl mx-auto px-6 py-14 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar: navigable step tracker */}
        <aside className="hidden lg:block">
          <div className="sticky top-10">
            <p className="font-mono text-xs text-[#8B93A1] mb-4 uppercase tracking-wider">
              Notebook outline
            </p>
            <ol className="space-y-1 border-l border-[#232830] pl-4">
              {steps.map((s, i) => {
                const state = !startLearning
                  ? "upcoming"
                  : i < currentStep
                  ? "done"
                  : i === currentStep
                  ? "active"
                  : "upcoming";
                const clickable = startLearning && i <= unlockedUpTo;

                return (
                  <li key={s.id} className="relative">
                    <span
                      className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        borderColor:
                          state === "done"
                            ? "#3EE8B8"
                            : state === "active"
                            ? "#8B7CF6"
                            : "#232830",
                        backgroundColor:
                          state === "done" ? "#3EE8B8" : "#0A0C10",
                      }}
                    />
                    <button
                      onClick={() => clickable && goToStep(i)}
                      disabled={!clickable}
                      className={`w-full text-left text-sm py-1.5 leading-snug flex items-center justify-between gap-2 transition-colors ${
                        state === "active"
                          ? "text-[#8B7CF6] font-medium"
                          : state === "done"
                          ? "text-[#8B93A1] hover:text-[#E7E9EE] cursor-pointer"
                          : "text-[#4A515C] cursor-not-allowed"
                      }`}
                    >
                      {s.title}
                      {!clickable && startLearning && (
                        <FiLock size={11} className="text-[#2E333C] shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        {/* Main */}
        <main>
          {/* repo header */}
          <div className="rounded-xl border border-[#232830] bg-[#12151B] p-8">
            <p className="font-mono text-xs text-[#3EE8B8]">
              projects/{project.id}
            </p>
            <h1
              className="mt-2 text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.title}
            </h1>
            <p className="mt-4 text-[#8B93A1] leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Meta icon={<FiCircle size={13} />} label="Difficulty" value={project.difficulty} />
              <Meta icon={<FiClock size={13} />} label="Duration" value={project.duration} />
              <Meta icon={<FiTag size={13} />} label="Category" value={project.category} />
              <Meta icon={<FiLayers size={13} />} label="Steps" value={project.totalSteps} />
            </div>

            <div className="mt-6 flex gap-2 flex-wrap">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#232830] bg-[#171B22] text-[#E7E9EE]"
                >
                  {t}
                </span>
              ))}
            </div>

            {!startLearning && (
              <button
                onClick={() => setStartLearning(true)}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#3EE8B8] text-[#0A0C10] font-mono text-sm font-semibold hover:brightness-95 transition"
              >
                <FiPlay size={15} />
                Start notebook
              </button>
            )}
          </div>

          {/* progress bar + prev/next (also covers mobile, where the sidebar is hidden) */}
          {startLearning && (
            <div className="mt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 rounded-full bg-[#171B22] overflow-hidden">
                  <motion.div
                    className="h-full bg-[#8B7CF6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="font-mono text-xs text-[#8B93A1] whitespace-nowrap">
                  {currentStep + 1} / {steps.length} cells
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => goToStep(currentStep - 1)}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B93A1] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#E7E9EE] transition-colors"
                >
                  <FiChevronLeft size={13} />
                  Previous cell
                </button>

                <button
                  onClick={() => goToStep(currentStep + 1)}
                  disabled={currentStep >= unlockedUpTo || currentStep === steps.length - 1}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B93A1] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#E7E9EE] transition-colors"
                >
                  Next cell
                  <FiChevronRight size={13} />
                </button>
              </div>
            </div>
          )}

          {startLearning && steps[currentStep].type === "interactive" && (
            <SentimentTester step={steps[currentStep].id} />
          )}

          {startLearning && steps[currentStep].type !== "interactive" && (
            <NotebookCell
              key={steps[currentStep].id}
              step={steps[currentStep].id}
              title={steps[currentStep].title}
              description={steps[currentStep].description}
              code={steps[currentStep].code}
              outputType={steps[currentStep].outputType}
              output={
                steps[currentStep].outputType === "image"
                  ? getImage(steps[currentStep].output)
                  : steps[currentStep].output
              }
              initiallyCompleted={currentStep < unlockedUpTo}
              onNext={() => {
                if (currentStep < steps.length - 1) {
                  const next = currentStep + 1;
                  setUnlockedUpTo((prev) => Math.max(prev, next));
                  setCurrentStep(next);
                }
              }}
            />
          )}

          {startLearning && currentStep === steps.length - 1 && (
            <div className="mt-8 flex items-center gap-2 font-mono text-sm text-[#3EE8B8]">
              <FiCheck size={16} />
              Notebook complete — every cell has run.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Meta({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[#8B93A1] text-[11px] font-mono uppercase tracking-wide">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}