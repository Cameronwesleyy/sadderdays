import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import cameronPortrait from "@/assets/cameron-portrait.jpg";
import grantPortrait from "@/assets/grant-portrait.jpg";
import grantEyes from "@/assets/grant-eyes.jpg";
import cameronEyes from "@/assets/cameron-eyes.jpg";
import grantTitle from "@/assets/grant-title.png";
import cameronTitle from "@/assets/cameron-title.png";
import yinYangLogo from "@/assets/yin-yang-logo.png";
import cameronCycle1 from "@/assets/cameron-cycle-1.jpg";
import cameronCycle2 from "@/assets/cameron-cycle-2.jpg";
import cameronCycle3 from "@/assets/cameron-cycle-3.jpg";
import cameronCycle4 from "@/assets/cameron-cycle-4.jpg";
import cameronCycle5 from "@/assets/cameron-cycle-5.jpg";
import cameronCycle6 from "@/assets/cameron-cycle-6.jpg";
import cameronCycle7 from "@/assets/cameron-cycle-7.jpg";
import cameronCycle8 from "@/assets/cameron-cycle-8.jpg";
import cameronCycle9 from "@/assets/cameron-cycle-9.jpg";
import cameronCycle10 from "@/assets/cameron-cycle-10.jpg";
import grantCycle1 from "@/assets/grant-cycle-1.jpg";
import grantCycle2 from "@/assets/grant-cycle-2.jpg";
import grantCycle3 from "@/assets/grant-cycle-3.jpg";
import grantCycle4 from "@/assets/grant-cycle-4.jpg";
import grantCycle5 from "@/assets/grant-cycle-5.jpg";
import grantCycle6 from "@/assets/grant-cycle-6.jpg";
import grantCycle7 from "@/assets/grant-cycle-7.jpg";
import grantCycle8 from "@/assets/grant-cycle-8.jpg";
import grantCycle9 from "@/assets/grant-cycle-9.jpg";
import grantCycle10 from "@/assets/grant-cycle-10.jpg";

const defaultCameronCycle = [
  cameronCycle1, cameronCycle2, cameronCycle3, cameronCycle4, cameronCycle5,
  cameronCycle6, cameronCycle7, cameronCycle8, cameronCycle9, cameronCycle10
];

const defaultGrantCycle = [
  grantCycle1, grantCycle2, grantCycle3, grantCycle4, grantCycle5,
  grantCycle6, grantCycle7, grantCycle8, grantCycle9, grantCycle10
];

// ── Social Icons ──

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
const PatreonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/>
  </svg>
);
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);
const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.3c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.199-1.3-.2-1.332c-.014-.057-.047-.094-.104-.094"/>
  </svg>
);
const BandcampIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5z"/>
  </svg>
);
const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.779-.963-1.416-1.8-1.828a7.874 7.874 0 0 1-.345 2.861c-.477 1.26-1.282 2.131-2.328 2.524-.96.361-2.07.37-3.114.026-1.263-.416-2.27-1.29-2.752-2.391-.39-.89-.425-1.89-.098-2.81.537-1.503 1.867-2.443 3.516-2.513.948-.04 1.852.16 2.623.571.155-.834.108-1.614-.152-2.297-.417-1.1-1.34-1.755-2.633-1.86a5.236 5.236 0 0 0-.462-.02c-1.326.014-2.473.481-3.227 1.312l-1.5-1.37C8.063 4.86 9.73 4.193 11.627 4.164c.204-.003.41.003.613.017 1.989.16 3.528 1.15 4.227 2.725.496 1.117.557 2.429.172 3.748.66.35 1.225.806 1.662 1.356 1.056 1.328 1.33 3.083.77 4.932-.67 2.21-2.45 3.804-5.012 4.485a10.1 10.1 0 0 1-1.873.257z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SocialIcon = ({ name }: { name: string }) => {
  const n = name.toLowerCase();
  if (n === "instagram") return <Instagram className="w-4 h-4" />;
  if (n === "tiktok") return <TikTokIcon />;
  if (n === "patreon") return <PatreonIcon />;
  if (n === "youtube") return <YouTubeIcon />;
  if (n === "twitter/x" || n === "twitter" || n === "x") return <TwitterIcon />;
  if (n === "spotify") return <SpotifyIcon />;
  if (n === "soundcloud") return <SoundCloudIcon />;
  if (n === "bandcamp") return <BandcampIcon />;
  if (n === "threads") return <ThreadsIcon />;
  return <ExternalLink className="w-4 h-4" />;
};

// ── Mac Folder Icon ──

const MacFolderIcon = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group cursor-pointer">
    <svg viewBox="0 0 80 64" className="w-20 h-16 md:w-24 md:h-20 drop-shadow-lg group-hover:scale-105 transition-transform duration-200">
      {/* Folder back */}
      <rect x="0" y="10" width="80" height="54" rx="4" fill="#5AC8FA" opacity="0.85" />
      {/* Folder tab */}
      <path d="M0 14 Q0 10 4 10 L28 10 L32 4 Q33 2 36 2 L76 2 Q80 2 80 6 L80 14 Z" fill="#4AB8E8" />
      {/* Folder front */}
      <rect x="0" y="18" width="80" height="46" rx="4" fill="#5AC8FA" />
      {/* Subtle shine */}
      <rect x="2" y="20" width="76" height="4" rx="2" fill="white" opacity="0.15" />
    </svg>
    <span
      className="text-[11px] tracking-wide text-foreground/80 group-hover:text-foreground transition-colors text-center"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif", fontWeight: 400 }}
    >
      {label}
    </span>
  </button>
);

// ── Default member data ──

const defaultMembers = [
  {
    name: "CAMERON",
    folderLabel: "CAMERON_INF",
    titleImage: cameronTitle,
    titleScale: 1.15,
    defaultRole: "Guitar / Production",
    defaultEyesImage: cameronEyes,
    eyesCrop: { position: 16, scale: 4.0 },
    defaultFavoriteColor: "Forest Green",
    defaultPersonality: "INFP-A",
    defaultBirthday: "08/08/2002",
    defaultSigns: "Leo · Leo · Scorpio",
    defaultBio: "Cameron is the guitarist and founder of Sadder Days. He started making music at 17, during quarantine, and taught himself how to play guitar. His style as a guitar player is distinct, sensual, melodic, and elegant, while still incorporating those bloodthirsty riffs that drive Sadder Days' heavy side. Taking influences from Classical, RnB, Jazz, and even Visual Kei, Cameron always finds a way to make his guitar sing a sultry, vampiric song. He writes songs entirely in his head before touching an instrument. \"You're only limited by how big you can think.\"",
    socials: [
      { name: "Instagram", href: "#" },
      { name: "TikTok", href: "#" },
      { name: "Patreon", href: "#" },
    ],
    links: [
      { name: "Get His Tone", href: "#" },
      { name: "Equipment", href: "#" },
      { name: "Wallpapers", href: "#" },
      { name: "Playlist", href: "#" },
    ],
  },
  {
    name: "GRANT",
    folderLabel: "GRANT_INF",
    titleImage: grantTitle,
    titleScale: 1,
    defaultRole: "Drums / Percussion",
    defaultEyesImage: grantEyes,
    eyesCrop: { position: 24, scale: 4.0 },
    defaultFavoriteColor: "Celestine Blue",
    defaultPersonality: "ENFJ-A",
    defaultBirthday: "06/12/2003",
    defaultSigns: "Gemini · Sagittarius · Scorpio",
    defaultBio: "Grant, the rhythmic heartbeat and co-founder of Sadder Days, stumbled into his musical journey at 17. Initially he had no aspirations of becoming a musician. However, the moment he laid hands on the drum kit alongside Cameron, he \"felt like a kid again\", transporting him back to the pure joy of childhood. This unexpected passion led him to embrace the drums, infusing Sadder Days' music with buttery grooves, explosive energy, and head-bumping beats. His evolving style—a blend of RnB, House, Jazz, and Hip-Hop influences—adds a danceable underbelly to the band's sound.",
    socials: [
      { name: "Instagram", href: "#" },
      { name: "TikTok", href: "#" },
      { name: "Patreon", href: "#" },
    ],
  },
];

// ── Draggable Member Popup (Mac Safari style) ──

interface MemberPopupData {
  name: string;
  titleImage: string;
  titleScale: number;
  role: string;
  bio: string;
  favoriteColor: string;
  personality: string;
  birthday: string;
  signs: string;
  eyesImage: string;
  eyesCrop: { position: number; scale: number };
  eyesCropMobile: { position: number; scale: number };
  cycleImages: string[];
  socials: { name: string; href: string }[];
  onEyesCropChange?: (crop: { position: number; scale: number }) => void;
  onMobileEyesCropChange?: (crop: { position: number; scale: number }) => void;
}

const DraggableMemberWindow = ({
  data,
  onClose,
  onFocus,
  zIndex,
  onImageClick,
}: {
  data: MemberPopupData;
  onClose: (name: string) => void;
  onFocus: (name: string) => void;
  zIndex: number;
  onImageClick: (images: string[], startIndex: number, name: string) => void;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posRef = useRef(position);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, textarea")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    onFocus(data.name);
  }, [onFocus, data.name]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const newPos = { x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y };
    posRef.current = newPos;
    setPosition(newPos);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-foreground/10 m-auto max-w-[calc(100vw-1rem)]"
      style={{
        zIndex,
        width: "min(680px, calc(100vw - 1rem))",
        height: "min(85vh, calc(100vh - 2rem))",
        translate: `${position.x}px ${position.y}px`,
      }}
      onPointerDown={() => onFocus(data.name)}
    >
      {/* Title Bar */}
      <div
        className="bg-muted/95 backdrop-blur-md border-b border-foreground/10 flex items-center px-4 py-3 shrink-0 select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onClose(data.name)}
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
            style={{ fontFamily: "'SF Mono', 'Menlo', 'Courier New', monospace" }}
          >
            <span className="text-foreground/20">🔒</span>
            sadderdays.world/{data.name.toLowerCase()}
          </div>
        </div>

        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 bg-background overflow-x-hidden min-w-0 w-full">
        <div className="px-4 md:px-10 pt-0 pb-16 w-full overflow-x-hidden">
          {/* Eyes Image - at top */}
          {(() => {
            const isMobileView = window.innerWidth < 768;
            const crop = isMobileView ? data.eyesCropMobile : data.eyesCrop;
            return (
              <>
                <div className="relative h-28 overflow-hidden mb-2">
                  <img
                    src={data.eyesImage}
                    alt={data.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: `center ${crop.position}%`, transform: `scale(${crop.scale})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {isMobileView && data.onMobileEyesCropChange && (
                  <div className="flex gap-4 mb-4 px-1">
                    <label className="flex items-center gap-2 text-[10px] text-foreground/50 flex-1">
                      Zoom
                      <input type="range" min="1" max="8" step="0.1" value={crop.scale}
                        onChange={(e) => data.onMobileEyesCropChange!({ ...crop, scale: parseFloat(e.target.value) })}
                        className="flex-1 h-1 accent-foreground/40" />
                    </label>
                    <label className="flex items-center gap-2 text-[10px] text-foreground/50 flex-1">
                      Position
                      <input type="range" min="0" max="100" step="1" value={crop.position}
                        onChange={(e) => data.onMobileEyesCropChange!({ ...crop, position: parseFloat(e.target.value) })}
                        className="flex-1 h-1 accent-foreground/40" />
                    </label>
                  </div>
                )}
              </>
            );
          })()}

          {/* Name */}
          <div className="flex justify-center mb-6">
            <img
              src={data.titleImage}
              alt={data.name}
              className="w-full h-auto max-w-[260px] dark:brightness-100 brightness-75"
              style={{ transform: `scale(${data.titleScale})`, transformOrigin: "center" }}
            />
          </div>

          {/* Role */}
          <p className="text-[10px] tracking-widest text-foreground/60 text-center mb-6">{data.role}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 py-4 border-y border-foreground/20 text-xs mb-6">
            <div>
              <p className="text-[9px] tracking-widest text-foreground/50 mb-0.5">FAVORITE COLOR</p>
              <p className="font-medium text-foreground">{data.favoriteColor}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-widest text-foreground/50 mb-0.5">PERSONALITY</p>
              <p className="font-medium text-foreground">{data.personality}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-widest text-foreground/50 mb-0.5">BIRTHDAY</p>
              <p className="font-medium text-foreground">{data.birthday}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-widest text-foreground/50 mb-0.5">SIGNS</p>
              <p className="font-medium text-foreground">{data.signs}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-foreground/70 text-xs leading-relaxed mb-6">{data.bio}</p>

          {/* Social Links */}
          <div className="flex gap-1.5 mb-6">
            {data.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-foreground/20 text-foreground hover:border-foreground/50 hover:bg-foreground/10 transition-all"
                aria-label={social.name}
              >
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>

          {/* Film Strip */}
          <div className="py-2">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {data.cycleImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${data.name} ${i + 1}`}
                  className="h-16 w-auto object-cover flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity cursor-pointer rounded"
                  onClick={() => onImageClick(data.cycleImages, i, data.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

// ── Gallery Lightbox ──

interface GalleryLightboxProps {
  images: string[];
  initialIndex: number;
  memberName: string;
  onClose: () => void;
}

const GalleryLightbox = ({ images, initialIndex, memberName, onClose }: GalleryLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
        <X size={32} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors p-2">
        <ChevronLeft size={40} />
      </button>
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={images[currentIndex]}
        alt={`${memberName} ${currentIndex + 1}`}
        className="max-h-[80vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors p-2">
        <ChevronRight size={40} />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
};

// ── Main Page ──

const Members = () => {
  const [openMembers, setOpenMembers] = useState<string[]>([]);
  const [focusOrder, setFocusOrder] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number; name: string } | null>(null);
  const [cms, setCms] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.from("site_content").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((r: { id: string; content: string }) => { map[r.id] = r.content; });
        setCms(map);
      }
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePos({ x, y });
  };

  const openFolder = (name: string) => {
    if (!openMembers.includes(name)) {
      setOpenMembers((prev) => [...prev, name]);
    }
    setFocusOrder((prev) => [...prev.filter((n) => n !== name), name]);
  };

  const closeFolder = (name: string) => {
    setOpenMembers((prev) => prev.filter((n) => n !== name));
    setFocusOrder((prev) => prev.filter((n) => n !== name));
  };

  const closeAll = () => {
    setOpenMembers([]);
    setFocusOrder([]);
  };

  const focusMember = (name: string) => {
    setFocusOrder((prev) => [...prev.filter((n) => n !== name), name]);
  };

  const openLightbox = (images: string[], startIndex: number, name: string) => {
    setLightbox({ images, index: startIndex, name });
  };

  const parseGallery = (key: string, fallback: string[]): string[] => {
    try {
      const parsed = JSON.parse(cms[key] || "[]");
      if (!parsed.length) return fallback;
      const valid = parsed.filter((url: string) => url.startsWith("http"));
      return valid.length >= 3 ? valid : fallback;
    } catch { return fallback; }
  };

  const cmsImg = (key: string, fallback: string) => { const v = cms[key]; return v && v !== "__removed__" ? v : fallback; };
  const cameronEyesImg = cmsImg("members_cameron_eyes", cameronEyes);
  const grantEyesImg = cmsImg("members_grant_eyes", grantEyes);
  const cameronFilmstrip = parseGallery("members_cameron_filmstrip", defaultCameronCycle);
  const grantFilmstrip = parseGallery("members_grant_filmstrip", defaultGrantCycle);
  const cameronBio = cms.cameron_bio || defaultMembers[0].defaultBio;
  const grantBio = cms.grant_bio || defaultMembers[1].defaultBio;
  const cameronRole = cms.cameron_role || defaultMembers[0].defaultRole;
  const grantRole = cms.grant_role || defaultMembers[1].defaultRole;
  const cameronFavColor = cms.cameron_favorite_color || defaultMembers[0].defaultFavoriteColor;
  const grantFavColor = cms.grant_favorite_color || defaultMembers[1].defaultFavoriteColor;
  const cameronPersonality = cms.cameron_personality || defaultMembers[0].defaultPersonality;
  const grantPersonality = cms.grant_personality || defaultMembers[1].defaultPersonality;
  const cameronBirthday = cms.cameron_birthday || defaultMembers[0].defaultBirthday;
  const grantBirthday = cms.grant_birthday || defaultMembers[1].defaultBirthday;
  const cameronSigns = cms.cameron_signs || defaultMembers[0].defaultSigns;
  const grantSigns = cms.grant_signs || defaultMembers[1].defaultSigns;
  const cameronSocials = (() => { try { const p = JSON.parse(cms.cameron_socials || "[]"); return p.length > 0 ? p : defaultMembers[0].socials; } catch { return defaultMembers[0].socials; } })();
  const grantSocials = (() => { try { const p = JSON.parse(cms.grant_socials || "[]"); return p.length > 0 ? p : defaultMembers[1].socials; } catch { return defaultMembers[1].socials; } })();

  const handleEyesCropChange = useCallback((name: string, crop: { position: number; scale: number }) => {
    const isCameron = name === "CAMERON";
    const zoomKey = isCameron ? "cameron_eyes_zoom" : "grant_eyes_zoom";
    const posKey = isCameron ? "cameron_eyes_position" : "grant_eyes_position";
    setCms(prev => ({ ...prev, [zoomKey]: String(crop.scale), [posKey]: String(crop.position) }));
    // Auto-save to CMS
    supabase.from("site_content").upsert({ id: zoomKey, content: String(crop.scale), updated_at: new Date().toISOString() });
    supabase.from("site_content").upsert({ id: posKey, content: String(crop.position), updated_at: new Date().toISOString() });
  }, []);

  const handleMobileEyesCropChange = useCallback((name: string, crop: { position: number; scale: number }) => {
    const isCameron = name === "CAMERON";
    const zoomKey = isCameron ? "cameron_eyes_zoom_mobile" : "grant_eyes_zoom_mobile";
    const posKey = isCameron ? "cameron_eyes_position_mobile" : "grant_eyes_position_mobile";
    setCms(prev => ({ ...prev, [zoomKey]: String(crop.scale), [posKey]: String(crop.position) }));
    supabase.from("site_content").upsert({ id: zoomKey, content: String(crop.scale), updated_at: new Date().toISOString() });
    supabase.from("site_content").upsert({ id: posKey, content: String(crop.position), updated_at: new Date().toISOString() });
  }, []);

  const getMemberPopupData = (name: string): MemberPopupData => {
    const isCameron = name === "CAMERON";
    const member = isCameron ? defaultMembers[0] : defaultMembers[1];
    const eyesZoom = isCameron
      ? parseFloat(cms.cameron_eyes_zoom || String(member.eyesCrop.scale))
      : parseFloat(cms.grant_eyes_zoom || String(member.eyesCrop.scale));
    const eyesPosition = isCameron
      ? parseFloat(cms.cameron_eyes_position || String(member.eyesCrop.position))
      : parseFloat(cms.grant_eyes_position || String(member.eyesCrop.position));
    const eyesZoomMobile = isCameron
      ? parseFloat(cms.cameron_eyes_zoom_mobile || String(member.eyesCrop.scale))
      : parseFloat(cms.grant_eyes_zoom_mobile || String(member.eyesCrop.scale));
    const eyesPositionMobile = isCameron
      ? parseFloat(cms.cameron_eyes_position_mobile || String(member.eyesCrop.position))
      : parseFloat(cms.grant_eyes_position_mobile || String(member.eyesCrop.position));
    return {
      name: member.name,
      titleImage: member.titleImage,
      titleScale: member.titleScale,
      role: isCameron ? cameronRole : grantRole,
      bio: isCameron ? cameronBio : grantBio,
      favoriteColor: isCameron ? cameronFavColor : grantFavColor,
      personality: isCameron ? cameronPersonality : grantPersonality,
      birthday: isCameron ? cameronBirthday : grantBirthday,
      signs: isCameron ? cameronSigns : grantSigns,
      eyesImage: isCameron ? cameronEyesImg : grantEyesImg,
      eyesCrop: { position: eyesPosition, scale: eyesZoom },
      eyesCropMobile: { position: eyesPositionMobile, scale: eyesZoomMobile },
      cycleImages: isCameron ? cameronFilmstrip : grantFilmstrip,
      socials: isCameron ? cameronSocials : grantSocials,
      onEyesCropChange: (crop) => handleEyesCropChange(name, crop),
      onMobileEyesCropChange: (crop) => handleMobileEyesCropChange(name, crop),
    };
  };

  return (
    <PageTransition>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative bg-background"
        onMouseMove={handleMouseMove}
      >
        {/* Pink glow following mouse */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 214, 236, 0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Yin Yang Logo - large engraved background */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            src={yinYangLogo}
            alt=""
            className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] object-contain opacity-[0.04] dark:opacity-[0.06]"
          />
        </div>

        {/* MEMBERS Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-5xl md:text-8xl tracking-tighter-custom text-foreground text-center relative z-10 mb-12"
        >
          MEMBERS
        </motion.h1>

        {/* Mac Folder Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-12 md:gap-20 relative z-10"
        >
          {defaultMembers.map((member) => (
            <MacFolderIcon
              key={member.name}
              label={member.folderLabel}
              onClick={() => openFolder(member.name)}
            />
          ))}
        </motion.div>
      </div>
      <Footer />

      {/* Member Popups via Portal */}
      {createPortal(
        <>
          {openMembers.length > 1 && (
            <button
              onClick={closeAll}
              className="fixed top-4 right-4 z-[200] text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground border border-foreground/20 hover:border-foreground/60 rounded-md px-3 py-1.5 bg-background/80 backdrop-blur-sm transition-colors"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif" }}
            >
              Close All
            </button>
          )}
          <AnimatePresence>
            {openMembers.map((name, i) => {
              const zIdx = 100 + (focusOrder.indexOf(name) >= 0 ? focusOrder.indexOf(name) : i);
              return (
                <DraggableMemberWindow
                  key={name}
                  data={getMemberPopupData(name)}
                  onClose={closeFolder}
                  onFocus={focusMember}
                  zIndex={zIdx}
                  onImageClick={openLightbox}
                />
              );
            })}
          </AnimatePresence>
        </>,
        document.body
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <GalleryLightbox
            images={lightbox.images}
            initialIndex={lightbox.index}
            memberName={lightbox.name}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Members;
