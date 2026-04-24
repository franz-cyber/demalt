import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";

const TOTAL_PAGES = 42;
const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `/catalog/page-${num}.jpg`;
});

const CatalogFlipbook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const goToPage = useCallback(
    (dir: "left" | "right") => {
      if (dir === "right" && currentPage >= TOTAL_PAGES - 1) return;
      if (dir === "left" && currentPage <= 0) return;
      setCurrentPage((p) => (dir === "right" ? p + 1 : p - 1));
    },
    [currentPage]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToPage("right");
      if (e.key === "ArrowLeft") goToPage("left");
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    },
    [goToPage, isFullscreen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToPage(diff > 0 ? "right" : "left");
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const progress = ((currentPage + 1) / TOTAL_PAGES) * 100;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center ${
        isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : ""
      }`}
    >
      {/* Page display with external arrows */}
      <div className="flex items-center gap-2 sm:gap-4 w-full mx-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {/* Left arrow */}
        <button
          onClick={() => goToPage("left")}
          disabled={currentPage === 0}
          className="flex-shrink-0 p-2 sm:p-3 rounded-full bg-secondary hover:bg-secondary/80 active:scale-95 transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Faqja e mëparshme"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>

        {/* Page container */}
        <div
          className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-secondary/50 shadow-2xl select-none"
          style={{ maxHeight: 'calc(100vh - 250px)', aspectRatio: '3/4' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={pages[currentPage]}
            alt={`Katalog faqja ${currentPage + 1}`}
            className="w-full h-full object-contain"
            style={{ transform: `scale(${zoom})` }}
            draggable={false}
          />
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goToPage("right")}
          disabled={currentPage === TOTAL_PAGES - 1}
          className="flex-shrink-0 p-2 sm:p-3 rounded-full bg-secondary hover:bg-secondary/80 active:scale-95 transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Faqja tjetër"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </button>
      </div>

      {/* Controls bar */}
      <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          disabled={zoom <= 1}
        >
          <ZoomOut className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          disabled={zoom >= 2}
        >
          <ZoomIn className="w-4 h-4 text-muted-foreground" />
        </button>

        <span
          className="text-xs text-muted-foreground font-medium tracking-wider"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {currentPage + 1} / {TOTAL_PAGES}
        </span>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-3 sm:mt-4 w-full h-0.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/60 rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 sm:mt-6 w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-1.5 sm:gap-2 pb-2 px-1">
          {pages.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`flex-shrink-0 w-10 h-14 sm:w-12 sm:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                i === currentPage
                  ? "border-primary shadow-lg scale-110"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={src}
                alt={`Faqja ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogFlipbook;
