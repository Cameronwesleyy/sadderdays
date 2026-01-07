import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import duoPortrait from "@/assets/duo-portrait.jpg";
import grantPortrait from "@/assets/grant-portrait.jpg";
import cameronPortrait from "@/assets/cameron-portrait.jpg";
import handsCover from "@/assets/hands-cover.jpg";
import yinyangText from "@/assets/yinyang-text.png";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section - Full bleed image with overlapping text */}
        <section className="relative h-screen">
          <img
            src={duoPortrait}
            alt="Sadder Days"
            className="w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-8 left-6 md:left-12"
          >
            <h1 className="font-display text-massive text-background mix-blend-difference">
              SADDER
              <br />
              DAYS
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 right-6 md:right-12 text-[10px] tracking-widest-custom text-background/80"
          >
            HOUSTON, TX — 2024
          </motion.p>
        </section>

        {/* Asymmetric section - Text left, image right */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12 min-h-[80vh] items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <h2 className="font-display text-4xl md:text-6xl tracking-tighter-custom mb-6">
              HELLO
              <br />
              PEOPLE
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-8">
              RnB meets Metal. A path for Black culture to become synonymous with elegance, class, and sensuality.
            </p>
            <Link
              to="/about"
              className="text-[10px] tracking-widest-custom editorial-link"
            >
              READ MORE
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:col-start-7"
          >
            <img
              src={grantPortrait}
              alt="Grant"
              className="w-full aspect-[3/4] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 md:-mt-32"
          >
            <img
              src={cameronPortrait}
              alt="Cameron"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>
        </section>

        {/* Quote Section */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <p className="font-display text-2xl md:text-4xl tracking-tighter-custom leading-tight mb-4">
              I'M NOT INTERESTED IN BEING PERFECT. I AM NOT A SYMBOL, NOT A FACE OF THE ERA, NOT A DOLL.
              <br />
              <span className="text-muted-foreground">I AM THE SIGNAL.</span>
            </p>
            <p className="text-[10px] tracking-widest-custom text-muted-foreground mt-8">
              — SADDER DAYS PHILOSOPHY
            </p>
          </motion.div>
        </section>

        {/* About Me floating section */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12">
          <div className="md:col-span-6 md:col-start-6">
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              src={handsCover}
              alt="Yin Yang Cover"
              className="w-full aspect-square object-cover mb-4"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:col-start-1 md:row-start-1 md:self-end"
          >
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom mb-6">
              ABOUT ME
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The band combines influences from RnB, Jazz, and Classical music to create a unique metal experience.
            </p>
            <p className="text-xs text-muted-foreground/60">
              MY STYLE IS A MIX OF DECADENCE, BRUTALISM AND NIGHTTIME PLASTICITY.
            </p>
          </motion.div>
        </section>

        {/* Highlighted Works - with filmstrip */}
        <section className="px-6 md:px-12 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-display text-4xl md:text-6xl tracking-tighter-custom text-sd-pink">
              HIGHLIGHTED
              <br />
              WORKS
            </h2>
            <p className="font-display text-2xl md:text-4xl tracking-tighter-custom text-muted-foreground">
              23-24
            </p>
          </motion.div>

          {/* Filmstrip of images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="filmstrip bg-foreground px-2"
          >
            {[merch01, merch02, merch03, merch04, grantPortrait, cameronPortrait, handsCover].map((img, i) => (
              <motion.img
                key={i}
                whileHover={{ scale: 1.05 }}
                src={img}
                alt={`Work ${i + 1}`}
                className="h-24 md:h-32 w-auto object-cover flex-shrink-0 cursor-pointer"
              />
            ))}
          </motion.div>

          <p className="text-[10px] tracking-widest-custom text-muted-foreground mt-4">
            A FACE THAT DOESN'T NEED FILTERS. WORKS WITH THE IMAGE AS WITH A WEAPON.
          </p>
        </section>

        {/* The Runway / Tour Section */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12 min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom mb-6">
              THE
              <br />
              RUNWAY
            </h2>
            <Link
              to="/tour"
              className="text-[10px] tracking-widest-custom editorial-link"
            >
              VIEW TOUR DATES
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 md:col-start-5"
          >
            <img
              src={duoPortrait}
              alt="Tour"
              className="w-full aspect-[4/5] object-cover object-top"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 md:self-end space-y-2"
          >
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">01 — NEW YORK</p>
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">02 — LOS ANGELES</p>
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">03 — LONDON</p>
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">04 — TOKYO</p>
          </motion.div>
        </section>

        {/* Mood Section */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <img
              src={grantPortrait}
              alt="Mood"
              className="w-full aspect-[3/4] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:col-start-8 md:self-end"
          >
            <h2 className="font-display text-6xl md:text-8xl tracking-tighter-custom text-right mb-4">
              MOOD
            </h2>
            <div className="flex gap-2 justify-end">
              <img src={cameronPortrait} alt="" className="w-20 h-28 object-cover" />
              <img src={handsCover} alt="" className="w-20 h-28 object-cover" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-12 text-sm text-muted-foreground mt-8"
          >
            I'M THE SILENCE AFTER THE FLASH. PRETTY CAN BE BORING. I DON'T DRESS UP — I BECOME.
          </motion.p>
        </section>

        {/* Booking / Footer Section */}
        <section className="bg-foreground text-background p-6 md:p-12">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="font-display text-4xl md:text-5xl tracking-tighter-custom mb-8">
                BOOKING
              </h2>
            </div>
            <div className="md:col-span-4">
              <p className="text-[10px] tracking-widest-custom text-background/50 mb-2">
                REPRESENTATION
              </p>
              <p className="text-sm mb-4">SADDER DAYS MGMT</p>
              <p className="text-sm text-background/70">hello@sadderdays.world</p>
            </div>
            <div className="md:col-span-4">
              <p className="text-[10px] tracking-widest-custom text-background/50 mb-2">
                PROJECT & DIRECT INQUIRIES
              </p>
              <p className="text-sm">booking@sadderdays.world</p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
