import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import handsCover from "@/assets/hands-cover.jpg";
import aboutHero from "@/assets/about-hero.png";
import aboutRotate1 from "@/assets/about-rotate-1.jpg";
import aboutRotate2 from "@/assets/about-rotate-2.jpg";
import aboutRotate3 from "@/assets/about-rotate-3.jpg";
import aboutRotate4 from "@/assets/about-rotate-4.jpg";

const rotatingImages = [aboutRotate1, aboutRotate2, aboutRotate3, aboutRotate4];

const About = () => {
  const [gridImages, setGridImages] = useState([...rotatingImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGridImages(prev => {
        const shuffled = [...prev];
        // Shuffle array positions rapidly
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[70vh] p-6 md:p-12 flex flex-col items-center justify-center">
          <motion.img
            src={aboutHero}
            alt="I've Had Sadder Days"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md md:max-w-lg w-full h-auto"
          />
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-6xl tracking-tighter-custom mt-8 text-center"
          >
            ABOUT <span className="text-muted-foreground">US</span>
          </motion.h1>
        </section>

        {/* Content grid */}
        <section className="grid md:grid-cols-12 gap-8 p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-5 grid grid-cols-2 grid-rows-2 gap-1"
          >
            {gridImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Sadder Days"
                className="w-full aspect-square object-cover"
              />
            ))}
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

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
