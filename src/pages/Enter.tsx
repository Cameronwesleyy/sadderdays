import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import crossLogo from "@/assets/cross-logo.png";

const Enter = () => {
  const navigate = useNavigate();
  const [pushText, setPushText] = useState("push");

  useEffect(() => {
    supabase.from("site_content").select("content").eq("id", "enter_push_text").single().then(({ data }) => {
      if (data?.content) setPushText(data.content);
    });
  }, []);

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={handleEnter}
    >
      {/* Cross Logo */}
      <motion.img
        src={crossLogo}
        alt="Sadder Days"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-24 h-24 md:w-32 md:h-32 object-contain mb-8"
      />

      {/* Push text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-xs tracking-[0.5em] text-white/80 uppercase"
      >
        {pushText}
      </motion.p>
    </div>
  );
};

export default Enter;