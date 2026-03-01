import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import CoinFlipGame from "@/components/CoinFlipGame";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import yinYangLogo from "@/assets/yin-yang-logo.png";

// ── Mac Folder Icon ──

const MacFolderIcon = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group cursor-pointer">
    <svg viewBox="0 0 80 64" className="w-20 h-16 md:w-24 md:h-20 drop-shadow-lg group-hover:scale-105 transition-transform duration-200">
      <rect x="0" y="10" width="80" height="54" rx="4" fill="#5AC8FA" opacity="0.85" />
      <path d="M0 14 Q0 10 4 10 L28 10 L32 4 Q33 2 36 2 L76 2 Q80 2 80 6 L80 14 Z" fill="#4AB8E8" />
      <rect x="0" y="18" width="80" height="46" rx="4" fill="#5AC8FA" />
      <rect x="2" y="20" width="76" height="4" rx="2" fill="white" opacity="0.15" />
    </svg>
    <span
      className="text-[11px] tracking-wide text-foreground/80 group-hover:text-foreground transition-colors text-center"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif", fontWeight: 400 }}
    >
      {label}
    </span>
  </button>
);

// ── Draggable Popup Window ──

const DraggableLabWindow = ({
  title,
  folderLabel,
  onClose,
  onFocus,
  zIndex,
  children,
}: {
  title: string;
  folderLabel: string;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  children: React.ReactNode;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posRef = useRef(position);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, canvas")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    onFocus();
  }, [onFocus]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const newPos = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y };
    posRef.current = newPos;
    setPosition(newPos);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-foreground/10 m-auto"
      style={{
        zIndex,
        width: "min(680px, calc(100vw - 1rem))",
        height: "min(80vh, calc(100vh - 2rem))",
        translate: `${position.x}px ${position.y}px`,
      }}
      onPointerDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="bg-muted/95 backdrop-blur-md border-b border-foreground/10 flex items-center px-4 py-3 shrink-0 select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex gap-2 items-center">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 transition-all group relative"
            aria-label="Close"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/60 opacity-0 group-hover:opacity-100 font-bold">✕</span>
          </button>
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>

        <div className="flex-1 flex justify-center mx-8">
          <div
            className="bg-background/60 border border-foreground/10 rounded-md px-4 py-1 text-[10px] text-foreground/40 tracking-wider flex items-center gap-2 max-w-xs w-full justify-center"
            style={{ fontFamily: "'SF Mono', 'Menlo', 'Courier New', monospace" }}
          >
            <span className="text-foreground/20">🔒</span>
            sadderdays.world/lab/{folderLabel.toLowerCase().replace(/_/g, "-")}
          </div>
        </div>

        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 bg-background">
        <div className="px-6 md:px-10 pt-8 pb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-light mb-8 text-center"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif", fontWeight: 300 }}
          >
            {title}
          </h2>
          {children}
        </div>
      </ScrollArea>
    </motion.div>,
    document.body
  );
};

// ── Main Lab Page ──

const Lab = () => {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [focusOrder, setFocusOrder] = useState<string[]>([]);
  const [cms, setCms] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.from("site_content").select("*").in("id", ["lab_title", "lab_tab_generator", "lab_tab_coinflip", "lab_tab_quiz", "lab_yin_result", "lab_yang_result"]).then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((r: { id: string; content: string }) => { map[r.id] = r.content; });
        setCms(map);
      }
    });
  }, []);

  const labTitle = cms.lab_title || "LAB";
  const tabGenerator = cms.lab_tab_generator || "GENERATOR";
  const tabCoinflip = cms.lab_tab_coinflip || "FLIP A COIN";
  const tabQuiz = cms.lab_tab_quiz || "YIN OR YANG";

  const folders = [
    { id: "generator", label: "GENERATOR", title: tabGenerator },
    { id: "coinflip", label: "FLIP_A_COIN", title: tabCoinflip },
    { id: "quiz", label: "YIN_OR_YANG", title: tabQuiz },
  ];

  const openFolder = (id: string) => {
    if (!openFolders.includes(id)) {
      setOpenFolders((prev) => [...prev, id]);
    }
    setFocusOrder((prev) => [...prev.filter((n) => n !== id), id]);
  };

  const closeFolder = (id: string) => {
    setOpenFolders((prev) => prev.filter((n) => n !== id));
    setFocusOrder((prev) => prev.filter((n) => n !== id));
  };

  const closeAll = () => {
    setOpenFolders([]);
    setFocusOrder([]);
  };

  const focusFolder = (id: string) => {
    setFocusOrder((prev) => [...prev.filter((n) => n !== id), id]);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-5xl md:text-8xl tracking-tighter-custom text-foreground text-center relative z-10 mb-12"
        >
          {labTitle}
        </motion.h1>

        {/* Mac Folder Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-10 md:gap-16 relative z-10"
        >
          {folders.map((folder) => (
            <MacFolderIcon
              key={folder.id}
              label={folder.label}
              onClick={() => openFolder(folder.id)}
            />
          ))}
        </motion.div>
      </div>
      <Footer />

      {/* Popups via Portal */}
      {createPortal(
        <>
          {openFolders.length > 1 && (
            <button
              onClick={closeAll}
              className="fixed top-4 right-4 z-[200] text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground border border-foreground/20 hover:border-foreground/60 rounded-md px-3 py-1.5 bg-background/80 backdrop-blur-sm transition-colors"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif" }}
            >
              Close All
            </button>
          )}
          <AnimatePresence>
            {openFolders.map((id, i) => {
              const folder = folders.find((f) => f.id === id)!;
              const zIdx = 100 + (focusOrder.indexOf(id) >= 0 ? focusOrder.indexOf(id) : i);
              return (
                <DraggableLabWindow
                  key={id}
                  title={folder.title}
                  folderLabel={folder.label}
                  onClose={() => closeFolder(id)}
                  onFocus={() => focusFolder(id)}
                  zIndex={zIdx}
                >
                  {id === "generator" && <YinYangGenerator />}
                  {id === "coinflip" && <CoinFlipGame />}
                  {id === "quiz" && <QuizSection yinResult={cms.lab_yin_result} yangResult={cms.lab_yang_result} />}
                </DraggableLabWindow>
              );
            })}
          </AnimatePresence>
        </>,
        document.body
      )}
    </PageTransition>
  );
};

// ── Generator ──

const YinYangGenerator = () => {
  const [text, setText] = useState("SADDER DAYS");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !logoRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 600;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);

    const logo = logoRef.current;
    const logoSize = size * 0.6;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    const displayText = text.toUpperCase();
    ctx.save();
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#0A0A0A";

    const centerX = size / 2;
    const centerY = size / 2;
    const textRadius = size * 0.42;

    for (let i = 0; i < displayText.length; i++) {
      const angle = -Math.PI / 2 + (i - displayText.length / 2 + 0.5) * 0.12;
      const x = centerX + Math.cos(angle) * textRadius;
      const y = centerY + Math.sin(angle) * textRadius;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(displayText[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }, [text]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      logoRef.current = img;
      generateImage();
    };
    img.src = yinYangLogo;
  }, [generateImage]);

  useEffect(() => {
    if (logoRef.current) generateImage();
  }, [text, generateImage]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `sadderdays-${text.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-10">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 20))}
          maxLength={20}
          placeholder="YOUR TEXT"
          className="w-full bg-transparent border-b-2 border-foreground py-4 text-2xl md:text-3xl font-display tracking-tighter-custom placeholder:text-muted-foreground focus:outline-none text-center"
        />
      </div>
      <div className="aspect-square bg-muted/10 mb-10 border border-border">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
      </div>
      <button
        onClick={downloadImage}
        className="text-sm tracking-widest-custom editorial-link flex items-center justify-center gap-3 mx-auto"
      >
        DOWNLOAD <Download size={14} />
      </button>
    </div>
  );
};

// ── Quiz ──

const defaultQuizQuestions = [
  { question: "When you close your eyes, do you see...", options: [{ text: "Light fading into softness", side: "yin" }, { text: "Deep shadows with hidden depths", side: "yang" }] },
  { question: "Your energy peaks during...", options: [{ text: "The quiet hours before dawn", side: "yin" }, { text: "The electric midnight", side: "yang" }] },
  { question: "In music, you're drawn to...", options: [{ text: "Ethereal, floating melodies", side: "yin" }, { text: "Heavy, grounding bass", side: "yang" }] },
  { question: "Your ideal space feels...", options: [{ text: "Open, minimal, breathing", side: "yin" }, { text: "Dense, layered, intimate", side: "yang" }] },
  { question: "You process emotions by...", options: [{ text: "Letting them flow and release", side: "yin" }, { text: "Channeling them into action", side: "yang" }] },
];

const QuizSection = ({ yinResult, yangResult }: { yinResult?: string; yangResult?: string }) => {
  const [quizQuestions, setQuizQuestions] = useState(defaultQuizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<"yin" | "yang" | null>(null);

  useEffect(() => {
    supabase.from("site_content").select("content").eq("id", "lab_quiz_questions").single().then(({ data }) => {
      if (data?.content) {
        try {
          const parsed = JSON.parse(data.content);
          if (parsed.length > 0) setQuizQuestions(parsed);
        } catch { /* use defaults */ }
      }
    });
  }, []);

  const handleAnswer = (side: string) => {
    const newAnswers = [...answers, side];
    setAnswers(newAnswers);
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 200);
    } else {
      const yinCount = newAnswers.filter((a) => a === "yin").length;
      setResult(yinCount >= 3 ? "yin" : "yang");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
            <h2 className="text-8xl md:text-[10rem] font-display tracking-tighter-custom mb-8">
              {result === "yin" ? "YIN" : "YANG"}
            </h2>
            <p className="text-base text-muted-foreground mb-12 max-w-md mx-auto">
              {result === "yin"
                ? (yinResult || "You embrace the quiet, the subtle, the flowing. Your energy is receptive and transformative.")
                : (yangResult || "You embody the active, the bold, the dynamic. Your energy is creative and initiating.")}
            </p>
            <button onClick={resetQuiz} className="text-sm tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground">
              RETAKE
            </button>
          </motion.div>
        ) : (
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex gap-3 mb-16">
              {quizQuestions.map((_, index) => (
                <div key={index} className={`h-0.5 flex-1 transition-colors ${index <= currentQuestion ? "bg-foreground" : "bg-border"}`} />
              ))}
            </div>
            <p className="text-sm tracking-widest-custom text-muted-foreground mb-10">
              {currentQuestion + 1} / {quizQuestions.length}
            </p>
            <h2 className="text-3xl md:text-5xl font-display tracking-tighter-custom mb-16">
              {quizQuestions[currentQuestion].question}
            </h2>
            <div className="space-y-6">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 8 }}
                  onClick={() => handleAnswer(option.side)}
                  className="w-full py-6 text-left border-b-2 border-border hover:border-foreground transition-colors group text-lg flex justify-between items-center"
                >
                  <span>{option.text}</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lab;
