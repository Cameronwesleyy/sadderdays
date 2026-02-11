import { useState, useRef, useCallback } from "react";
import { Plus, Trash2, Image, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface GalleryEditorProps {
  label: string;
  images: string[];
  folder: string;
  onChange: (images: string[]) => void;
}

const GalleryEditor = ({ label, images, folder, onChange }: GalleryEditorProps) => {
  const [uploading, setUploading] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/gallery-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);
    onChange([...images, urlData.publicUrl]);
    setUploading(false);
  };

  const uploadMultiple = async (files: FileList) => {
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const ext = file.name.split(".").pop();
      const path = `${folder}/gallery-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
      const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
      if (error) continue;
      const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);
      newUrls.push(urlData.publicUrl);
    }
    onChange([...images, ...newUrls]);
    setUploading(false);
    if (newUrls.length > 0) toast({ title: `${newUrls.length} image(s) added` });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadMultiple(e.dataTransfer.files);
    }
  }, [images, folder]);

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleItemDragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragIndex === null) return;
    setDragOverIndex(index);
  };

  const handleItemDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragIndex === null || dragIndex === toIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const reordered = [...images];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(toIndex, 0, moved);
    onChange(reordered);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleItemDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[9px] tracking-widest-custom text-white/50">
          {label.toUpperCase()} ({images.length})
        </label>
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
        >
          <Plus size={12} /> ADD IMAGES
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
        onDragLeave={() => setDraggingOver(false)}
        className={`border-2 border-dashed ${draggingOver ? "border-white/60 bg-white/10" : "border-white/20"} p-4 transition-colors min-h-[100px]`}
      >
        {images.length === 0 && !uploading ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center py-8 cursor-pointer"
          >
            <Image size={24} className="text-white/20 mb-2" />
            <p className="text-xs text-white/40">Drag & drop images here or click to browse</p>
            <p className="text-[10px] text-white/20 mt-1">JPG, PNG, WEBP — multiple files supported</p>
          </div>
        ) : (
          <>
            <p className="text-[9px] text-white/30 mb-2 tracking-widest-custom">DRAG TO REORDER</p>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {images.map((url, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, i)}
                  onDragOver={(e) => handleItemDragOver(e, i)}
                  onDrop={(e) => handleItemDrop(e, i)}
                  onDragEnd={handleItemDragEnd}
                  className={`relative group aspect-square cursor-grab active:cursor-grabbing transition-all ${
                    dragIndex === i ? "opacity-30 scale-95" : ""
                  } ${dragOverIndex === i && dragIndex !== i ? "ring-2 ring-white/60" : ""}`}
                >
                  <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute top-1 left-1 p-0.5 bg-black/60 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical size={10} />
                  </div>
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={10} />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[8px] text-white/60 bg-black/60 px-1">
                    {i + 1}
                  </span>
                </div>
              ))}
              {uploading && (
                <div className="aspect-square bg-white/5 flex items-center justify-center">
                  <p className="text-[10px] text-white/40">Uploading...</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            uploadMultiple(e.target.files);
          }
        }}
      />
    </div>
  );
};

export default GalleryEditor;
