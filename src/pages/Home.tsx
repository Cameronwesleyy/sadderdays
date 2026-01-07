import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import CrossIcon from "@/components/CrossIcon";
import homeHero from "@/assets/home-hero-1.jpg";
import aboutHero from "@/assets/about-hero.jpg";

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={homeHero}
              alt="Sadder Days"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>

          <div className="relative z-10 text-center container mx-auto px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs tracking-widest-custom text-muted-foreground mb-6"
            >
              HOUSTON, TEXAS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter-custom text-glow mb-4"
            >
              SADDER
              <br />
              DAYS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-muted-foreground max-w-md mx-auto mb-12"
            >
              RnB meets Metal. Elegance meets chaos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/music">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-foreground text-background text-xs tracking-widest-custom flex items-center gap-3"
                >
                  LISTEN NOW
                  <ArrowRight size={14} />
                </motion.button>
              </Link>
              <Link to="/lab">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-border text-xs tracking-widest-custom hover:border-foreground/50 transition-colors"
                >
                  ENTER THE LAB
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
            />
          </motion.div>
        </section>

        {/* Featured Cards */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { title: "LOUNGEWEAR PACK", subtitle: "23'", link: "/merch" },
                { title: "THE LAB", subtitle: "YIN/YANG", link: "/lab" },
                { title: "WORLD TOUR", subtitle: "2025", link: "/tour" },
              ].map((item, index) => (
                <Link key={item.title} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
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

        {/* Band Image Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[21/9] overflow-hidden"
            >
              <img
                src={aboutHero}
                alt="Grant and Cameron of Sadder Days"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CrossIcon size="lg" className="text-foreground/80" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-2xl md:text-4xl font-light tracking-tight leading-relaxed text-muted-foreground mb-8">
                "The band will not stop until the world has had Sadder Days."
              </p>
              <footer className="text-xs tracking-widest-custom text-muted-foreground">
                — AND EVEN THEN, THEY'RE GOING TO KEEP GOING
              </footer>
            </motion.blockquote>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
