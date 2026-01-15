import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import heroCar from "@/assets/hero-car.jpg";
import duoPortrait from "@/assets/duo-portrait.jpg";
import grantPortrait from "@/assets/grant-portrait.jpg";
import cameronPortrait from "@/assets/cameron-portrait.jpg";
import handsCover from "@/assets/hands-cover.jpg";
import napkin from "@/assets/napkin.png";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";
import albumHaze from "@/assets/album-haze.jpg";
import yinYangCover from "@/assets/yin-yang-cover.jpg";
import galleryGrant1 from "@/assets/gallery-grant-1.jpg";
import galleryGrant2 from "@/assets/gallery-grant-2.jpg";
import galleryCar1 from "@/assets/gallery-car-1.jpg";
import galleryCar2 from "@/assets/gallery-car-2.jpg";
import galleryCar3 from "@/assets/gallery-car-3.jpg";
import galleryCameron1 from "@/assets/gallery-cameron-1.jpg";
import tourDuo from "@/assets/tour-duo.jpg";
const galleryImages = [{
  src: galleryGrant1,
  alt: "Grant",
  height: "h-64"
}, {
  src: yinYangCover,
  alt: "Yin Yang",
  height: "h-40"
}, {
  src: galleryCar1,
  alt: "Car shoot",
  height: "h-56"
}, {
  src: galleryCameron1,
  alt: "Cameron",
  height: "h-52"
}, {
  src: handsCover,
  alt: "Hands",
  height: "h-44"
}, {
  src: galleryGrant2,
  alt: "Grant",
  height: "h-60"
}, {
  src: galleryCar2,
  alt: "Car shoot",
  height: "h-48"
}, {
  src: grantPortrait,
  alt: "Grant Portrait",
  height: "h-56"
}, {
  src: galleryCar3,
  alt: "Car shoot",
  height: "h-52"
}, {
  src: cameronPortrait,
  alt: "Cameron Portrait",
  height: "h-64"
}, {
  src: merch01,
  alt: "Merch",
  height: "h-40"
}];
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
            <div className="flex items-center gap-4">
              <Link to="/music" className="text-[10px] tracking-widest-custom editorial-link">
                 LISTEN HERE
              </Link>
              <div className="flex items-center gap-3">
                {/* Spotify */}
                <a href="https://open.spotify.com/artist/YOUR_SPOTIFY_ID" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </a>
                {/* Apple Music */}
                <a href="https://music.apple.com/artist/YOUR_APPLE_MUSIC_ID" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.455-2.105-1.334a1.867 1.867 0 01.808-2.217c.258-.157.544-.261.837-.343.36-.1.724-.18 1.084-.273.27-.07.514-.18.678-.428.06-.09.095-.195.117-.302.023-.12.023-.245.023-.37V8.162a.673.673 0 00-.06-.297c-.067-.15-.208-.24-.383-.22-.243.027-.484.074-.724.124-1.36.283-2.718.57-4.078.853-.16.034-.313.083-.436.2-.09.087-.145.2-.163.324-.012.094-.02.188-.02.283v8.022c0 .453-.05.898-.243 1.313-.3.647-.81 1.053-1.51 1.235-.345.09-.697.13-1.054.13-.86-.006-1.644-.524-1.96-1.368a1.878 1.878 0 01.678-2.167c.263-.175.56-.287.865-.38.358-.11.72-.206 1.078-.315.235-.07.456-.17.617-.382.107-.14.166-.296.18-.47.016-.2.01-.4.01-.6V6.534c0-.243.03-.483.116-.71a1.12 1.12 0 01.644-.658c.25-.107.513-.17.78-.22 1.478-.296 2.955-.593 4.433-.888.61-.122 1.22-.244 1.83-.364.263-.052.526-.09.797-.077.424.02.794.193 1.037.552.143.21.22.453.25.71.015.128.02.258.02.387v6.098l-.003-.003z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://youtube.com/@YOUR_YOUTUBE_CHANNEL" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="md:col-span-6 md:col-start-7">
            <img alt="Grant" className="w-full aspect-[16/9] object-cover" src="/lovable-uploads/c25da56a-07ab-49f8-9230-c3b55215f540.jpg" />
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
        }} className="md:col-span-5 md:-mt-32">
            <img alt="Cameron" className="w-full aspect-[16/9] object-cover" src="/lovable-uploads/99f341b0-eb45-48be-b65f-2e29de6768d3.jpg" />
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
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom mb-6">APPAREL</h2>
            <Link to="/merch" className="text-[10px] tracking-widest-custom editorial-link">
              BROWSE MERCH
            </Link>
          </motion.div>
        </section>

        {/* Film Strip Gallery */}
        <section className="py-16">
          <div className="px-6 md:px-12 mb-8">
            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }}>
              <h2 className="font-display text-4xl md:text-6xl tracking-tighter-custom text-sd-pink">
                VISUAL
                <br />
                GALLERY
              </h2>
            </motion.div>
          </div>

          {/* Film strip container */}
          <div className="relative bg-black py-3">
            {/* Film perforations - top */}
            <div className="absolute top-0 left-0 right-0 h-3 flex justify-between px-2">
              {Array.from({
              length: 40
            }).map((_, i) => <div key={`top-${i}`} className="w-2 h-2 bg-background/20 rounded-sm" />)}
            </div>
            
            {/* Film perforations - bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-3 flex justify-between px-2">
              {Array.from({
              length: 40
            }).map((_, i) => <div key={`bottom-${i}`} className="w-2 h-2 bg-background/20 rounded-sm" />)}
            </div>

            {/* Scrollable gallery */}
            <div className="overflow-x-auto scrollbar-hide">
              <motion.div initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} viewport={{
              once: true
            }} className="flex items-center px-4 py-2" style={{
              width: "max-content"
            }}>
                {galleryImages.map((img, i) => <motion.div key={i} initial={{
                opacity: 0,
                x: 20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: i * 0.03
              }} className="flex-shrink-0">
                    <motion.img whileHover={{
                  scale: 1.05
                }} src={img.src} alt={img.alt} className="h-32 md:h-44 w-auto object-cover cursor-pointer transition-transform duration-300" />
                  </motion.div>)}
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Runway / Tour Section */}
        <section className="p-6 md:p-12">
          <div className="grid md:grid-cols-12 gap-4 mb-8">
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
          </div>

          <div className="flex justify-between items-start gap-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <img src={tourDuo} alt="Tour" className="max-w-2xl w-full aspect-[16/9] object-cover object-center" />
            </motion.div>

            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2
          }} className="space-y-2 flex-shrink-0 text-right">
              <p className="text-[10px] tracking-widest-custom text-muted-foreground">01 — NEW YORK</p>
              <p className="text-[10px] tracking-widest-custom text-muted-foreground">02 — LOS ANGELES</p>
              <p className="text-[10px] tracking-widest-custom text-muted-foreground">03 — LONDON</p>
              <p className="text-[10px] tracking-widest-custom text-muted-foreground">04 — TOKYO</p>
            </motion.div>
          </div>
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
            <img src={napkin} alt="I've Had Sadder Days" className="w-full max-w-4xl object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)] rotate-3" />
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} className="md:col-span-4 md:col-start-8 md:self-end">
            <Link to="/about" className="block">
              <h2 className="font-display text-6xl md:text-8xl tracking-tighter-custom mb-4 hover:text-muted-foreground transition-colors text-left">ABOUT SADDER DAYS</h2>
            </Link>
            <div className="flex gap-2 justify-end">
              
              
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