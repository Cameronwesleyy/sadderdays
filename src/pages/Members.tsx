import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const PatreonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/>
  </svg>
);

const members = [
  {
    name: "GRANT",
    role: "Drums / Percussion",
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
    role: "Guitar / Production",
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

const Members = () => {
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
              THE DUO
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter-custom mb-6">
              MEMBERS
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Two souls navigating the space between elegance and chaos, 
              crafting what they call "RnM".
            </p>
          </motion.div>

          {/* Members */}
          <div className="space-y-32 max-w-6xl mx-auto">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid md:grid-cols-2 gap-12 items-start`}
              >
                {/* Image Placeholder */}
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className={`aspect-[3/4] bg-muted relative overflow-hidden ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[12rem] font-bold tracking-tighter-custom opacity-5">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </motion.div>

                {/* Info */}
                <div className={`space-y-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div>
                    <p className="text-xs tracking-widest-custom text-muted-foreground mb-2">
                      {member.role}
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter-custom">
                      {member.name}
                    </h2>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/30">
                    <div>
                      <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-1">
                        FAVORITE COLOR
                      </p>
                      <p className="text-sm font-medium">{member.favoriteColor}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-1">
                        PERSONALITY
                      </p>
                      <p className="text-sm font-medium">{member.personality}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-1">
                        BIRTHDAY
                      </p>
                      <p className="text-sm font-medium">{member.birthday}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-1">
                        SIGNS
                      </p>
                      <p className="text-sm font-medium">
                        {member.sun} · {member.moon} · {member.rising}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Additional Links (Cameron only) */}
                  {member.links && (
                    <div className="flex flex-wrap gap-3">
                      {member.links.map((link) => (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 text-xs tracking-widest-custom border border-border/50 hover:border-foreground/50 hover:bg-foreground/5 transition-all flex items-center gap-2"
                        >
                          {link.name}
                          <ExternalLink size={12} />
                        </motion.a>
                      ))}
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex gap-3 pt-4">
                    {member.socials.map(({ name, icon: Icon, href }) => (
                      <motion.a
                        key={name}
                        href={href}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 border border-border/30 hover:border-foreground/50 hover:bg-foreground/5 transition-all"
                        aria-label={name}
                      >
                        <Icon size={18} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Band Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 text-center max-w-3xl mx-auto"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground mb-8">
              HOUSTON, TEXAS
            </p>
            <blockquote className="text-2xl md:text-3xl font-light tracking-tight leading-relaxed text-foreground/90">
              "The band will not stop until the world has had Sadder Days."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Members;
