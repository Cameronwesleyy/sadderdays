import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import PageTransition from "@/components/PageTransition";

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

          {/* About Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 mb-24"
            >
              {/* Story */}
              <div>
                <h2 className="text-2xl font-bold tracking-tighter-custom mb-6">
                  THE HAZE
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Sadder Days emerged from the fog of late-night sessions and shared 
                    silences. Four artists drawn together by the spaces between notes, 
                    the moments before dawn, the beauty in melancholy.
                  </p>
                  <p>
                    Our sound lives in the liminal — neither fully here nor there. 
                    We create music for the in-between moments, the quiet reflections, 
                    the drives through empty streets at 3am.
                  </p>
                  <p>
                    The name "Sadder Days" isn't about despair. It's about embracing 
                    the full spectrum of human emotion, finding beauty in the shadows, 
                    and understanding that melancholy can be its own form of light.
                  </p>
                </div>
              </div>

              {/* Philosophy */}
              <div>
                <h2 className="text-2xl font-bold tracking-tighter-custom mb-6">
                  YIN & YANG
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our visual and sonic identity is built on duality. The interplay 
                    of light and dark, silence and sound, presence and absence.
                  </p>
                  <p>
                    We believe in the power of contrast — how the darkest moments 
                    make the light more meaningful, how silence gives weight to every note.
                  </p>
                  <p>
                    This philosophy extends to our community. Team Yin. Team Yang. 
                    Two sides of the same experience, unified by the music that flows 
                    through both.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
            >
              {[
                { label: "YEARS ACTIVE", value: "5" },
                { label: "ALBUMS", value: "2" },
                { label: "SHOWS PLAYED", value: "127" },
                { label: "COUNTRIES", value: "18" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold tracking-tighter-custom mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-widest-custom text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
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
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail size={18} className="text-muted-foreground mt-1" />
                      <div>
                        <p className="text-xs tracking-widest-custom text-muted-foreground mb-1">
                          GENERAL INQUIRIES
                        </p>
                        <p>hello@sadderdays.world</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail size={18} className="text-muted-foreground mt-1" />
                      <div>
                        <p className="text-xs tracking-widest-custom text-muted-foreground mb-1">
                          BOOKING
                        </p>
                        <p>booking@sadderdays.world</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin size={18} className="text-muted-foreground mt-1" />
                      <div>
                        <p className="text-xs tracking-widest-custom text-muted-foreground mb-1">
                          MANAGEMENT
                        </p>
                        <p>Haze Management</p>
                        <p className="text-muted-foreground text-sm">Los Angeles, CA</p>
                      </div>
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
                      className="text-center py-12"
                    >
                      <p className="text-foreground mb-2">Message received.</p>
                      <p className="text-muted-foreground text-sm">
                        We'll fade back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Name"
                          className="w-full bg-transparent border-b border-border py-3 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Email"
                          className="w-full bg-transparent border-b border-border py-3 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Message"
                          rows={4}
                          className="w-full bg-transparent border-b border-border py-3 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center gap-3 px-8 py-4 bg-foreground text-background text-xs tracking-widest-custom hover:opacity-90 transition-opacity"
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
