import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
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
        <div className="max-w-xl mx-auto px-8 pt-28 pb-16">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl tracking-tight text-foreground font-light"
            style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 300 }}
          >
            {pageTitle}
          </motion.h1>

          {/* Album name */}
          <p
            className="text-[11px] text-foreground/40 tracking-[0.3em] uppercase mt-2"
            style={{ fontFamily: "'Courier New', 'Courier', monospace" }}
          >
            Yin &amp; Yang
          </p>

          {/* Receipt dashed line */}
          <div className="border-b border-dashed border-foreground/20 my-6" />

          {/* Song list — receipt style, prints out */}
          <div className="flex flex-col gap-0">
            {songs.map((song, i) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                transition={{
                  duration: 0.15,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
                className="overflow-hidden"
              >
                <Link
                  to={`/lyrics/${song.id}`}
                  className="group flex items-baseline justify-between py-2"
                >
                  <span
                    className="text-xs md:text-sm text-foreground/60 group-hover:text-sd-pink transition-colors duration-200 group-hover:drop-shadow-[0_0_12px_hsl(318,52%,78%)] uppercase tracking-[0.25em]"
                    style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 300 }}
                  >
                    {song.title}
                  </span>
                  <span
                    className="text-[10px] text-foreground/30 tabular-nums ml-4"
                    style={{ fontFamily: "'Courier New', 'Courier', monospace" }}
                  >
                    {String(song.sort_order).padStart(2, "0")}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Receipt footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: songs.length * 0.06 + 0.2 }}
            >
              <div className="border-b border-dashed border-foreground/20 mt-4 mb-3" />
              <p
                className="text-[9px] text-foreground/30 tracking-[0.3em] uppercase text-center"
                style={{ fontFamily: "'Courier New', 'Courier', monospace" }}
              >
                {songs.length} tracks
              </p>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Lyrics;
