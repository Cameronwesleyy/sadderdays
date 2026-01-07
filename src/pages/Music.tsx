import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const tracks = [
  { title: "MISERY", type: "Single", year: "2024" },
  { title: "GUILTY PLEASURE", type: "Single", year: "2024" },
  { title: "YIN/YANG", type: "EP", year: "2023" },
];

const Music = () => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Massive heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-massive font-display tracking-tighter-custom mb-16 sticky-heading"
          >
            MUSIC
          </motion.h1>

          {/* Streaming links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-6 mb-16"
          >
            <a
              href="https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              SPOTIFY <ExternalLink size={8} />
            </a>
            <a
              href="https://music.apple.com/us/artist/sadder-days/1563767142"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              APPLE MUSIC <ExternalLink size={8} />
            </a>
          </motion.div>

          {/* Track list - vertical, hover effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="border-t border-foreground"
          >
            {tracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredTrack(track.title)}
                onMouseLeave={() => setHoveredTrack(null)}
                className={`brutalist-row group cursor-pointer transition-all duration-300 px-2 ${
                  hoveredTrack && hoveredTrack !== track.title
                    ? "opacity-30"
                    : "opacity-100"
                }`}
              >
                <span className="text-2xl md:text-4xl font-display tracking-tighter-custom">
                  {track.title}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-widest-custom text-muted-foreground">
                    {track.type}
                  </span>
                  <span className="text-[10px] tracking-widest-custom text-muted-foreground/50">
                    {track.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Spotify Embed - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <iframe
              src="https://open.spotify.com/embed/artist/09pCD0j6zTSon9okqgWkqE?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Music;
