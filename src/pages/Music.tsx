import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import CrossIcon from "@/components/CrossIcon";
import { supabase } from "@/integrations/supabase/client";

interface Release {
  title: string;
  type: string;
  year: string;
  cover: string;
  spotifyUrl: string;
  appleUrl: string;
}

const hardcodedReleases: Release[] = [
  { title: "Push (Back It up)", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a5/83/a1/a583a197-786a-ceae-442d-8d3cc038f6c6/8721416800276.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/push-back-it-up-single/1852558697" },
  { title: "Fly", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3c/5f/d0/3c5fd033-69ba-e215-9bdf-7a4b4106f850/8721416618222.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/fly-single/1847412355" },
  { title: "Masquerade", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/23/11/7c/23117c8d-4c70-f332-043b-32dcb431ee09/199327819539.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/masquerade-single/1842922342" },
  { title: "Zen", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/44/0a/13/440a13e3-38dc-55de-941c-2a6a4f9377ae/199514278200.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/zen-single/1842922520" },
  { title: "Misery", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/60/20/0e/60200ece-2d22-0748-85ef-df6d436f697b/199518908806.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/misery-single/1842922912" },
  { title: "Guilty Pleasure", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fb/31/b4/fb31b4f1-48e8-e819-fe84-e28e5e2aa5f2/199328586478.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/guilty-pleasure-single/1842922463" },
  { title: "Dread", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/63/8e/da/638eda24-7603-db2c-225f-cecba5609533/199079157071.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/dread-single/1842924100" },
  { title: "Whispers in the Garth", type: "Single", year: "2025", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4e/c8/9c/4ec89c6d-2580-d7b2-79b0-5d7808d36e7d/199090313364.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/whispers-in-the-garth-single/1842923433" },
  { title: "Write Back", type: "Single", year: "2024", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fa/0b/6b/fa0b6b50-1cb8-5645-4e58-147ec9d82164/198665243501.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/write-back-single/1842924518" },
  { title: "You and My Desire", type: "Single", year: "2024", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fc/6e/5c/fc6e5c33-ad7c-2f4c-b631-2efde82149c5/198675575449.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/you-and-my-desire-single/1842923902" },
  { title: "Crave", type: "Single", year: "2024", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/90/19/d7/9019d7c7-5d75-3a72-319d-c754675b2a42/019307026217.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/crave-single/1843378619" },
  { title: "Omelas - Snippet", type: "Single", year: "2022", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d8/ea/7a/d8ea7a42-9c2c-b0eb-7f67-1e2770175948/197209372370.png/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE", appleUrl: "https://music.apple.com/us/album/omelas-snippet-single/1842923609" },
];

const Music = () => {
  const [hoveredRelease, setHoveredRelease] = useState<string | null>(null);
  const [releases, setReleases] = useState<Release[]>(hardcodedReleases);
  const [spotifyProfileUrl, setSpotifyProfileUrl] = useState("https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE");
  const [appleProfileUrl, setAppleProfileUrl] = useState("https://music.apple.com/us/artist/sadder-days/1563767142");
  const [cms, setCms] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      supabase.from("music_releases").select("*").order("sort_order"),
      supabase.from("site_content").select("*").in("id", ["music_spotify_url", "music_apple_url", "music_title", "music_listen_label"]),
    ]).then(([relRes, cmsRes]) => {
      if (relRes.data && relRes.data.length > 0) {
        setReleases(relRes.data.map((r: any) => ({
          title: r.title,
          type: r.type,
          year: r.year,
          cover: r.cover_url,
          spotifyUrl: r.spotify_url || "",
          appleUrl: r.apple_url || "",
        })));
      }
      if (cmsRes.data) {
        const map: Record<string, string> = {};
        cmsRes.data.forEach((r: any) => {
          map[r.id] = r.content;
          if (r.id === "music_spotify_url" && r.content) setSpotifyProfileUrl(r.content);
          if (r.id === "music_apple_url" && r.content) setAppleProfileUrl(r.content);
        });
        setCms(map);
      }
    });
  }, []);

  const musicTitle = cms.music_title || "MUSIC";
  const listenLabel = cms.music_listen_label || "LISTEN NOW";

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header with streaming links */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-massive font-display tracking-tighter-custom"
            >
              {musicTitle}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4"
            >
              <a
                href={spotifyProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-background text-xs tracking-widest-custom font-medium hover:opacity-80 transition-opacity"
              >
                SPOTIFY <ExternalLink size={12} />
              </a>
              <a
                href={appleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs tracking-widest-custom font-medium hover:opacity-80 transition-opacity"
              >
                APPLE MUSIC <ExternalLink size={12} />
              </a>
            </motion.div>
          </div>

          {/* Releases grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {releases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onMouseEnter={() => setHoveredRelease(release.title)}
                onMouseLeave={() => setHoveredRelease(null)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square mb-3 overflow-hidden bg-muted">
                  <img
                    src={release.cover}
                    alt={release.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredRelease === release.title ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <a
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-[#1DB954] text-background text-[10px] tracking-widest-custom font-medium hover:scale-105 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play size={12} fill="currentColor" /> SPOTIFY
                    </a>
                    <a
                      href={release.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-foreground text-background text-[10px] tracking-widest-custom font-medium hover:scale-105 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play size={12} fill="currentColor" /> APPLE
                    </a>
                  </div>
                </div>
                <h3 className="font-display text-sm tracking-tight leading-tight mb-1 group-hover:text-sd-pink transition-colors">
                  {release.title} - {release.type}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {release.year}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Spotify Embed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-4">
              {listenLabel}
            </p>
            <iframe
              src="https://open.spotify.com/embed/artist/09pCD0j6zTSon9okqgWkqE?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="opacity-80 hover:opacity-100 transition-opacity rounded-lg"
            />
          </motion.div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Music;