import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import albumHaze from "@/assets/album-haze.jpg";

const albums = [
  {
    title: "HAZE",
    year: "2025",
    image: albumHaze,
    tracks: [
      "Fog Rising",
      "Yin",
      "Sadder Days",
      "Between Shadows",
      "Yang",
      "Eternal Drift",
      "The Quiet",
      "Fading Light",
    ],
  },
  {
    title: "ECHOES",
    year: "2023",
    image: null,
    tracks: [
      "First Light",
      "Memory Lane",
      "Static",
      "Hollow",
      "Remnants",
      "Distance",
    ],
  },
];

const streamingPlatforms = [
  { name: "Spotify", url: "#" },
  { name: "Apple Music", url: "#" },
  { name: "YouTube Music", url: "#" },
  { name: "Tidal", url: "#" },
];

const Music = () => {
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
              DISCOGRAPHY
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter-custom mb-6">
              MUSIC
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Stream our sound across all platforms.
            </p>
          </motion.div>

          {/* Streaming Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            {streamingPlatforms.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-border text-xs tracking-widest-custom hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
              >
                {platform.name}
                <ExternalLink size={12} />
              </motion.a>
            ))}
          </motion.div>

          {/* Albums */}
          <div className="space-y-24">
            {albums.map((album, albumIndex) => (
              <motion.div
                key={album.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: albumIndex * 0.2 }}
              >
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* Album Art */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="aspect-square bg-muted card-ethereal relative group cursor-pointer overflow-hidden"
                  >
                    {album.image ? (
                      <img
                        src={album.image}
                        alt={`${album.title} album cover`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-bold tracking-tighter-custom opacity-20">
                            {album.title}
                          </span>
                        </div>
                      </>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-background/80 flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-6 rounded-full border border-foreground"
                      >
                        <Play size={32} fill="currentColor" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Track List */}
                  <div>
                    <div className="mb-8">
                      <p className="text-xs tracking-widest-custom text-muted-foreground mb-2">
                        {album.year}
                      </p>
                      <h2 className="text-4xl font-bold tracking-tighter-custom">
                        {album.title}
                      </h2>
                    </div>

                    <div className="space-y-0">
                      {album.tracks.map((track, trackIndex) => (
                        <motion.div
                          key={track}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: trackIndex * 0.05 }}
                          whileHover={{ x: 4, backgroundColor: "hsl(var(--accent))" }}
                          className="flex items-center gap-4 py-4 px-4 -mx-4 border-b border-border/30 cursor-pointer group transition-colors"
                        >
                          <span className="text-xs text-muted-foreground w-6">
                            {String(trackIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1">{track}</span>
                          <Play
                            size={14}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Embed Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
                FEATURED TRACK
              </p>
              <h2 className="text-3xl font-bold tracking-tighter-custom">
                FOG RISING
              </h2>
            </div>

            {/* Placeholder for Spotify/Soundcloud embed */}
            <div className="card-ethereal aspect-video max-w-3xl mx-auto flex items-center justify-center">
              <div className="text-center">
                <Play size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  Streaming embed placeholder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Music;
