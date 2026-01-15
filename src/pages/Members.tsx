import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import cameronPortrait from "@/assets/cameron-portrait.jpg"; // Long hair - Cameron
import grantPortrait from "@/assets/grant-portrait.jpg"; // Other person - Grant
import grantTitle from "@/assets/grant-title.png";
import cameronTitle from "@/assets/cameron-title.png";

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

const members = [
  {
    name: "GRANT",
    titleImage: grantTitle,
    role: "Drums / Percussion",
    eyesImage: grantPortrait,
    favoriteColor: "Celestine Blue",
    personality: "ENFJ-A",
    birthday: "06/12/2003",
    sun: "Gemini",
    moon: "Sagittarius",
    rising: "Scorpio",
    bio: "Grant, the rhythmic heartbeat and co-founder of Sadder Days, stumbled into his musical journey at 17. Initially he had no aspirations of becoming a musician. However, the moment he laid hands on the drum kit alongside Cameron, he \"felt like a kid again\", transporting him back to the pure joy of childhood. This unexpected passion led him to embrace the drums, infusing Sadder Days' music with buttery grooves, explosive energy, and head-bumping beats. His evolving style—a blend of RnB, House, Jazz, and Hip-Hop influences—adds a danceable underbelly to the band's sound.",
    socials: [
      { name: "Instagram", icon: Instagram, href: "#" },
      { name: "TikTok", icon: TikTokIcon, href: "#" },
      { name: "Patreon", icon: PatreonIcon, href: "#" },
    ],
  },
  {
    name: "CAMERON",
    titleImage: cameronTitle,
    role: "Guitar / Production",
    eyesImage: cameronPortrait,
    favoriteColor: "Forest Green",
    personality: "INFP-A",
    birthday: "08/08/2002",
    sun: "Leo",
    moon: "Leo",
    rising: "Scorpio",
    bio: "Cameron is the guitarist and founder of Sadder Days. He started making music at 17, during quarantine, and taught himself how to play guitar. His style as a guitar player is distinct, sensual, melodic, and elegant, while still incorporating those bloodthirsty riffs that drive Sadder Days' heavy side. Taking influences from Classical, RnB, Jazz, and even Visual Kei, Cameron always finds a way to make his guitar sing a sultry, vampiric song. He writes songs entirely in his head before touching an instrument. \"You're only limited by how big you can think.\"",
    socials: [
      { name: "Instagram", icon: Instagram, href: "#" },
      { name: "TikTok", icon: TikTokIcon, href: "#" },
      { name: "Patreon", icon: PatreonIcon, href: "#" },
    ],
    links: [
      { name: "Get His Tone", href: "#" },
      { name: "Equipment", href: "#" },
      { name: "Wallpapers", href: "#" },
      { name: "Playlist", href: "#" },
    ],
  },
];

const MemberCard = ({ member, index }: { member: typeof members[0]; index: number }) => {
  const isLeft = index === 0;
  const bgColor = isLeft ? "bg-background" : "bg-muted/20";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex flex-col ${bgColor} w-full max-w-md`}
    >
      {/* Role and Name */}
      <div className="px-6 pt-6 pb-4">
        <p className="text-[10px] tracking-widest text-muted-foreground mb-4">
          {member.role}
        </p>
        <img 
          src={member.titleImage} 
          alt={member.name}
          className="w-full h-auto"
          style={{ minHeight: '80px' }}
        />
      </div>

      {/* Stats Grid */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 py-4 border-y border-border/30 text-xs">
          <div>
            <p className="text-[9px] tracking-widest text-muted-foreground mb-0.5">FAVORITE COLOR</p>
            <p className="font-medium">{member.favoriteColor}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-widest text-muted-foreground mb-0.5">PERSONALITY</p>
            <p className="font-medium">{member.personality}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-widest text-muted-foreground mb-0.5">BIRTHDAY</p>
            <p className="font-medium">{member.birthday}</p>
          </div>
          <div>
            <p className="text-[9px] tracking-widest text-muted-foreground mb-0.5">SIGNS</p>
            <p className="font-medium">{member.sun} · {member.moon} · {member.rising}</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 py-4 flex-1">
        <p className="text-muted-foreground text-xs leading-relaxed">
          {member.bio}
        </p>
      </div>

      {/* Links */}
      {member.links && (
        <div className="px-6 pb-3">
          <div className="flex flex-wrap gap-1.5">
            {member.links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 text-[10px] tracking-wider border border-border/50 hover:border-foreground/50 hover:bg-foreground/5 transition-all flex items-center gap-1.5"
              >
                {link.name}
                <ExternalLink size={10} />
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      <div className="px-6 py-4">
        <div className="flex gap-1.5">
          {member.socials.map(({ name, icon: Icon, href }) => (
            <motion.a
              key={name}
              href={href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 border border-border/30 hover:border-foreground/50 hover:bg-foreground/5 transition-all"
              aria-label={name}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Eyes Close-up Image */}
      <div className="relative h-24 overflow-hidden">
        <img
          src={member.eyesImage}
          alt={`${member.name}`}
          className="w-full h-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
      </div>

      {/* Video Sliver Placeholder */}
      <div className="h-16 bg-black/40 flex items-center justify-center">
        <span className="text-[10px] tracking-widest text-white/40">VIDEO SLIVER</span>
      </div>
    </motion.div>
  );
};

const Members = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePos({ x, y });
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative"
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Pink glow following mouse */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 214, 236, 0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Side by side centered layout */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch justify-center w-full max-w-4xl relative z-10">
          {members.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Members;
