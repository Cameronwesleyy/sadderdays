import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import handsCover from "@/assets/hands-cover.jpg";
import aboutHero from "@/assets/about-hero.png";
import aboutRotate1 from "@/assets/about-rotate-1.jpg";
import aboutRotate2 from "@/assets/about-rotate-2.jpg";
import aboutRotate3 from "@/assets/about-rotate-3.jpg";
import aboutRotate4 from "@/assets/about-rotate-4.jpg";

const defaultRotatingImages = [aboutRotate1, aboutRotate2, aboutRotate3, aboutRotate4];

const About = () => {
  const [gridImages, setGridImages] = useState([...defaultRotatingImages]);
  const [cms, setCms] = useState<Record<string, string>>({});
  const [rotateSource, setRotateSource] = useState<string[]>(defaultRotatingImages);

  useEffect(() => {
    supabase.from("site_content").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((r: { id: string; content: string }) => { map[r.id] = r.content; });
        setCms(map);
        try {
          const parsed = JSON.parse(map.about_rotate_images || "[]");
          if (parsed.length > 0) {
            setRotateSource(parsed);
            setGridImages(parsed);
          }
        } catch { /* use defaults */ }
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGridImages(prev => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [rotateSource]);

  const cmsImg = (key: string, fallback: string) => { const v = cms[key]; return v && v !== "__removed__" ? v : fallback; };
  const heroImg = cmsImg("about_hero_image", aboutHero);
  const handsImg = cmsImg("about_hands_image", handsCover);
  const location = cms.about_location || "HOUSTON, TX";
  const bio1 = cms.about_bio || "Sadder Days combines influences from RnB, Jazz, and Classical music to create a unique metal experience that blends sensual grooves, elegant rhythms, and nocturnal soundscapes.";
  const bio2 = cms.about_bio_2 || "Members Grant and Cameron have been friends since elementary school, taking up their respective instruments in Summer 2020.";
  const bio3 = cms.about_bio_3 || "From the start, the band wanted their music to provide a path for Black culture to become synonymous with elegance, class, and sensuality.";
  const quote = cms.about_quote || '"THE BAND WILL NOT STOP UNTIL THE WORLD HAS HAD SADDER DAYS."';
  const quoteAttrib = cms.about_quote_attribution || "— AND EVEN THEN, THEY'RE GOING TO KEEP GOING.";
  const rnmDesc = cms.about_rnm || "Pulling from prominent influences in Black music, Sadder Days created their own genre—combining sounds from RnB, Jazz, Gospel, House, Hip-Hop, and Classical music, wrapped in a neat Metal package.";

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[70vh] p-6 md:p-12 flex flex-col items-center justify-center">
          <motion.img
            src={heroImg}
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
            {gridImages.slice(0, 4).map((img, i) => (
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
              {location}
            </p>
            <p className="text-sm leading-relaxed mb-6">{bio1}</p>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">{bio2}</p>
            <p className="text-sm leading-relaxed">{bio3}</p>
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
            {quote}
          </motion.blockquote>
          <p className="text-[10px] tracking-widest-custom text-muted-foreground mt-6">
            {quoteAttrib}
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
            <p className="text-sm text-muted-foreground leading-relaxed">{rnmDesc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 md:col-start-7"
          >
            <img
              src={handsImg}
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
