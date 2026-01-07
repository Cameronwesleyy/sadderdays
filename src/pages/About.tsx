import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import CrossIcon from "@/components/CrossIcon";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
    }
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
              OUR STORY
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter-custom mb-6">
              ABOUT
            </h1>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-video mb-16 overflow-hidden"
          >
            <img
              src={aboutHero}
              alt="Sadder Days"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <CrossIcon size="lg" className="text-cream/80" />
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 mb-24"
            >
              {/* Origin Story */}
              <div>
                <h2 className="text-2xl font-bold tracking-tighter-custom mb-6">
                  HOUSTON, TEXAS
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Sadder Days combines influences from RnB, Jazz, and Classical 
                    music to create a unique metal experience that blends sensual 
                    grooves, elegant rhythms, and nocturnal soundscapes.
                  </p>
                  <p>
                    Members Grant and Cameron have been friends since elementary 
                    school, taking up their respective instruments in the Summer 
                    of 2020.
                  </p>
                </div>
              </div>

              {/* RnM Genre */}
              <div>
                <h2 className="text-2xl font-bold tracking-tighter-custom mb-6">
                  RnM
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    From the start, the band wanted their music to provide a path 
                    for Black culture to become synonymous with elegance, class, 
                    and sensuality.
                  </p>
                  <p>
                    Pulling from prominent influences in Black music, Sadder Days 
                    created their own genre—combining sounds from RnB, Jazz, Gospel, 
                    House, Hip-Hop, and Classical music, wrapped in a neat Metal package.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <p className="text-xs tracking-widest-custom text-muted-foreground mb-8">
                PHILOSOPHY
              </p>
              <blockquote className="text-2xl md:text-3xl font-light tracking-tight leading-relaxed text-foreground/90 mb-6">
                "Nothing about the band is 'just good enough'. Every aspect has been 
                carefully thought of and accounted for."
              </blockquote>
              <p className="text-sm text-muted-foreground italic">
                The band will not stop until the world has had Sadder Days.
                <br />
                <span className="text-muted-foreground/60">
                  (And even then, they're going to keep going.)
                </span>
              </p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-ethereal p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter-custom mb-6">
                    CONTACT
                  </h2>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs tracking-widest-custom text-muted-foreground/50 mb-1">
                        GENERAL
                      </p>
                      <p>hello@sadderdays.world</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest-custom text-muted-foreground/50 mb-1">
                        BOOKING
                      </p>
                      <p>booking@sadderdays.world</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter-custom mb-6">
                    GET IN TOUCH
                  </h2>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-8"
                    >
                      <p className="text-foreground mb-2">Message received.</p>
                      <p className="text-muted-foreground text-sm">
                        We'll fade back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Name"
                        className="w-full bg-transparent border-b border-border py-3 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Email"
                        className="w-full bg-transparent border-b border-border py-3 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Message"
                        rows={4}
                        className="w-full bg-transparent border-b border-border py-3 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center gap-3 px-8 py-4 bg-foreground text-background text-xs tracking-widest-custom"
                      >
                        SEND MESSAGE
                        <Send size={14} />
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
