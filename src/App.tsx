import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import CornerNavigation from "@/components/CornerNavigation";
import GrainOverlay from "@/components/GrainOverlay";
import CartDrawer from "@/components/CartDrawer";
import GlobalEmailSignup from "@/components/GlobalEmailSignup";
import Enter from "./pages/Enter";
import Home from "./pages/Home";
import Merch from "./pages/Merch";
import Product from "./pages/Product";
import Music from "./pages/Music";
import Members from "./pages/Members";
import Tour from "./pages/Tour";
import About from "./pages/About";
import Lab from "./pages/Lab";
import Lyrics from "./pages/Lyrics";

import Manage from "./pages/Manage";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MetaApplier() {
  useEffect(() => {
    const applyMeta = async () => {
      const { data } = await supabase.from("site_content").select("*").in("id", ["meta_title", "meta_description", "meta_og_image", "meta_favicon"]);
      if (!data) return;
      const map: Record<string, string> = {};
      data.forEach((r) => { map[r.id] = r.content; });
      
      if (map.meta_title) document.title = map.meta_title;
      if (map.meta_description) {
        document.querySelector('meta[name="description"]')?.setAttribute("content", map.meta_description);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", map.meta_description);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", map.meta_description);
      }
      if (map.meta_title) {
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", map.meta_title);
        document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", map.meta_title);
      }
      if (map.meta_og_image) {
        document.querySelector('meta[property="og:image"]')?.setAttribute("content", map.meta_og_image);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", map.meta_og_image);
      }
      if (map.meta_favicon) {
        const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (link) link.href = map.meta_favicon;
      }
    };
    applyMeta();
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <MetaApplier />
            <GrainOverlay />
            <CornerNavigation />
            <CartDrawer />
            <GlobalEmailSignup />
            <AnimatePresence mode="wait">
              <main className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Enter />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/merch" element={<Merch />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/tour" element={<Tour />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/lab" element={<Lab />} />
                  <Route path="/lyrics" element={<Lyrics />} />
                  
                  <Route path="/manage" element={<Manage />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </AnimatePresence>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
