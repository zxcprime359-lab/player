import { useEffect } from "react";
import { VideoPlayerControls } from "./useVideoPlayer";

// useKeyboardControls.ts
export function useKeyboardControls({
  controls,
  setDoubleTapSide,
}: {
  controls: VideoPlayerControls;
  setDoubleTapSide: (side: "left" | "right" | null) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          controls.togglePlay();
          break;
        case "ArrowRight":
          controls.skipBy(10);
          setDoubleTapSide("right");
          setTimeout(() => setDoubleTapSide(null), 600);
          break;
        case "ArrowLeft":
          controls.skipBy(-10);
          setDoubleTapSide("left");
          setTimeout(() => setDoubleTapSide(null), 600);
          break;
        case "f":
          controls.toggleFullscreen();
          break;
        case "m":
          controls.toggleMute();
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
