"use client";

import { useEffect, useRef } from "react";

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  life: number;
  highlight: boolean;
};

type Props = {
  logoSrc?: string;
  bgColor?: string;
  idleColor?: string;
  brandColor?: string;
  className?: string;
  logoHeight?: number;
  maxDistance?: number;
};

const BASE_PARTICLE_COUNT = 7000;

export default function ParticleLogoCanvas({
  logoSrc = "/fl_icon.svg",
  bgColor = "#e4f2da",
  idleColor = "#81b757",
  brandColor = "#1182c6",
  className,
  logoHeight = 320,
  maxDistance = 240,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let textImageData: ImageData | null = null;
    let animationFrameId = 0;
    let revokeUrl: string | null = null;
    let destroyed = false;
    let dpr = 1;
    let bootstrapToken = 0;

    const resizeCanvas = () => {
      const rect = wrap.getBoundingClientRect();
      const widthCss = Math.max(1, Math.floor(rect.width));
      const heightCss = Math.max(1, Math.floor(rect.height));
      dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      canvas.width = widthCss * dpr;
      canvas.height = heightCss * dpr;
      canvas.style.width = `${widthCss}px`;
      canvas.style.height = `${heightCss}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loadLogoImage = async () => {
      if (!logoSrc) return null;
      const response = await fetch(logoSrc);
      if (!response.ok) throw new Error(`Failed to load logo from ${logoSrc}`);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      revokeUrl = objectUrl;
      const img = new Image();
      img.decoding = "async";
      img.src = objectUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (event) => reject(event);
      });
      return img;
    };

    const rasterizeLogo = async () => {
      const img = await loadLogoImage();
      if (!img || destroyed) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = idleColor;

      const aspect = img.naturalWidth / img.naturalHeight;
      const targetHeight = logoHeight * dpr;
      const targetWidth = targetHeight * aspect;
      const maxWidth = width * 0.8;
      const drawWidth = Math.min(targetWidth, maxWidth);
      const drawHeight = drawWidth / aspect;
      const x = (width - drawWidth) / 2;
      const y = Math.max(0, (height - drawHeight) / 2 - height * 0.1);

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      try {
        textImageData = ctx.getImageData(0, 0, width, height);
      } catch (error) {
        console.error("[ParticleLogoCanvas] Unable to sample logo", error);
        textImageData = null;
      }

      ctx.clearRect(0, 0, width, height);
      if (revokeUrl) {
        URL.revokeObjectURL(revokeUrl);
        revokeUrl = null;
      }
    };

    const pickLogoPixel = () => {
      if (!textImageData) return null;
      const { data, width, height } = textImageData;
      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        if (data[(y * width + x) * 4 + 3] > 128) {
          return { x, y };
        }
      }
      return null;
    };

    const createParticle = () => {
      const pos = pickLogoPixel();
      if (!pos) return null;
      return {
        x: pos.x,
        y: pos.y,
        baseX: pos.x,
        baseY: pos.y,
        size: Math.random() * 1 + 0.5,
        life: Math.random() * 100 + 60,
        highlight: false,
      } as Particle;
    };

    const seedParticles = () => {
      particles = [];
      if (!textImageData) return;
      const width = canvas.width;
      const height = canvas.height;
      const targetCount = Math.floor(
        BASE_PARTICLE_COUNT * Math.sqrt((width * height) / (1920 * 1080))
      );
      for (let i = 0; i < targetCount; i++) {
        const particle = createParticle();
        if (particle) particles.push(particle);
      }
    };

    const animate = () => {
      if (destroyed) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const { x: pointerX, y: pointerY, active } = pointerRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (active) {
          const dx = pointerX - p.x;
          const dy = pointerY - p.y;
          const distance = Math.hypot(dx, dy);
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            p.x = p.baseX - Math.cos(angle) * force * 60;
            p.y = p.baseY - Math.sin(angle) * force * 60;
            p.highlight = true;
          } else {
            p.x += (p.baseX - p.x) * 0.12;
            p.y += (p.baseY - p.y) * 0.12;
            p.highlight = false;
          }
        } else {
          p.x += (p.baseX - p.x) * 0.12;
          p.y += (p.baseY - p.y) * 0.12;
          p.highlight = false;
        }

        ctx.fillStyle = p.highlight ? brandColor : idleColor;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.life -= 1;
        if (p.life <= 0) {
          const replacement = createParticle();
          if (replacement) particles[i] = replacement;
          else {
            particles.splice(i, 1);
            i -= 1;
          }
        }
      }

      const targetCount = Math.floor(
        BASE_PARTICLE_COUNT * Math.sqrt((width * height) / (1920 * 1080))
      );
      while (particles.length < targetCount) {
        const extra = createParticle();
        if (!extra) break;
        particles.push(extra);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const cssX = event.clientX - rect.left;
      const cssY = event.clientY - rect.top;
      const inside = cssX >= 0 && cssY >= 0 && cssX <= rect.width && cssY <= rect.height;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      pointerRef.current = {
        x: cssX * scaleX,
        y: cssY * scaleY,
        active: inside,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current = { x: 0, y: 0, active: false };
    };

    const bootstrap = async () => {
      const token = ++bootstrapToken;
      try {
        await rasterizeLogo();
      } catch (error) {
        console.error("[ParticleLogoCanvas]", error);
        return;
      }
      if (destroyed || token !== bootstrapToken) return;
      seedParticles();
      cancelAnimationFrame(animationFrameId);
      animate();
    };

    resizeCanvas();
    bootstrap();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      resizeCanvas();
      bootstrap();
    });

    resizeObserver.observe(wrap);
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerdown", updatePointer);
    window.addEventListener("pointerup", handlePointerLeave);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerout", handlePointerLeave);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", updatePointer);
      window.removeEventListener("pointerup", handlePointerLeave);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerout", handlePointerLeave);
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [logoSrc, bgColor, idleColor, brandColor, logoHeight, maxDistance]);

  return (
    <div ref={wrapRef} className={className ?? "relative h-[400px] w-full"}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Interactive particle logo background"
      />
    </div>
  );
}







