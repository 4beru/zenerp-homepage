"use client";

import UnicornScene from "unicornstudio-react/next";

interface UnicornLogoSceneProps {
  className?: string;
  projectId?: string;
  width?: string;
  height?: string;
  scale?: number;
  dpi?: number;
  fps?: number;
  lazyLoad?: boolean;
  production?: boolean;
  altText?: string;
}

/**
 * UnicornLogoScene — Official Unicorn Studio Next.js Integration
 *
 * Implements the official Next.js integration per Unicorn Studio documentation:
 * import UnicornScene from "unicornstudio-react/next";
 * Project ID: QDQaQFzBZdNVzpTTpmQU
 * SDK Version: 2.3.0
 */
export function UnicornLogoScene({
  className = "",
  projectId = "QDQaQFzBZdNVzpTTpmQU",
  width = "100%",
  height = "100%",
  scale = 1,
  dpi = 1.5,
  fps = 60,
  lazyLoad = false,
  production = true,
  altText = "Zen ERP Particle Logo",
}: UnicornLogoSceneProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <UnicornScene
        projectId={projectId}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.3.0/dist/unicornStudio.umd.js"
        width={width}
        height={height}
        scale={scale}
        dpi={dpi}
        fps={fps}
        lazyLoad={lazyLoad}
        production={production}
        altText={altText}
        className="h-full w-full"
      />
    </div>
  );
}

export default UnicornLogoScene;
