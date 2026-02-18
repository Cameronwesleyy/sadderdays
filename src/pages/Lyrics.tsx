import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";

interface Song {
  id: string;
  title: string;
  sort_order: number;
}

const Lyrics = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [pageTitle, setPageTitle] = useState("Lyrics");

  useEffect(() => {
    const load = async () => {
      const [songsRes, contentRes] = await Promise.all([
        supabase.from("songs").select("id, title, sort_order").order("sort_order"),
        supabase.from("site_content").select("*").eq("id", "lyrics_page_title").maybeSingle(),
      ]);
      if (songsRes.data) setSongs(songsRes.data);
      if (contentRes.data?.content) setPageTitle(contentRes.data.content);
    };
    load();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Fixed theme toggle */}
        <div className="fixed top-4 right-6 z-50">
          <ThemeToggle />
        </div>

        <div className="max-w-xl mx-auto px-8 pt-20 pb-16">
          {/* Page Title — clean, bold, centered like the PDF */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl tracking-tight text-left mb-14 text-foreground font-light"
            style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 300 }}
          >
            {pageTitle}
          </motion.h1>

          {/* Song List — no borders, generous spacing, left-aligned */}
          <div className="flex flex-col gap-8">
            {songs.map((song, i) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  to={`/lyrics/${song.id}`}
                  className="group block"
                >
                  <span
                    className="text-sm md:text-base text-foreground/70 group-hover:text-sd-pink transition-colors duration-200 group-hover:drop-shadow-[0_0_12px_hsl(318,52%,78%)] uppercase tracking-widest"
                    style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 300 }}
                  >
                    {song.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Lyrics;
