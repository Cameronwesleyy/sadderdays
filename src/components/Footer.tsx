import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube } from "lucide-react";
import yinyangLogo from "@/assets/yinyang-menu-logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer>
      {/* Booking Section */}
      <section className="bg-foreground text-background p-6 md:p-12">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter-custom mb-8">
              BOOKING
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-[10px] tracking-widest-custom text-background/50 mb-2">
              REPRESENTATION
            </p>
            <p className="text-sm mb-4">SADDER DAYS MGMT</p>
            <a 
              href="mailto:hello@sadderdays.world"
              className="text-sm text-background/70 hover:text-background transition-colors hover:underline underline-offset-4"
            >
              hello@sadderdays.world
            </a>
          </div>
          <div className="md:col-span-4">
            <p className="text-[10px] tracking-widest-custom text-background/50 mb-2">
              PROJECT & DIRECT INQUIRIES
            </p>
            <a 
              href="mailto:booking@sadderdays.world"
              className="text-sm text-background hover:text-background/80 transition-colors hover:underline underline-offset-4"
            >
              booking@sadderdays.world
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter & Social Section */}
      <div className="border-t border-border/30 bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Newsletter */}
            <div>
              <h3 className="text-xs tracking-widest-custom text-muted-foreground mb-4">
                PRE-SAVE & UPDATES
              </h3>
              {isSubmitted ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-foreground"
                >
                  Welcome to the haze.
                </motion.p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border-b border-border/50 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="text-xs tracking-widest-custom px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
                  >
                    SUBSCRIBE
                  </motion.button>
                </form>
              )}
            </div>

            {/* Social */}
            <div className="flex flex-col items-start md:items-end gap-4">
              <h3 className="text-xs tracking-widest-custom text-muted-foreground">
                FOLLOW THE FOG
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map(({ icon: Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    whileHover={{ y: -2 }}
                    className="p-2 border border-border/30 hover:border-foreground/50 transition-colors"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 relative">
            <p className="text-xs text-muted-foreground">
              © 2025 SADDER DAYS. ALL RIGHTS RESERVED.
            </p>
            <p className="text-xs text-muted-foreground tracking-widest-custom">
              SADDERDAYS.WORLD
            </p>
            <img 
              src={yinyangLogo} 
              alt="Sadder Days" 
              className="absolute bottom-0 right-0 h-8 w-auto opacity-60"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
