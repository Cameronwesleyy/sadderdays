import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube } from "lucide-react";

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
    <footer className="border-t border-border/30 mt-32">
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

        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 SADDER DAYS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-muted-foreground tracking-widest-custom">
            SADDERDAYS.WORLD
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
