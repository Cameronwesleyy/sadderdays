import { useState, useRef, useCallback } from "react";
import { Upload, Image, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ImageDropZoneProps {
  label: string;
  currentUrl: string;
  contentKey: string;
  folder?: string;
  onUpload: (key: string, url: string) => void;
}

const ImageDropZone = ({ label, currentUrl, contentKey, folder = "home", onUpload }: ImageDropZoneProps) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${contentKey}-${Date.now()}.${ext}`;
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
        className={`relative border-2 border-dashed ${dragging ? "border-white/60 bg-white/10" : "border-white/20"} p-4 cursor-pointer hover:border-white/40 transition-colors flex items-center gap-4`}
      >
        {currentUrl ? (
          <>
            <img src={currentUrl} alt={label} className="w-20 h-20 object-cover flex-shrink-0" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onUpload(contentKey, ""); }}
              className="absolute top-2 right-2 p-1 bg-red-500/80 text-white hover:bg-red-500 transition-colors"
              title="Remove image"
            >
              <X size={12} />
            </button>
          </>
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

export default ImageDropZone;
