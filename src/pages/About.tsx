import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import duoPortrait from "@/assets/duo-portrait.jpg";
import handsCover from "@/assets/hands-cover.jpg";

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[70vh] p-6 md:p-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-massive tracking-tighter-custom"
          >
            ABOUT
            <br />
            <span className="text-muted-foreground">US</span>
          </motion.h1>
        </section>

        {/* Content grid */}
        <section className="grid md:grid-cols-12 gap-8 p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-6"
          >
            <img
              src={duoPortrait}
              alt="Sadder Days"
              className="w-full aspect-[4/5] object-cover object-top"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 md:col-start-8 flex flex-col justify-center"
          >
            <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-6">
              HOUSTON, TX
            </p>
            <p className="text-sm leading-relaxed mb-6">
              Sadder Days combines influences from RnB, Jazz, and Classical 
              music to create a unique metal experience that blends sensual 
              grooves, elegant rhythms, and nocturnal soundscapes.
            </p>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
              Members Grant and Cameron have been friends since elementary 
              school, taking up their respective instruments in Summer 2020.
            </p>
            <p className="text-sm leading-relaxed">
              From the start, the band wanted their music to provide a path 
              for Black culture to become synonymous with elegance, class, 
              and sensuality.
            </p>
          </motion.div>
        </section>

        {/* Quote */}
        <section className="p-6 md:p-12 py-24">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl tracking-tighter-custom leading-tight max-w-4xl"
          >
            "THE BAND WILL NOT STOP UNTIL THE WORLD HAS HAD SADDER DAYS."
          </motion.blockquote>
          <p className="text-[10px] tracking-widest-custom text-muted-foreground mt-6">
            — AND EVEN THEN, THEY'RE GOING TO KEEP GOING.
          </p>
        </section>

        {/* Image + RnM */}
        <section className="grid md:grid-cols-12 gap-8 p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter-custom mb-6">
              RnM
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pulling from prominent influences in Black music, Sadder Days 
              created their own genre—combining sounds from RnB, Jazz, Gospel, 
              House, Hip-Hop, and Classical music, wrapped in a neat Metal package.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 md:col-start-7"
          >
            <img
              src={handsCover}
              alt="Yin Yang"
              className="w-full aspect-square object-cover"
            />
          </motion.div>
        </section>

        {/* Contact */}
        <section className="bg-foreground text-background p-6 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[10px] tracking-widest-custom text-background/50 mb-4">
                CONTACT
              </p>
              <p className="text-sm mb-2">hello@sadderdays.world</p>
              <p className="text-sm text-background/70">booking@sadderdays.world</p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
