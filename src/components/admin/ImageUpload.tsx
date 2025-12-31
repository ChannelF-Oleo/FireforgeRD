"use client";

import { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: "blog" | "clients";
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder,
  label = "Imagen",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no puede superar 5MB");
      return;
    }

    setUploading(true);

    try {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${timestamp}_${safeName}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      onChange(downloadUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen. Intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
        {label}
      </label>

      {value ? (
        // Preview de imagen
        <div className="relative rounded-xl overflow-hidden bg-[#F9F8F6] border border-[#1A1818]/10">
          <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            aria-label="Eliminar imagen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // Dropzone
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all
            ${
              dragOver
                ? "border-[#FF4D00] bg-[#FF4D00]/5"
                : "border-[#1A1818]/20 bg-[#F9F8F6] hover:border-[#FF4D00]/50"
            }
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#FF4D00] animate-spin" />
              <span className="text-sm text-[#6F6B65]">Subiendo...</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-[#1A1818]/5 flex items-center justify-center">
                {dragOver ? (
                  <ImageIcon className="w-6 h-6 text-[#FF4D00]" />
                ) : (
                  <Upload className="w-6 h-6 text-[#6F6B65]" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-[#1A1818]">
                  Arrastra una imagen o haz clic
                </p>
                <p className="text-xs text-[#6F6B65] mt-1">
                  PNG, JPG, WebP hasta 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
