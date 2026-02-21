import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import CornerNavigation from "@/components/CornerNavigation";
import GrainOverlay from "@/components/GrainOverlay";
import CartDrawer from "@/components/CartDrawer";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GrainOverlay />
            <CornerNavigation />
            <CartDrawer />
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
