import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import bandDuo from "@/assets/band-duo.jpg";

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6">
        {/* Center content */}
        <div className="max-w-5xl w-full">
          {/* Massive heading - sticky effect */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-massive font-display tracking-tighter-custom mb-12 sticky-heading"
          >
            SADDER
            <br />
            DAYS
          </motion.h1>

          {/* Editorial layout */}
          <div className="grid md:grid-cols-2 gap-16 mt-24">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src={bandDuo}
                alt="Sadder Days"
                className="w-full aspect-[3/4] object-cover"
              />
              <p className="text-[10px] tracking-widest-custom text-muted-foreground mt-3">
                HOUSTON, TX — 2024
              </p>
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col justify-end"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
                RnB meets Metal. A path for Black culture to become synonymous 
                with elegance, class, and sensuality.
              </p>

              <div className="space-y-2">
                <Link
                  to="/music"
                  className="block text-[10px] tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground"
                >
                  LISTEN NOW
                </Link>
                <Link
                  to="/merch"
                  className="block text-[10px] tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground"
                >
                  SHOP MERCH
                </Link>
                <Link
                  to="/tour"
                  className="block text-[10px] tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground"
                >
                  TOUR DATES
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
