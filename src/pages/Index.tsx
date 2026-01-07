import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={heroBg} 
              alt="Hazy mountain landscape" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          
          {/* Fog Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
          <div className="fog-overlay" />
          
          {/* Radial Fog */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, hsl(0 0% 20% / 0.3) 0%, transparent 50%)"
            }}
          />

          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xs tracking-widest-custom text-muted-foreground mb-8"
              >
                ENTERING THE HAZE
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter-custom text-glow mb-8"
              >
                SADDER
                <br />
                DAYS
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-muted-foreground max-w-md mx-auto mb-12"
              >
                Where shadows dance and melodies fade into the eternal fog.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to="/music">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-foreground text-background text-xs font-medium tracking-widest-custom hover:opacity-90 transition-opacity flex items-center gap-3"
                  >
                    LISTEN NOW
                    <ArrowRight size={14} />
                  </motion.button>
                </Link>
                <Link to="/lab">
                  <motion.button
                    whileHover={{ scale: 1.02, borderColor: "hsl(var(--foreground))" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 border border-border text-xs font-medium tracking-widest-custom transition-colors"
                  >
                    ENTER THE LAB
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
            />
          </motion.div>
        </section>

        {/* Featured Section */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { title: "NEW ALBUM", subtitle: "HAZE", link: "/music" },
                { title: "WORLD TOUR", subtitle: "2025", link: "/tour" },
                { title: "THE LAB", subtitle: "YIN/YANG", link: "/lab" },
              ].map((item, index) => (
                <Link key={item.title} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -4 }}
                    className="group card-ethereal p-8 h-64 flex flex-col justify-end cursor-pointer"
                  >
                    <p className="text-xs tracking-widest-custom text-muted-foreground mb-2">
                      {item.title}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tighter-custom group-hover:text-glow transition-all">
                      {item.subtitle}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/20 to-background" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-2xl md:text-4xl font-light tracking-tight leading-relaxed text-muted-foreground">
                "In the space between light and dark, we find our truest sound."
              </p>
              <footer className="mt-8 text-xs tracking-widest-custom text-muted-foreground">
                — SADDER DAYS
              </footer>
            </motion.blockquote>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
