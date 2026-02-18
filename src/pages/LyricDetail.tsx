import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";

interface Song {
  id: string;
  title: string;
  lyrics: string;
  sort_order: number;
}

const GlowingChar = ({ char, delay }: { char: string; delay: number }) => {
  if (char === " ") return <span>&nbsp;</span>;
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.02, delay }}
      className="inline-block transition-all duration-200 cursor-default hover:text-sd-pink hover:drop-shadow-[0_0_8px_hsl(318,52%,78%)] hover:scale-110"
    >
      {char}
    </motion.span>
  );
};

const LyricDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      if (data) setSong(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-4 h-4 border border-foreground/30 border-t-foreground animate-spin" />
      </div>
    );
  }

  if (!song) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
          <p className="text-foreground/60 text-sm tracking-widest-custom">SONG NOT FOUND</p>
          <Link to="/lyrics" className="text-sd-pink text-xs tracking-widest-custom hover:text-foreground transition-colors">
            ← BACK TO LYRICS
          </Link>
        </div>
      </PageTransition>
    );
  }

  const lines = song.lyrics.split("\n");
  let charIndex = 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Fixed nav */}
        <div className="fixed top-4 left-6 z-50">
          <Link
            to="/lyrics"
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-xs tracking-widest-custom"
          >
            <ArrowLeft size={14} />
            LYRICS
          </Link>
        </div>
        <div className="fixed top-4 right-6 z-50">
          <ThemeToggle />
        </div>

        <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
          {/* Song number + title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-foreground/40 text-sm mb-2 block">{song.sort_order}.</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter-custom text-foreground">
              {song.title}
            </h1>
          </motion.div>

          {/* Lyrics with per-character hover glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-0"
          >
            {lines.map((line, lineIdx) => {
              if (line.trim() === "") {
                return <div key={lineIdx} className="h-5" />;
              }
              const lineChars = line.split("").map((char, ci) => {
                const delay = Math.min(charIndex * 0.003, 2);
                charIndex++;
                return <GlowingChar key={`${lineIdx}-${ci}`} char={char} delay={delay} />;
              });
              charIndex++; // for newline
              return (
                <p key={lineIdx} className="text-foreground/80 text-sm md:text-base leading-relaxed">
                  {lineChars}
                </p>
              );
            })}
          </motion.div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default LyricDetail;
