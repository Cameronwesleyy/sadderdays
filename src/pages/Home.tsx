import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import heroCar from "@/assets/hero-car.jpg";
import duoPortrait from "@/assets/duo-portrait.jpg";
import grantPortrait from "@/assets/grant-portrait.jpg";
import cameronPortrait from "@/assets/cameron-portrait.jpg";
import handsCover from "@/assets/hands-cover.jpg";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";
const Home = () => {
  return <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section - Full bleed image with overlapping text */}
        <section className="relative h-screen">
          <img src={heroCar} alt="Sadder Days" className="w-full h-full object-cover" />
          {/* Dark gradient overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="absolute bottom-8 left-6 md:left-12">
            <h1 className="font-display text-massive text-background mix-blend-difference">
              SADDER
              <br />
              DAYS
            </h1>
          </motion.div>
        </section>

        {/* Asymmetric section - Text left, image right */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12 min-h-[80vh] items-center">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="md:col-span-5">
            <h2 className="font-display text-4xl md:text-6xl tracking-tighter-custom mb-6">
              I'VE HAD
              <br />
              SADDER DAYS
            </h2>
            <Link to="/music" className="text-[10px] tracking-widest-custom editorial-link">
               LISTEN HERE
            </Link>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="md:col-span-4 md:col-start-7">
            <img alt="Grant" className="w-full aspect-[3/4] object-cover" src="/lovable-uploads/c25da56a-07ab-49f8-9230-c3b55215f540.jpg" />
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="md:col-span-3 md:-mt-32">
            <img alt="Cameron" className="w-full aspect-[4/5] object-cover" src="/lovable-uploads/99f341b0-eb45-48be-b65f-2e29de6768d3.jpg" />
          </motion.div>
        </section>

        {/* About Me floating section */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="md:col-span-6 md:col-start-6 grid grid-cols-2 gap-2">
            <img src={merch01} alt="Merch 1" className="w-full aspect-square object-cover" />
            <img src={merch02} alt="Merch 2" className="w-full aspect-square object-cover" />
            <img src={merch03} alt="Merch 3" className="w-full aspect-square object-cover" />
            <img src={merch04} alt="Merch 4" className="w-full aspect-square object-cover" />
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="md:col-span-4 md:col-start-1 md:row-start-1 md:self-end">
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom mb-6">
              SHOP
            </h2>
            <Link to="/merch" className="text-[10px] tracking-widest-custom editorial-link">
              BROWSE MERCH
            </Link>
          </motion.div>
        </section>

        {/* Highlighted Works - with filmstrip */}
        <section className="px-6 md:px-12 py-16">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="mb-8 border-solid border-primary">
            <h2 className="font-display text-4xl md:text-6xl tracking-tighter-custom text-sd-pink">
              VISUAL
              <br className="" />
              GALLERY
            </h2>
            <p className="font-display text-2xl md:text-4xl tracking-tighter-custom text-muted-foreground">
              23-24
            </p>
          </motion.div>

          {/* Filmstrip of images */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="filmstrip bg-foreground px-2">
            {[merch01, merch02, merch03, merch04, grantPortrait, cameronPortrait, handsCover].map((img, i) => <motion.img key={i} whileHover={{
            scale: 1.05
          }} src={img} alt={`Work ${i + 1}`} className="h-24 md:h-32 w-auto object-cover flex-shrink-0 cursor-pointer" />)}
          </motion.div>
        </section>

        {/* The Runway / Tour Section */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12 min-h-[70vh]">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="md:col-span-4">
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom mb-6">
              live
              <br />
              shows
            </h2>
            <Link to="/tour" className="text-[10px] tracking-widest-custom editorial-link">
              VIEW TOUR DATES
            </Link>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="md:col-span-5 md:col-start-5">
            <img src={duoPortrait} alt="Tour" className="w-full aspect-[4/5] object-cover object-top" />
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }} className="md:col-span-3 md:self-end space-y-2">
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">01 — NEW YORK</p>
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">02 — LOS ANGELES</p>
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">03 — LONDON</p>
            <p className="text-[10px] tracking-widest-custom text-muted-foreground">04 — TOKYO</p>
          </motion.div>
        </section>

        {/* Mood Section */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12">
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="md:col-span-5">
            <img src={grantPortrait} alt="Mood" className="w-full aspect-[3/4] object-cover" />
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="md:col-span-4 md:col-start-8 md:self-end">
            <Link to="/about" className="block">
              <h2 className="font-display text-6xl md:text-8xl tracking-tighter-custom text-right mb-4 hover:text-muted-foreground transition-colors">
                ABOUT
              </h2>
            </Link>
            <div className="flex gap-2 justify-end">
              <img src={cameronPortrait} alt="" className="w-20 h-28 object-cover" />
              <img src={handsCover} alt="" className="w-20 h-28 object-cover" />
            </div>
          </motion.div>

          <motion.p initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="md:col-span-12 text-sm text-muted-foreground mt-8">
            ​
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
    </PageTransition>;
};
export default Home;