import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import crossLogo from "@/assets/cross-logo.png";

interface EmailSignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailSignupPopup = ({ isOpen, onClose }: EmailSignupPopupProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("email_subscribers")
        .insert({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim().toLowerCase(),
        });

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation - email already exists
          toast({
            title: "You're already subscribed!",
            description: "This email is already on our list.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome to the family!",
          description: "You've successfully signed up for our email list.",
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        onClose();
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-lg bg-[#FFEBF5]/90 backdrop-blur-sm"
          >

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 px-8 py-12 flex flex-col items-center text-center">
              {/* Cross Logo */}
              <img
                src={crossLogo}
                alt="Sadder Days"
                className="w-16 h-16 md:w-20 md:h-20 object-contain mb-6"
              />

              {/* Heading */}
              <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">
                Never miss a moment.
              </h2>
              <p className="text-foreground/70 text-sm mb-8">
                Sign up to our email list now!
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-5 py-4 bg-white/80 text-foreground placeholder:text-foreground/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  maxLength={100}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-5 py-4 bg-white/80 text-foreground placeholder:text-foreground/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  maxLength={100}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/80 text-foreground placeholder:text-foreground/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  maxLength={255}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-foreground text-background font-medium tracking-wider rounded-lg hover:bg-foreground/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </form>

              <p className="text-foreground/50 text-xs mt-6 max-w-sm">
                You are signing up to receive communication via email and can unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailSignupPopup;
