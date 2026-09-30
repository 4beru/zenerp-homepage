"use client";

import { useEffect, useRef, memo } from "react";
import * as THREE from "three";
import { heroVideoVertexShader, heroVideoFragmentShader } from "./shaders/hero-video.glsl";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Single source of truth for the Hero Video asset path.
 * When the MP4 is supplied, it is expected at public/video/zen-erp-hero.mp4.
 */
export const HERO_VIDEO_SRC = "/video/zen-erp-hero.mp4";

export interface HeroVideoSceneProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  scrollProgress?: number;
  className?: string;
}

export const HeroVideoScene = memo(function HeroVideoScene({
  containerRef,
  scrollProgress = 0,
  className = "",
}: HeroVideoSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Keep references to values that can update without re-initializing WebGL
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let isDisposed = false;
    let animationFrameId = 0;
    let isVisible = true;

    // 1. Scene & Orthographic Camera (2D Screen-aligned Quad)
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      });
    } catch {
      // Graceful fallback if WebGL is unsupported
      return;
    }

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvas = renderer.domElement;
    canvas.className = "absolute inset-0 h-full w-full pointer-events-none select-none";
    canvas.setAttribute("aria-hidden", "true");
    mount.appendChild(canvas);

    // 3. Video Element & VideoTexture
    const video = document.createElement("video");
    video.src = HERO_VIDEO_SRC;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.generateMipmaps = false;

    // 4. Uniforms
    const uniforms = {
      uTexture: { value: videoTexture },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uVideoResolution: { value: new THREE.Vector2(1920, 1080) }, // Sensible default aspect 16:9
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVelocity: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
      uDistortion: { value: 0.016 },
      uScrollProgress: { value: 0 },
      uOpacity: { value: 1.0 },
      uHasVideo: { value: 0.0 },
    };

    // Video metadata listener
    const onLoadedMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        uniforms.uVideoResolution.value.set(video.videoWidth, video.videoHeight);
        uniforms.uHasVideo.value = 1.0;
      }
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    const onCanPlay = () => {
      uniforms.uHasVideo.value = 1.0;
      video.play().catch(() => {
        // Autoplay policy or video not yet available; stays in safe fallback
      });
    };
    video.addEventListener("canplay", onCanPlay);

    // Trigger video load
    video.load();

    // 5. Geometry & ShaderMaterial
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: heroVideoVertexShader,
      fragmentShader: heroVideoFragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 6. Smooth Pointer Tracking
    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    const mouseCurrent = new THREE.Vector2(0.5, 0.5);
    const mousePrev = new THREE.Vector2(0.5, 0.5);
    const mouseVelocity = new THREE.Vector2(0, 0);
    let targetStrength = 0;
    let currentStrength = 0;

    const interactiveTarget = containerRef?.current || mount;

    const handlePointerMove = (e: PointerEvent) => {
      if (reducedMotionRef.current) return;
      const rect = interactiveTarget.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const normY = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));

      mouseTarget.set(normX, normY);
    };

    const handlePointerLeave = () => {
      targetStrength = 0;
    };

    interactiveTarget.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    interactiveTarget.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!renderer || isDisposed) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w <= 0 || h <= 0) return;

      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // 8. Visibility Optimization via IntersectionObserver
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
        if (isVisible) {
          if (video.paused && uniforms.uHasVideo.value > 0.5) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(mount);

    // 9. Render Loop
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (isDisposed) return;

      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const isReduced = reducedMotionRef.current;

      // Update time uniform
      if (!isReduced) {
        uniforms.uTime.value += delta;
      }

      // Pointer physics interpolation
      if (!isReduced) {
        // Interpolate position
        mouseCurrent.lerp(mouseTarget, 0.08);

        // Calculate raw velocity
        const deltaX = (mouseCurrent.x - mousePrev.x) / Math.max(delta, 0.016);
        const deltaY = (mouseCurrent.y - mousePrev.y) / Math.max(delta, 0.016);
        mousePrev.copy(mouseCurrent);

        // Smooth velocity vector
        mouseVelocity.x += (deltaX - mouseVelocity.x) * 0.12;
        mouseVelocity.y += (deltaY - mouseVelocity.y) * 0.12;

        // Calculate dynamic strength from velocity magnitude
        const speed = Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y);
        targetStrength = Math.min(speed * 0.45, 1.2);
        currentStrength += (targetStrength - currentStrength) * 0.09;

        // Natural decay when cursor is stationary
        targetStrength *= 0.94;

        uniforms.uMouse.value.copy(mouseCurrent);
        uniforms.uMouseVelocity.value.set(mouseVelocity.x * 0.04, mouseVelocity.y * 0.04);
        uniforms.uMouseStrength.value = currentStrength;
        uniforms.uDistortion.value = 0.016;
      } else {
        uniforms.uMouseStrength.value = 0;
        uniforms.uDistortion.value = 0;
      }

      // Scroll progress
      uniforms.uScrollProgress.value = scrollProgressRef.current;

      // Render scene
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 10. Complete Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);

      interactiveTarget.removeEventListener("pointermove", handlePointerMove as EventListener);
      interactiveTarget.removeEventListener("pointerleave", handlePointerLeave);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.pause();
      video.removeAttribute("src");
      video.load();

      geometry.dispose();
      material.dispose();
      videoTexture.dispose();

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
    };
  }, [containerRef]);

  return (
    <div
      ref={mountRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
});

export default HeroVideoScene;
