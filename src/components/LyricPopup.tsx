import { useRef, useState, useCallback, useEffect } from "react";
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

interface DraggableWindowProps {
  song: Song;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  initialOffset: number;
}

const GlowingWord = ({ word }: { word: string }) => (
  <span className="inline-block mr-[0.3em] transition-all duration-200 cursor-default hover:text-sd-pink hover:drop-shadow-[0_0_10px_hsl(318,52%,78%)]">
    {word}
  </span>
);

const DraggableWindow = ({ song, onClose, onFocus, zIndex, initialOffset }: DraggableWindowProps) => {
  const [position, setPosition] = useState({ x: initialOffset, y: initialOffset });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posRef = useRef(position);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only drag from the title bar
    if ((e.target as HTMLElement).closest("button, a")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    onFocus(song.id);
  }, [onFocus, song.id]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const newPos = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y };
    posRef.current = newPos;
    setPosition(newPos);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const lines = song.lyrics.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed flex flex-col rounded-xl overflow-hidden shadow-2xl border border-foreground/10"
      style={{
        zIndex,
        width: "min(680px, calc(100vw - 2rem))",
        height: "min(70vh, calc(100vh - 4rem))",
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      onPointerDown={() => onFocus(song.id)}
    >
      {/* Title Bar — drag handle */}
      <div
        className="bg-muted/95 backdrop-blur-md border-b border-foreground/10 flex items-center px-4 py-3 shrink-0 select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onClose(song.id)}
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
            style={{ fontFamily: "'SF Mono', 'Courier New', monospace" }}
          >
            <span className="text-foreground/20">🔒</span>
            sadderdays.world/lyrics
          </div>
        </div>

        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 bg-background">
        <div className="px-8 md:px-12 pt-10 pb-16">
          <span
            className="text-foreground/30 text-lg block mb-1"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {String(song.sort_order).padStart(2, "0") + "."}
          </span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-light mb-8"
            style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 300 }}
          >
            {song.title}
          </h2>

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
  );
};

interface LyricPopupProps {
  openSongs: Song[];
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  focusOrder: string[]; // ordered list of song ids, last = top
}

const LyricPopup = ({ openSongs, onClose, onFocus, focusOrder }: LyricPopupProps) => {
  return (
    <AnimatePresence>
      {openSongs.map((song, i) => {
        const zIdx = 50 + (focusOrder.indexOf(song.id) >= 0 ? focusOrder.indexOf(song.id) : i);
        return (
          <DraggableWindow
            key={song.id}
            song={song}
            onClose={onClose}
            onFocus={onFocus}
            zIndex={zIdx}
            initialOffset={i * 30}
          />
        );
      })}
    </AnimatePresence>
  );
};

export default LyricPopup;
