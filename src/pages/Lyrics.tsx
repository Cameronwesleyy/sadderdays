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

        <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl tracking-tighter-custom text-center mb-16 text-foreground"
          >
            {pageTitle}
          </motion.h1>

          {/* Song List */}
          <div className="space-y-0">
            {songs.map((song, i) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/lyrics/${song.id}`}
                  className="group block py-5 border-b border-foreground/10 transition-colors duration-200"
                >
                  <span className="text-base md:text-lg tracking-wide text-foreground/80 group-hover:text-sd-pink transition-colors duration-200 group-hover:drop-shadow-[0_0_12px_hsl(318,52%,78%)]">
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
