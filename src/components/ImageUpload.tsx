import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Shield, CheckCircle } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
  isDeleted?: boolean;
}

const ImageUpload = ({ onImageSelect, selectedImage, isDeleted = false }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  }, [onImageSelect]);

  const clearImage = useCallback(() => {
    setPreview(null);
    onImageSelect(null);
  }, [onImageSelect]);

  return (
    <div className="glass-panel p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <ImageIcon className="w-6 h-6 text-primary" />
        <h3 className="font-semibold">Image Upload</h3>
      </div>

      <AnimatePresence mode="wait">
        {isDeleted ? (
          <motion.div
            key="deleted"
            className="h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-success mb-2" />
            <p className="text-success font-semibold">Image deleted from memory</p>
          </motion.div>
        ) : !preview ? (
          <motion.label
            key="upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer
              ${isDragging ? "border-primary bg-primary/10" : "border-border"}
            `}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
            <p>Drag & drop or click to upload</p>
          </motion.label>
        ) : (
          <motion.div key="preview" className="relative">
            <img
              src={preview}
              className="w-full h-56 object-contain rounded-xl bg-muted"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
