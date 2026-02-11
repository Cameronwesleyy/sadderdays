import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, ExternalLink, Lock, Music, Users, MapPin, FileText, ShoppingBag, Link2, Upload, Home, Image, FlaskConical, Power } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// ─── Password Gate ───────────────────────────────────────────────
const PasswordGate = ({ onAuth }: { onAuth: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("id", "admin_password")
      .single();
    if (data?.value === password) {
      sessionStorage.setItem("sd_admin", "true");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0B] flex items-center justify-center p-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
      >
        <Lock className="w-6 h-6 text-white/40 mx-auto mb-6" />
        <h1 className="font-display text-2xl text-white text-center mb-8 tracking-tighter-custom">
          SADDER DAYS ADMIN
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/20"} text-white px-4 py-3 text-sm tracking-widest-custom focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30`}
        />
        <button
          type="submit"
          className="w-full mt-4 py-3 bg-white text-[#0B0C0B] text-xs font-medium tracking-widest-custom hover:bg-white/90 transition-colors"
        >
          ENTER
        </button>
        {error && (
          <p className="text-red-400 text-xs text-center mt-3 tracking-widest-custom">
            WRONG PASSWORD
          </p>
        )}
      </motion.form>
    </div>
  );
};

// ─── Types ────────────────────────────────────────────────────────
interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticket_link: string;
  status: string;
  sort_order: number;
}

interface MusicRelease {
  id: string;
  title: string;
  type: string;
  year: string;
  cover_url: string;
  spotify_url: string;
  apple_url: string;
  sort_order: number;
}

type Tab = "home" | "copy" | "members" | "tour" | "music" | "lab" | "shopify";

interface QuizQuestion {
  question: string;
  options: { text: string; side: "yin" | "yang" }[];
}

// ─── Image Drop Zone ─────────────────────────────────────────────
const ImageDropZone = ({
  label,
  currentUrl,
  contentKey,
  onUpload,
}: {
  label: string;
  currentUrl: string;
  contentKey: string;
  onUpload: (key: string, url: string) => void;
}) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `home/${contentKey}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);
    onUpload(contentKey, urlData.publicUrl);
    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) uploadFile(file);
  }, [contentKey]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  return (
    <div className="mb-6">
      <label className="block text-[9px] tracking-widest-custom text-white/50 mb-2">
        {label.toUpperCase()}
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragging(false)}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed ${dragging ? "border-white/60 bg-white/10" : "border-white/20"} p-4 cursor-pointer hover:border-white/40 transition-colors flex items-center gap-4`}
      >
        {currentUrl ? (
          <img src={currentUrl} alt={label} className="w-20 h-20 object-cover flex-shrink-0" />
        ) : (
          <div className="w-20 h-20 bg-white/5 flex items-center justify-center flex-shrink-0">
            <Image size={20} className="text-white/20" />
          </div>
        )}
        <div className="flex-1">
          {uploading ? (
            <p className="text-xs text-white/60">Uploading...</p>
          ) : (
            <>
              <p className="text-xs text-white/60">
                <Upload size={12} className="inline mr-1" />
                Drag & drop or click to upload
              </p>
              <p className="text-[10px] text-white/30 mt-1">JPG, PNG, WEBP</p>
            </>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
      />
    </div>
  );
};

// ─── Main Dashboard ──────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [content, setContent] = useState<Record<string, string>>({});
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [shopifyToken, setShopifyToken] = useState("");
  const [shopLive, setShopLive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [contentRes, tourRes, releaseRes, settingsRes] = await Promise.all([
      supabase.from("site_content").select("*"),
      supabase.from("tour_dates").select("*").order("sort_order"),
      supabase.from("music_releases").select("*").order("sort_order"),
      supabase.from("admin_settings").select("*"),
    ]);

    if (contentRes.data) {
      const map: Record<string, string> = {};
      contentRes.data.forEach((r: { id: string; content: string }) => { map[r.id] = r.content; });
      setContent(map);
    }
    if (tourRes.data) setTourDates(tourRes.data as TourDate[]);
    if (releaseRes.data) setReleases(releaseRes.data as MusicRelease[]);
    if (settingsRes.data) {
      settingsRes.data.forEach((s: { id: string; value: string }) => {
        if (s.id === "shopify_store_url") setShopifyUrl(s.value);
        if (s.id === "shopify_access_token") setShopifyToken(s.value);
        if (s.id === "shop_live") setShopLive(s.value === "true");
      });
    }
    if (contentRes.data) {
      const qEntry = contentRes.data.find((r: { id: string }) => r.id === "lab_quiz_questions");
      if (qEntry) {
        try { setQuizQuestions(JSON.parse(qEntry.content)); } catch { /* ignore */ }
      }
    }
  };

  const updateContent = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const [id, contentVal] of Object.entries(content)) {
        await supabase.from("site_content").upsert({ id, content: contentVal, updated_at: new Date().toISOString() });
      }
      for (const td of tourDates) {
        if (td.id.startsWith("new-")) {
          const { id: _, ...rest } = td;
          await supabase.from("tour_dates").insert(rest);
        } else {
          await supabase.from("tour_dates").upsert(td);
        }
      }
      for (const r of releases) {
        if (r.id.startsWith("new-")) {
          const { id: _, ...rest } = r;
          await supabase.from("music_releases").insert(rest);
        } else {
          await supabase.from("music_releases").upsert(r);
        }
      }
      await supabase.from("admin_settings").upsert({ id: "shopify_store_url", value: shopifyUrl, updated_at: new Date().toISOString() });
      await supabase.from("admin_settings").upsert({ id: "shopify_access_token", value: shopifyToken, updated_at: new Date().toISOString() });
      await supabase.from("admin_settings").upsert({ id: "shop_live", value: shopLive ? "true" : "false", updated_at: new Date().toISOString() });
      if (quizQuestions.length > 0) {
        await supabase.from("site_content").upsert({ id: "lab_quiz_questions", content: JSON.stringify(quizQuestions), updated_at: new Date().toISOString() });
      }

      toast({ title: "Changes saved", description: "Your updates are now live on the site." });
      await loadData();
    } catch {
      toast({ title: "Error", description: "Failed to save. Please try again.", variant: "destructive" });
    }
    setSaving(false);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "HOME PAGE", icon: <Home size={14} /> },
    { id: "copy", label: "ABOUT / COPY", icon: <FileText size={14} /> },
    { id: "members", label: "MEMBERS", icon: <Users size={14} /> },
    { id: "tour", label: "TOUR DATES", icon: <MapPin size={14} /> },
    { id: "music", label: "MUSIC", icon: <Music size={14} /> },
    { id: "lab", label: "LAB", icon: <FlaskConical size={14} /> },
    { id: "shopify", label: "SHOPIFY", icon: <ShoppingBag size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0B] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl tracking-tighter-custom">SADDER DAYS — MANAGE</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveAll}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B0C0B] text-xs font-medium tracking-widest-custom hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? "SAVING..." : "SAVE CHANGES"}
        </motion.button>
      </div>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <nav className="w-56 border-r border-white/10 p-4 space-y-1 flex-shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-[10px] tracking-widest-custom transition-colors text-left ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 p-8 max-w-4xl overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <TabPanel key="home">
                <SectionTitle>Home Page Copy</SectionTitle>
                <Field label="Hero Caption" value={content.home_hero_caption || ""} onChange={(v) => updateContent("home_hero_caption", v)} placeholder="CAMERON AND GRANT, NYC 2026" />
                <Field label="Section Title" value={content.home_section_title || ""} onChange={(v) => updateContent("home_section_title", v)} placeholder="I'VE HAD SADDER DAYS" />
                <Field label="Section Copy" value={content.home_section_copy || ""} onChange={(v) => updateContent("home_section_copy", v)} />
                <Field label="Shop Launch Date" value={content.home_shop_date || ""} onChange={(v) => updateContent("home_shop_date", v)} placeholder="FEB 2026" />
                <Field label="Shop Description" value={content.home_shop_copy || ""} onChange={(v) => updateContent("home_shop_copy", v)} />
                <Field label="Gallery Subtitle" value={content.home_gallery_subtitle || ""} onChange={(v) => updateContent("home_gallery_subtitle", v)} placeholder="NYC, 2024-2025" />

                <SectionTitle className="mt-12">Home Page Images</SectionTitle>
                <p className="text-white/40 text-xs mb-6">Drag & drop images to replace them. Leave empty to use defaults.</p>

                <ImageDropZone label="Hero Image" currentUrl={content.home_hero_image || ""} contentKey="home_hero_image" onUpload={updateContent} />

                <div className="grid grid-cols-2 gap-4">
                  <ImageDropZone label="Portrait Left" currentUrl={content.home_portrait_left || ""} contentKey="home_portrait_left" onUpload={updateContent} />
                  <ImageDropZone label="Portrait Right" currentUrl={content.home_portrait_right || ""} contentKey="home_portrait_right" onUpload={updateContent} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <ImageDropZone label="Shop Image 1" currentUrl={content.home_shop_image_1 || ""} contentKey="home_shop_image_1" onUpload={updateContent} />
                  <ImageDropZone label="Shop Image 2" currentUrl={content.home_shop_image_2 || ""} contentKey="home_shop_image_2" onUpload={updateContent} />
                  <ImageDropZone label="Shop Image 3" currentUrl={content.home_shop_image_3 || ""} contentKey="home_shop_image_3" onUpload={updateContent} />
                </div>

                <ImageDropZone label="Napkin / About Image" currentUrl={content.home_napkin_image || ""} contentKey="home_napkin_image" onUpload={updateContent} />
                <ImageDropZone label="Tour Section Image" currentUrl={content.home_tour_image || ""} contentKey="home_tour_image" onUpload={updateContent} />
              </TabPanel>
            )}

            {activeTab === "copy" && (
              <TabPanel key="copy">
                <SectionTitle>About Page Copy</SectionTitle>
                <Field label="Location" value={content.about_location || ""} onChange={(v) => updateContent("about_location", v)} />
                <TextArea label="Bio Paragraph 1" value={content.about_bio || ""} onChange={(v) => updateContent("about_bio", v)} />
                <TextArea label="Bio Paragraph 2" value={content.about_bio_2 || ""} onChange={(v) => updateContent("about_bio_2", v)} />
                <TextArea label="Bio Paragraph 3" value={content.about_bio_3 || ""} onChange={(v) => updateContent("about_bio_3", v)} />
                <Field label="Quote" value={content.about_quote || ""} onChange={(v) => updateContent("about_quote", v)} />
                <Field label="Quote Attribution" value={content.about_quote_attribution || ""} onChange={(v) => updateContent("about_quote_attribution", v)} />
                <TextArea label="RnM Description" value={content.about_rnm || ""} onChange={(v) => updateContent("about_rnm", v)} />

                <SectionTitle className="mt-12">General</SectionTitle>
                <Field label="Headline" value={content.headline || ""} onChange={(v) => updateContent("headline", v)} />
                <TextArea label="Contact Info" value={content.contact_info || ""} onChange={(v) => updateContent("contact_info", v)} />
              </TabPanel>
            )}

            {activeTab === "members" && (
              <TabPanel key="members">
                <SectionTitle>Cameron</SectionTitle>
                <TextArea label="Cameron Bio" value={content.cameron_bio || ""} onChange={(v) => updateContent("cameron_bio", v)} rows={8} />
                <SectionTitle className="mt-12">Grant</SectionTitle>
                <TextArea label="Grant Bio" value={content.grant_bio || ""} onChange={(v) => updateContent("grant_bio", v)} rows={8} />
              </TabPanel>
            )}

            {activeTab === "tour" && (
              <TabPanel key="tour">
                <div className="flex items-center justify-between mb-6">
                  <SectionTitle className="mb-0">Tour Dates</SectionTitle>
                  <button
                    onClick={() => setTourDates([...tourDates, {
                      id: `new-${Date.now()}`,
                      date: "",
                      city: "",
                      venue: "",
                      ticket_link: "",
                      status: "available",
                      sort_order: tourDates.length,
                    }])}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} /> ADD SHOW
                  </button>
                </div>
                <div className="space-y-4">
                  {tourDates.map((td, i) => (
                    <div key={td.id} className="p-4 border border-white/10 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Date" value={td.date} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], date: v };
                          setTourDates(updated);
                        }} />
                        <Field label="City" value={td.city} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], city: v };
                          setTourDates(updated);
                        }} />
                        <Field label="Venue" value={td.venue} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], venue: v };
                          setTourDates(updated);
                        }} />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Ticket Link" value={td.ticket_link} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], ticket_link: v };
                          setTourDates(updated);
                        }} />
                        <div>
                          <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">STATUS</label>
                          <select
                            value={td.status}
                            onChange={(e) => {
                              const updated = [...tourDates];
                              updated[i] = { ...updated[i], status: e.target.value };
                              setTourDates(updated);
                            }}
                            className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50"
                          >
                            <option value="available">Available</option>
                            <option value="low">Low Tickets</option>
                            <option value="sold-out">Sold Out</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={async () => {
                              if (!td.id.startsWith("new-")) {
                                await supabase.from("tour_dates").delete().eq("id", td.id);
                              }
                              setTourDates(tourDates.filter((_, j) => j !== i));
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                          >
                            <Trash2 size={12} /> REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}

            {activeTab === "music" && (
              <TabPanel key="music">
                <div className="flex items-center justify-between mb-6">
                  <SectionTitle className="mb-0">Music Releases</SectionTitle>
                  <button
                    onClick={() => setReleases([...releases, {
                      id: `new-${Date.now()}`,
                      title: "",
                      type: "Single",
                      year: new Date().getFullYear().toString(),
                      cover_url: "",
                      spotify_url: "",
                      apple_url: "",
                      sort_order: releases.length,
                    }])}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} /> ADD RELEASE
                  </button>
                </div>
                <div className="space-y-4">
                  {releases.map((r, i) => (
                    <div key={r.id} className="p-4 border border-white/10 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Title" value={r.title} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], title: v };
                          setReleases(updated);
                        }} />
                        <div>
                          <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">TYPE</label>
                          <select
                            value={r.type}
                            onChange={(e) => {
                              const updated = [...releases];
                              updated[i] = { ...updated[i], type: e.target.value };
                              setReleases(updated);
                            }}
                            className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50"
                          >
                            <option value="Single">Single</option>
                            <option value="EP">EP</option>
                            <option value="Album">Album</option>
                          </select>
                        </div>
                        <Field label="Year" value={r.year} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], year: v };
                          setReleases(updated);
                        }} />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <Field label="Cover Image URL" value={r.cover_url} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], cover_url: v };
                          setReleases(updated);
                        }} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Spotify URL" value={r.spotify_url} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], spotify_url: v };
                          setReleases(updated);
                        }} />
                        <Field label="Apple Music URL" value={r.apple_url} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], apple_url: v };
                          setReleases(updated);
                        }} />
                      </div>
                      {r.cover_url && (
                        <img src={r.cover_url} alt={r.title} className="w-16 h-16 object-cover" />
                      )}
                      <button
                        onClick={async () => {
                          if (!r.id.startsWith("new-")) {
                            await supabase.from("music_releases").delete().eq("id", r.id);
                          }
                          setReleases(releases.filter((_, j) => j !== i));
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 size={12} /> REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}

            {activeTab === "lab" && (
              <TabPanel key="lab">
                <SectionTitle>Yin or Yang Quiz</SectionTitle>
                <p className="text-white/40 text-xs mb-6">Edit the quiz questions shown on the Lab page. Each question has two options — one for Yin, one for Yang.</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-widest-custom text-white/60">{quizQuestions.length} QUESTIONS</span>
                  <button
                    onClick={() => setQuizQuestions([...quizQuestions, { question: "", options: [{ text: "", side: "yin" }, { text: "", side: "yang" }] }])}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} /> ADD QUESTION
                  </button>
                </div>
                <div className="space-y-4">
                  {quizQuestions.map((q, i) => (
                    <div key={i} className="p-4 border border-white/10 space-y-3">
                      <Field label={`Question ${i + 1}`} value={q.question} onChange={(v) => {
                        const updated = [...quizQuestions];
                        updated[i] = { ...updated[i], question: v };
                        setQuizQuestions(updated);
                      }} placeholder="When you close your eyes, do you see..." />
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Yin Option" value={q.options[0]?.text || ""} onChange={(v) => {
                          const updated = [...quizQuestions];
                          updated[i] = { ...updated[i], options: [{ text: v, side: "yin" }, updated[i].options[1]] };
                          setQuizQuestions(updated);
                        }} placeholder="Light fading into softness" />
                        <Field label="Yang Option" value={q.options[1]?.text || ""} onChange={(v) => {
                          const updated = [...quizQuestions];
                          updated[i] = { ...updated[i], options: [updated[i].options[0], { text: v, side: "yang" }] };
                          setQuizQuestions(updated);
                        }} placeholder="Deep shadows with hidden depths" />
                      </div>
                      <button
                        onClick={() => setQuizQuestions(quizQuestions.filter((_, j) => j !== i))}
                        className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 size={12} /> REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}

            {activeTab === "shopify" && (
              <TabPanel key="shopify">
                <SectionTitle>Shop Status</SectionTitle>
                <div className="p-4 border border-white/10 mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/80 mb-1">Shop is {shopLive ? "LIVE" : "COMING SOON"}</p>
                    <p className="text-[10px] text-white/40">When live, the "Coming Soon" label and strike-through are removed from the nav.</p>
                  </div>
                  <button
                    onClick={() => setShopLive(!shopLive)}
                    className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest-custom border transition-colors ${shopLive ? "border-green-400/40 text-green-400 bg-green-400/10" : "border-white/20 text-white/60 hover:bg-white/10"}`}
                  >
                    <Power size={12} />
                    {shopLive ? "LIVE" : "OFF"}
                  </button>
                </div>

                <SectionTitle>Connect Your Shopify Store</SectionTitle>
                <p className="text-white/50 text-xs leading-relaxed mb-8">
                  Connect your existing Shopify store to power the shop page. Products, inventory, and checkout will all be handled through Shopify.
                </p>

                <div className="p-6 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Link2 size={16} className="text-white/40" />
                    <span className="text-[10px] tracking-widest-custom text-white/60">STORE CONNECTION</span>
                  </div>

                  <Field label="Shopify Store URL" value={shopifyUrl} onChange={setShopifyUrl} placeholder="yourstore.myshopify.com" />
                  <Field label="Storefront Access Token" value={shopifyToken} onChange={setShopifyToken} placeholder="shpat_xxxxxxxxxxxxx" />

                  <div className="p-4 bg-white/5 border border-white/10">
                    <p className="text-[10px] tracking-widest-custom text-white/50 mb-3">HOW TO GET YOUR TOKEN</p>
                    <ol className="text-xs text-white/60 space-y-2 list-decimal list-inside">
                      <li>Go to your Shopify Admin → Settings → Apps and sales channels</li>
                      <li>Click "Develop apps" → Create an app</li>
                      <li>Under "Configuration", enable Storefront API access</li>
                      <li>Install the app and copy the Storefront access token</li>
                    </ol>
                  </div>

                  {shopifyUrl && shopifyToken && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-green-400 text-xs"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Store connected — save changes to apply
                    </motion.div>
                  )}

                  <a
                    href={shopifyUrl ? `https://${shopifyUrl.replace(/^https?:\/\//, "")}/admin` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors ${!shopifyUrl ? "opacity-30 pointer-events-none" : ""}`}
                  >
                    OPEN SHOPIFY ADMIN <ExternalLink size={12} />
                  </a>
                </div>
              </TabPanel>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Reusable Components ─────────────────────────────────────────
const TabPanel = ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-display text-lg tracking-tighter-custom mb-6 ${className}`}>{children}</h2>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="mb-4">
    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">
      {label.toUpperCase()}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20"
    />
  </div>
);

const TextArea = ({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <div className="mb-4">
    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">
      {label.toUpperCase()}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm leading-relaxed focus:outline-none focus:border-white/50 transition-colors resize-y"
    />
  </div>
);

// ─── Page Wrapper ────────────────────────────────────────────────
const Manage = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("sd_admin") === "true");

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  return <AdminDashboard />;
};

export default Manage;
