import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import Navigation from "@/components/Navigation";
import GrainOverlay from "@/components/GrainOverlay";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Enter from "./pages/Enter";
import Home from "./pages/Home";
import Merch from "./pages/Merch";
import Music from "./pages/Music";
import Members from "./pages/Members";
import Tour from "./pages/Tour";
import About from "./pages/About";
import Lab from "./pages/Lab";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GrainOverlay />
          <Navigation />
          <CartDrawer />
          <AnimatePresence mode="wait">
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Enter />} />
                <Route path="/home" element={<Home />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/music" element={<Music />} />
                <Route path="/members" element={<Members />} />
                <Route path="/tour" element={<Tour />} />
                <Route path="/about" element={<About />} />
                <Route path="/lab" element={<Lab />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </AnimatePresence>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
