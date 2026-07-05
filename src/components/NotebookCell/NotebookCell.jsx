import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiCode,
  FiChevronRight,
  FiCircle,
  FiCheckCircle,
} from "react-icons/fi";

/*
  Design tokens (kept local so this file is drop-in):
  bg panel    #12151B
  bg panel-2  #171B22
  border      #232830
  text hi     #E7E9EE
  text muted  #8B93A1
  mint (run)  #3EE8B8
  amber (idx) #F5A623
  violet (cta)#8B7CF6
*/

export default function NotebookCell({
  step,
  title,
  description,
  code,
  outputType,
  output,
  onNext,
  initiallyCompleted = false,
}) {
  const [showCode, setShowCode] = useState(initiallyCompleted);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(initiallyCompleted);

  const runCell = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setCompleted(true);
    }, 1600);
  };

  const status = running ? "busy" : completed ? "success" : "idle";
  const statusColor =
    status === "busy" ? "#F5A623" : status === "success" ? "#3EE8B8" : "#8B93A1";
  const statusLabel =
    status === "busy" ? "kernel: busy" : status === "success" ? "kernel: idle" : "kernel: ready";

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
            cell_{String(step).padStart(2, "0")}.py
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: statusColor,
              boxShadow: status === "busy" ? `0 0 0 3px ${statusColor}33` : "none",
              animation: status === "busy" ? "pulse-dot 1s ease-in-out infinite" : "none",
            }}
          />
          <span className="font-mono text-[11px] text-[#8B93A1]">{statusLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[#F5A623] text-sm">
            In [{completed ? step : running ? "*" : " "}]:
          </span>
          <h3 className="text-xl font-semibold text-[#E7E9EE]">{title}</h3>
        </div>

        <p className="mt-2 text-[#8B93A1] text-sm leading-relaxed pl-[3.1rem]">
          {description}
        </p>

        <div className="pl-[3.1rem] mt-5">
          <button
            onClick={() => setShowCode(!showCode)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2B313B] bg-[#171B22] text-[#E7E9EE] text-sm font-mono hover:border-[#8B7CF6] hover:text-[#8B7CF6] transition-colors duration-200"
          >
            <FiCode size={14} />
            {showCode ? "Hide source" : "View source"}
          </button>

          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-lg overflow-hidden border border-[#232830]">
                  <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      padding: "1.1rem",
                      background: "#0D0F14",
                      fontSize: "13px",
                    }}
                    lineNumberStyle={{ color: "#3A414D", minWidth: "2.2em" }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>

                {!completed && (
                  <button
                    onClick={runCell}
                    disabled={running}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3EE8B8] text-[#0A0C10] font-mono text-sm font-semibold hover:brightness-95 disabled:opacity-60 transition"
                  >
                    <FiPlay size={14} />
                    {running ? "Running..." : "Run cell"}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Busy state */}
        <AnimatePresence>
          {running && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pl-[3.1rem] mt-6"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[#F5A623]">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-bounce" />
                </span>
                # executing cell...
              </div>
              <div className="w-full h-[3px] bg-[#232830] rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-[#F5A623]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-[3.1rem] mt-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <FiCheckCircle size={14} className="text-[#3EE8B8]" />
                <span className="font-mono text-xs text-[#3EE8B8]">
                  Out [{step}]: execution succeeded
                </span>
              </div>

              {outputType === "text" && (
                <div className="border-l-2 border-[#3EE8B8] bg-[#0D0F14] px-5 py-4 rounded-r-lg font-mono text-sm text-[#E7E9EE]">
                  {output}
                </div>
              )}

              {outputType === "image" && (
                <div className="rounded-lg border border-[#232830] bg-[#0D0F14] p-2">
                  <img
                    src={output}
                    alt="cell output"
                    className="rounded-md w-full"
                  />
                </div>
              )}

              <button
                onClick={onNext}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B7CF6] text-white font-mono text-sm font-semibold hover:brightness-110 transition"
              >
                Next step
                <FiChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}