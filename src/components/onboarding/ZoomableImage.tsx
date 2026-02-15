import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <button
        onClick={() => setZoomed(true)}
        className={cn(
          "relative group w-full rounded-lg overflow-hidden border border-border bg-muted/30 cursor-zoom-in transition-shadow hover:shadow-md",
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto object-contain"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <ZoomIn className="w-4 h-4 text-foreground" />
          </div>
        </div>
      </button>

      {/* Zoom modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-card border border-border shadow-lg hover:bg-accent transition-colors z-10"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl step-enter"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
