import { motion } from "framer-motion";
import { Instagram, Twitter } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const members = [
  {
    name: "ECHO",
    role: "Vocals / Production",
    bio: "The voice that echoes through the haze. Echo crafts ethereal soundscapes that blur the line between dreams and reality.",
    socials: { instagram: "#", twitter: "#" },
  },
  {
    name: "SHADE",
    role: "Guitar / Synths",
    bio: "Master of shadows and light. Shade's guitar work weaves through tracks like fog through trees.",
    socials: { instagram: "#", twitter: "#" },
  },
  {
    name: "DRIFT",
    role: "Bass / Keys",
    bio: "The grounding force. Drift provides the deep, resonant foundation that anchors the band's atmospheric sound.",
    socials: { instagram: "#", twitter: "#" },
  },
  {
    name: "PULSE",
    role: "Drums / Percussion",
    bio: "The heartbeat of Sadder Days. Pulse's rhythms are both primal and precise, driving each track forward.",
    socials: { instagram: "#", twitter: "#" },
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
              THE COLLECTIVE
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter-custom mb-6">
              MEMBERS
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Four souls navigating the space between light and shadow.
            </p>
          </motion.div>

          {/* Members Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-ethereal overflow-hidden group"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl font-bold tracking-tighter-custom opacity-10">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center gap-4 z-20"
                    >
                      {[
                        { icon: Instagram, href: member.socials.instagram },
                        { icon: Twitter, href: member.socials.twitter },
                      ].map(({ icon: Icon, href }, i) => (
                        <motion.a
                          key={i}
                          href={href}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 border border-foreground/30 hover:border-foreground transition-colors"
                        >
                          <Icon size={18} />
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <p className="text-xs tracking-widest-custom text-muted-foreground mb-2">
                      {member.role}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tighter-custom mb-4">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Band Photo Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="card-ethereal aspect-[21/9] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-6xl font-bold tracking-tighter-custom opacity-20">
                  SADDER DAYS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Members;
