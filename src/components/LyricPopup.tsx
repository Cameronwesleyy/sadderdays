import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Song {
  id: string;
  title: string;
  lyrics: string;
  sort_order: number;
  spotify_url: string | null;
  apple_url: string | null;
}

interface LyricPopupProps {
  song: Song | null;
  onClose: () => void;
}

const GlowingWord = ({ word }: { word: string }) => (
  <span className="inline-block mr-[0.3em] transition-all duration-200 cursor-default hover:text-sd-pink hover:drop-shadow-[0_0_10px_hsl(318,52%,78%)]">
    {word}
  </span>
);

const LyricPopup = ({ song, onClose }: LyricPopupProps) => {
  if (!song) return null;

  const lines = song.lyrics.split("\n");

  return (
    <AnimatePresence>
      {song && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Mac Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-x-auto md:inset-y-8 md:left-1/2 md:-translate-x-1/2 md:w-[680px] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-foreground/10"
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            {/* Title Bar */}
            <div className="bg-muted/95 backdrop-blur-md border-b border-foreground/10 flex items-center px-4 py-3 shrink-0">
              {/* Traffic lights */}
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

              {/* URL bar */}
              <div className="flex-1 flex justify-center mx-8">
                <div className="bg-background/60 border border-foreground/10 rounded-md px-4 py-1 text-[10px] text-foreground/40 tracking-wider flex items-center gap-2 max-w-xs w-full justify-center"
                  style={{ fontFamily: "'SF Mono', 'Courier New', monospace" }}
                >
                  <span className="text-foreground/20">🔒</span>
                  sadderdays.world/lyrics
                </div>
              </div>

              {/* Spacer for symmetry */}
              <div className="w-[52px]" />
            </div>

            {/* Content */}
            <ScrollArea className="flex-1 bg-background">
              <div className="px-8 md:px-12 pt-10 pb-16">
                {/* Track number */}
                <span
                  className="text-foreground/30 text-lg block mb-1"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  {String(song.sort_order).padStart(2, "0") + "."}
                </span>

                {/* Title */}
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-light mb-8"
                  style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 300 }}
                >
                  {song.title}
                </h2>

                {/* Play links */}
                {(song.spotify_url || song.apple_url) && (
                  <div className="flex gap-4 mb-8">
                    {song.spotify_url && (
                      <a
                        href={song.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground/60 pb-0.5"
                        style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                      >
                        SPOTIFY
                      </a>
                    )}
                    {song.apple_url && (
                      <a
                        href={song.apple_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/20 hover:border-foreground/60 pb-0.5"
                        style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                      >
                        APPLE MUSIC
                      </a>
                    )}
                  </div>
                )}

                {/* Lyrics */}
                <div className="space-y-0">
                  {lines.map((line, lineIdx) => {
                    if (line.trim() === "") {
                      return <div key={lineIdx} className="h-5" />;
                    }
                    const words = line.split(/\s+/).filter(Boolean);
                    return (
                      <p
                        key={lineIdx}
                        className="text-foreground/80 text-sm md:text-base leading-relaxed"
                        style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 300 }}
                      >
                        {words.map((word, wi) => (
                          <GlowingWord key={`${lineIdx}-${wi}`} word={word} />
                        ))}
                      </p>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LyricPopup;
