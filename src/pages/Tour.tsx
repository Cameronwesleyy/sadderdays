import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Bell, Check } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const tourDates = [
  {
    id: 1,
    city: "NEW YORK",
    venue: "Terminal 5",
    date: "MAR 15, 2025",
    status: "available",
  },
  {
    id: 2,
    city: "LOS ANGELES",
    venue: "The Wiltern",
    date: "MAR 22, 2025",
    status: "sold-out",
  },
  {
    id: 3,
    city: "LONDON",
    venue: "Brixton Academy",
    date: "APR 05, 2025",
    status: "available",
  },
  {
    id: 4,
    city: "TOKYO",
    venue: "Shibuya O-East",
    date: "APR 15, 2025",
    status: "available",
  },
  {
    id: 5,
    city: "BERLIN",
    venue: "Columbiahalle",
    date: "APR 22, 2025",
    status: "low-stock",
  },
  {
    id: 6,
    city: "PARIS",
    venue: "L'Olympia",
    date: "APR 25, 2025",
    status: "sold-out",
  },
];

const Tour = () => {
  const [reminders, setReminders] = useState<number[]>([]);

  const toggleReminder = (id: number) => {
    setReminders((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

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
              WORLD TOUR 2025
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter-custom mb-6">
              TOUR
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Experience the haze live. Limited cities, infinite atmosphere.
            </p>
          </motion.div>

          {/* Tour Dates Table */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="card-ethereal overflow-hidden"
            >
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-4 gap-4 p-6 border-b border-border/30 text-xs tracking-widest-custom text-muted-foreground">
                <span>DATE</span>
                <span>CITY</span>
                <span>VENUE</span>
                <span className="text-right">STATUS</span>
              </div>

              {/* Date Rows */}
              <div className="divide-y divide-border/20">
                {tourDates.map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ backgroundColor: "hsl(var(--accent) / 0.3)" }}
                    className="p-6 transition-colors"
                  >
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      {/* Date */}
                      <div className="flex items-center gap-3">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span className="text-sm">{show.date}</span>
                      </div>

                      {/* City */}
                      <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-muted-foreground md:hidden" />
                        <span className="font-medium tracking-tight">{show.city}</span>
                      </div>

                      {/* Venue */}
                      <span className="text-sm text-muted-foreground">
                        {show.venue}
                      </span>

                      {/* Status/Button */}
                      <div className="flex justify-end">
                        <AnimatePresence mode="wait">
                          {show.status === "sold-out" ? (
                            <motion.button
                              key="sold-out"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              onClick={() => toggleReminder(show.id)}
                              className={`flex items-center gap-2 px-4 py-2 text-xs tracking-widest-custom transition-colors ${
                                reminders.includes(show.id)
                                  ? "bg-foreground text-background"
                                  : "border border-border hover:border-foreground/50"
                              }`}
                            >
                              {reminders.includes(show.id) ? (
                                <>
                                  <Check size={12} />
                                  REMINDED
                                </>
                              ) : (
                                <>
                                  <Bell size={12} />
                                  REMIND ME
                                </>
                              )}
                            </motion.button>
                          ) : (
                            <motion.a
                              key="available"
                              href="#"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`px-6 py-2 text-xs tracking-widest-custom transition-colors ${
                                show.status === "low-stock"
                                  ? "bg-destructive text-destructive-foreground"
                                  : "bg-foreground text-background hover:opacity-90"
                              }`}
                            >
                              {show.status === "low-stock" ? "LOW STOCK" : "TICKETS"}
                            </motion.a>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter for tour updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
                MORE DATES COMING SOON
              </p>
              <p className="text-muted-foreground text-sm">
                Subscribe to our newsletter for first access to new tour dates.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Tour;
