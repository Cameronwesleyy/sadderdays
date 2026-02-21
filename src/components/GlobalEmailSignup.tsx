import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmailSignupPopup from "@/components/EmailSignupPopup";

const GlobalEmailSignup = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setShow(true);
    window.addEventListener("open-email-signup", handler);
    return () => window.removeEventListener("open-email-signup", handler);
  }, []);

  // On Home page, the local popup handles it
  if (location.pathname === "/home") return null;

  return <EmailSignupPopup isOpen={show} onClose={() => setShow(false)} />;
};

export default GlobalEmailSignup;
