import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import CoinFlipGame from "@/components/CoinFlipGame";
import { supabase } from "@/integrations/supabase/client";
import yinYangLogo from "@/assets/yin-yang-logo.png";

const Lab = () => {
  const [activeTab, setActiveTab] = useState<"generator" | "coinflip" | "quiz">("generator");

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="w-full max-w-2xl text-center">
          {/* Massive heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-[8rem] md:text-[12rem] lg:text-[16rem] tracking-tighter-custom leading-none mb-12"
          >
            LAB
          </motion.h1>

          {/* Tabs - larger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-12 mb-16"
          >
            {[
              { id: "generator", label: "GENERATOR" },
              { id: "coinflip", label: "FLIP A COIN" },
              { id: "quiz", label: "YIN OR YANG" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "generator" | "coinflip" | "quiz")}
                className={`text-sm tracking-widest-custom transition-all ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "generator" && <YinYangGenerator key="generator" />}
            {activeTab === "coinflip" && <CoinFlipGame key="coinflip" />}
            {activeTab === "quiz" && <QuizSection key="quiz" />}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

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

    // White background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);

    // Draw the yin yang logo
    const logo = logoRef.current;
    const logoSize = size * 0.6;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    // Draw text curved around
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
    if (logoRef.current) {
      generateImage();
    }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Input */}
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

      {/* Canvas */}
      <div className="aspect-square bg-muted/10 mb-10 border border-border">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
      </div>

      {/* Download */}
      <button
        onClick={downloadImage}
        className="text-sm tracking-widest-custom editorial-link flex items-center justify-center gap-3 mx-auto"
      >
        DOWNLOAD <Download size={14} />
      </button>
    </motion.div>
  );
};

const defaultQuizQuestions = [
  {
    question: "When you close your eyes, do you see...",
    options: [
      { text: "Light fading into softness", side: "yin" },
      { text: "Deep shadows with hidden depths", side: "yang" },
    ],
  },
  {
    question: "Your energy peaks during...",
    options: [
      { text: "The quiet hours before dawn", side: "yin" },
      { text: "The electric midnight", side: "yang" },
    ],
  },
  {
    question: "In music, you're drawn to...",
    options: [
      { text: "Ethereal, floating melodies", side: "yin" },
      { text: "Heavy, grounding bass", side: "yang" },
    ],
  },
  {
    question: "Your ideal space feels...",
    options: [
      { text: "Open, minimal, breathing", side: "yin" },
      { text: "Dense, layered, intimate", side: "yang" },
    ],
  },
  {
    question: "You process emotions by...",
    options: [
      { text: "Letting them flow and release", side: "yin" },
      { text: "Channeling them into action", side: "yang" },
    ],
  },
];

const QuizSection = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <h2 className="text-8xl md:text-[10rem] font-display tracking-tighter-custom mb-8">
              {result === "yin" ? "YIN" : "YANG"}
            </h2>
            <p className="text-base text-muted-foreground mb-12 max-w-md mx-auto">
              {result === "yin"
                ? "You embrace the quiet, the subtle, the flowing. Your energy is receptive and transformative."
                : "You embody the active, the bold, the dynamic. Your energy is creative and initiating."}
            </p>
            <button
              onClick={resetQuiz}
              className="text-sm tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground"
            >
              RETAKE
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Progress */}
            <div className="flex gap-3 mb-16">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-0.5 flex-1 transition-colors ${
                    index <= currentQuestion ? "bg-foreground" : "bg-border"
                  }`}
                />
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
                  <ArrowRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Lab;
