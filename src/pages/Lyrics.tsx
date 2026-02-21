import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import LyricPopup from "@/components/LyricPopup";
import { supabase } from "@/integrations/supabase/client";

interface Song {
  id: string;
  title: string;
  lyrics: string;
  sort_order: number;
  spotify_url: string | null;
  apple_url: string | null;
}

const Lyrics = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [pageTitle, setPageTitle] = useState("Lyrics");
  const [openSongIds, setOpenSongIds] = useState<string[]>([]);
  const [focusOrder, setFocusOrder] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const [songsRes, contentRes] = await Promise.all([
        supabase.from("songs").select("*").order("sort_order"),
        supabase.from("site_content").select("*").eq("id", "lyrics_page_title").maybeSingle(),
      ]);
      if (songsRes.data) setSongs(songsRes.data);
      if (contentRes.data?.content) setPageTitle(contentRes.data.content);
    };
    load();
  }, []);

  const openSong = useCallback((song: Song) => {
    setOpenSongIds(prev => {
      if (prev.includes(song.id)) {
        // Already open — just bring to front
        setFocusOrder(fo => [...fo.filter(id => id !== song.id), song.id]);
        return prev;
      }
      return [...prev, song.id];
    });
    setFocusOrder(fo => [...fo.filter(id => id !== song.id), song.id]);
  }, []);

  const closeSong = useCallback((id: string) => {
    setOpenSongIds(prev => prev.filter(sid => sid !== id));
    setFocusOrder(prev => prev.filter(sid => sid !== id));
  }, []);

  const focusSong = useCallback((id: string) => {
    setFocusOrder(prev => [...prev.filter(sid => sid !== id), id]);
  }, []);

  const openSongs = songs.filter(s => openSongIds.includes(s.id));

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

          <p
            className="text-[11px] text-foreground/40 tracking-[0.3em] uppercase mt-2"
            style={{ fontFamily: "'Courier New', 'Courier', monospace" }}
          >
            Yin &amp; Yang
          </p>

          <div className="border-b border-dashed border-foreground/20 my-6" />

          <div className="flex flex-col gap-0">
            {songs.map((song, i) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                transition={{ duration: 0.15, delay: i * 0.06, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => openSong(song)}
                  className="group flex items-baseline justify-between py-2 w-full text-left"
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
                </button>
              </motion.div>
            ))}

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

      <LyricPopup
        openSongs={openSongs}
        onClose={closeSong}
        onFocus={focusSong}
        focusOrder={focusOrder}
      />
    </PageTransition>
  );
};

export default Lyrics;
