import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import bandDuo from "@/assets/band-duo.jpg";

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
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Massive heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-massive font-display tracking-tighter-custom mb-16 sticky-heading"
          >
            ABOUT
          </motion.h1>

          {/* Editorial layout */}
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={bandDuo}
                alt="Sadder Days"
                className="w-full aspect-[4/5] object-cover"
              />
            </motion.div>

            {/* Right - Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-4">
                HOUSTON, TX
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Sadder Days combines influences from RnB, Jazz, and Classical 
                music to create a unique metal experience that blends sensual 
                grooves, elegant rhythms, and nocturnal soundscapes.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Members Grant and Cameron have been friends since elementary 
                school, taking up their respective instruments in Summer 2020.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From the start, the band wanted their music to provide a path 
                for Black culture to become synonymous with elegance, class, 
                and sensuality.
              </p>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <blockquote className="text-2xl md:text-4xl font-display tracking-tighter-custom leading-tight">
              "The band will not stop until the world has had Sadder Days."
            </blockquote>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16"
          >
            {/* Contact Info */}
            <div>
              <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-8">
                CONTACT
              </p>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>hello@sadderdays.world</p>
                <p>booking@sadderdays.world</p>
              </div>
            </div>

            {/* Form */}
            <div>
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-sm">Message received.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="NAME"
                    className="w-full bg-transparent border-b border-border py-3 text-sm placeholder:text-muted-foreground placeholder:text-[10px] placeholder:tracking-widest-custom focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="EMAIL"
                    className="w-full bg-transparent border-b border-border py-3 text-sm placeholder:text-muted-foreground placeholder:text-[10px] placeholder:tracking-widest-custom focus:outline-none focus:border-foreground transition-colors"
                  />
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="MESSAGE"
                    rows={3}
                    className="w-full bg-transparent border-b border-border py-3 text-sm placeholder:text-muted-foreground placeholder:text-[10px] placeholder:tracking-widest-custom focus:outline-none focus:border-foreground transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="text-[10px] tracking-widest-custom editorial-link flex items-center gap-2"
                  >
                    SEND <Send size={10} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
