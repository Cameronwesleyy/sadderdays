import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Lab = () => {
  const [activeTab, setActiveTab] = useState<"generator" | "quiz">("generator");

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
              INTERACTIVE EXPERIENCE
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter-custom mb-6">
              THE LAB
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explore the duality. Create. Discover your side.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-16">
            {[
              { id: "generator", label: "YIN/YANG GENERATOR" },
              { id: "quiz", label: "DISCOVER YOUR SIDE" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "generator" | "quiz")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 text-xs tracking-widest-custom transition-all ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground/50"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "generator" ? (
              <YinYangGenerator key="generator" />
            ) : (
              <QuizSection key="quiz" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

const YinYangGenerator = () => {
  const [text, setText] = useState("SADDER DAYS");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 600;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;

    // Yin (black) half
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.5, Math.PI * 1.5);
    ctx.fillStyle = "#f5f5f0";
    ctx.fill();

    // Yang (white) half
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 1.5, Math.PI * 0.5);
    ctx.fillStyle = "#0f0f0f";
    ctx.fill();

    // Small circles (the dots)
    const smallRadius = radius / 2;

    // White small curve (in black half)
    ctx.beginPath();
    ctx.arc(centerX, centerY - smallRadius, smallRadius, Math.PI * 0.5, Math.PI * 1.5);
    ctx.fillStyle = "#0f0f0f";
    ctx.fill();

    // Black small curve (in white half)
    ctx.beginPath();
    ctx.arc(centerX, centerY + smallRadius, smallRadius, Math.PI * 1.5, Math.PI * 0.5);
    ctx.fillStyle = "#f5f5f0";
    ctx.fill();

    // Dots
    const dotRadius = radius / 8;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY - smallRadius, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#f5f5f0";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY + smallRadius, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0f0f0f";
    ctx.fill();

    // Text distortion effect
    ctx.save();
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "8px";
    
    // Draw text with wave distortion
    const displayText = text.toUpperCase();
    
    for (let i = 0; i < displayText.length; i++) {
      const char = displayText[i];
      const x = centerX + (i - displayText.length / 2) * 20;
      const wave = Math.sin((i / displayText.length) * Math.PI * 2) * 15;
      const y = centerY + wave;
      
      // Determine color based on position
      const isInWhiteHalf = y > centerY;
      ctx.fillStyle = isInWhiteHalf ? "#f5f5f0" : "#0f0f0f";
      ctx.globalCompositeOperation = "difference";
      ctx.fillText(char, x, y);
    }
    ctx.restore();

    // Add grain texture
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);
  }, [text]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `sadderdays-${text.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Generate on mount and text change
  useState(() => {
    generateImage();
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="card-ethereal p-8 md:p-12">
        {/* Input */}
        <div className="mb-8">
          <label className="text-xs tracking-widest-custom text-muted-foreground mb-3 block">
            ENTER YOUR TEXT
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 20))}
            onKeyUp={generateImage}
            maxLength={20}
            placeholder="Your text here..."
            className="w-full bg-transparent border-b border-border py-3 text-2xl font-bold tracking-tighter-custom placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
          />
        </div>

        {/* Canvas Preview */}
        <div className="relative aspect-square bg-background mb-8 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateImage}
            className="flex-1 py-4 border border-border text-xs tracking-widest-custom hover:border-foreground/50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} />
            REGENERATE
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadImage}
            className="flex-1 py-4 bg-foreground text-background text-xs tracking-widest-custom hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Download size={14} />
            DOWNLOAD
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const quizQuestions = [
  {
    question: "When you close your eyes, do you see...",
    options: [
      { text: "Endless light fading into softness", side: "yin" },
      { text: "Deep shadows with hidden depths", side: "yang" },
    ],
  },
  {
    question: "Your energy peaks during...",
    options: [
      { text: "The quiet hours before dawn", side: "yin" },
      { text: "The electric midnight atmosphere", side: "yang" },
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<"yin" | "yang" | null>(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleAnswer = (side: string) => {
    const newAnswers = [...answers, side];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calculate result
      const yinCount = newAnswers.filter((a) => a === "yin").length;
      setResult(yinCount >= 3 ? "yin" : "yang");
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setJoined(false);
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="card-ethereal p-8 md:p-12">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {/* Result Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center ${
                  result === "yin" ? "yin-gradient" : "yang-gradient"
                }`}
              >
                <span
                  className={`text-4xl font-bold tracking-tighter-custom ${
                    result === "yin" ? "text-background" : "text-foreground"
                  }`}
                >
                  {result === "yin" ? "YIN" : "YANG"}
                </span>
              </motion.div>

              <h2 className="text-3xl font-bold tracking-tighter-custom mb-4">
                You are Team {result === "yin" ? "Yin" : "Yang"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {result === "yin"
                  ? "You embrace the quiet, the subtle, the flowing. Your energy is receptive and transformative."
                  : "You embody the active, the bold, the dynamic. Your energy is creative and initiating."}
              </p>

              {/* Join Form */}
              {!joined ? (
                <form onSubmit={handleJoin} className="max-w-sm mx-auto">
                  <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
                    JOIN THE TRIBE
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-transparent border-b border-border py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-2 bg-foreground text-background text-xs tracking-widest-custom"
                    >
                      <ArrowRight size={14} />
                    </motion.button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-foreground mb-4">Welcome to the tribe.</p>
                  <button
                    onClick={resetQuiz}
                    className="text-xs tracking-widest-custom text-muted-foreground hover:text-foreground transition-colors"
                  >
                    TAKE AGAIN
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {quizQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 transition-colors ${
                      index <= currentQuestion ? "bg-foreground" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
                QUESTION {currentQuestion + 1} OF {quizQuestions.length}
              </p>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter-custom mb-8">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(option.side)}
                    className="w-full p-6 text-left border border-border hover:border-foreground/50 hover:bg-accent/50 transition-all group"
                  >
                    <span className="flex items-center justify-between">
                      <span>{option.text}</span>
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Lab;
