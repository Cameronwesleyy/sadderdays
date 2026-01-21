import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const tourDates = [
  { date: "MAR 15", city: "NEW YORK", venue: "Terminal 5", status: "available" },
  { date: "MAR 22", city: "LOS ANGELES", venue: "The Wiltern", status: "sold-out" },
  { date: "APR 05", city: "LONDON", venue: "Brixton Academy", status: "available" },
  { date: "APR 15", city: "TOKYO", venue: "Shibuya O-East", status: "available" },
  { date: "APR 22", city: "BERLIN", venue: "Columbiahalle", status: "low" },
  { date: "APR 25", city: "PARIS", venue: "L'Olympia", status: "sold-out" },
];

const Tour = () => {
  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Massive heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-massive font-display tracking-tighter-custom mb-16 sticky-heading"
          >
            TOUR
          </motion.h1>

          {/* Brutalist table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="border-t border-foreground"
          >
            {tourDates.map((show, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="brutalist-row group hover:bg-muted/30 transition-colors px-2"
              >
                {/* Date - Bold */}
                <div className="flex items-baseline gap-8">
                  <span className="text-2xl md:text-4xl font-display tracking-tighter-custom">
                    {show.date}
                  </span>
                  <span className="text-[10px] tracking-widest-custom text-muted-foreground hidden md:block">
                    {show.venue}
                  </span>
                </div>

                {/* City - Tiny */}
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-widest-custom text-muted-foreground">
                    {show.city}
                  </span>
                  {show.status === "sold-out" ? (
                    <span className="text-[8px] tracking-widest-custom text-muted-foreground/50">
                      SOLD OUT
                    </span>
                  ) : show.status === "low" ? (
                    <span className="text-[8px] tracking-widest-custom text-sd-red">
                      LOW
                    </span>
                  ) : (
                    <a
                      href="#"
                      className="text-[8px] tracking-widest-custom editorial-link opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      TICKETS
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[10px] tracking-widest-custom text-muted-foreground mt-16"
          >
            MORE DATES ANNOUNCED SOON
          </motion.p>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Tour;
