import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CinematicLayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015);

    // --- Camera Setup ---
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
    camera.position.z = 30;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Create Soft Circular Bokeh Texture ---
    const createBokehTexture = () => {
      const size = 128;
      const canvasTex = document.createElement('canvas');
      canvasTex.width = size;
      canvasTex.height = size;
      const ctx = canvasTex.getContext('2d');
      if (ctx) {
        // Create radial gradient for a soft, glowing spherical particle
        const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 140, 50, 0.8)'); // Warm orange glow
        grad.addColorStop(0.5, 'rgba(255, 80, 0, 0.2)');   // Deep amber border
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
      }
      const texture = new THREE.CanvasTexture(canvasTex);
      return texture;
    };

    const bokehTexture = createBokehTexture();

    // --- Particles Setup ---
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speedX = new Float32Array(particleCount);
    const speedY = new Float32Array(particleCount);
    const speedZ = new Float32Array(particleCount);
    const phase = new Float32Array(particleCount);

    // Color choices: Warm Orange (gold, amber), Soft White
    const colorPalette = [
      new THREE.Color(0xff8c32), // Gold
      new THREE.Color(0xffaa44), // Amber
      new THREE.Color(0xffffff), // Pure White glow
      new THREE.Color(0xff4500), // Fire Orange
      new THREE.Color(0xffe5d9), // Cream Warm White
    ];

    for (let i = 0; i < particleCount; i++) {
      // Wide scattering coordinates in 3D
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      // Assign random color from palette
      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      // Particle specific sizing
      sizes[i] = Math.random() * 8 + 3;

      // Physics/Drifting speeds
      speedX[i] = (Math.random() - 0.5) * 0.02;
      speedY[i] = Math.random() * 0.04 + 0.015; // Mostly float upwards
      speedZ[i] = (Math.random() - 0.5) * 0.02;
      phase[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader-like PointsMaterial with soft depth testing
    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: bokehTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending, // Cinematic glow overlay
      depthWrite: false,
      opacity: 0.85,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Interactive Mouse Parallax Trackers ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Retrieve particle positions to animate
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = positionAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Drift upwards
        arr[i * 3 + 1] += speedY[i] * 60 * delta;

        // Sine wave horizontal sway
        arr[i * 3] += Math.sin(elapsedTime * 0.5 + phase[i]) * 0.005;
        arr[i * 3 + 2] += Math.cos(elapsedTime * 0.3 + phase[i]) * 0.003;

        // Reset if floating out of bounds (loop bottom to top)
        if (arr[i * 3 + 1] > 25) {
          arr[i * 3 + 1] = -25;
          arr[i * 3] = (Math.random() - 0.5) * 60;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 35;
        }
      }

      positionAttr.needsUpdate = true;

      // Mouse Parallax easing (LERP for ultra-smooth inertia)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Cinematic camera sway
      camera.position.x = 30 + currentMouseX * 4;
      camera.position.y = currentMouseY * 4;
      camera.lookAt(0, 0, 0);

      // Slow orbital rotate scene slightly
      particles.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // --- Handle Resize ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // --- Clean Up Resources (Prevent Memory Leaks) ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Safe GPU Resource Disposal
      geometry.dispose();
      material.dispose();
      bokehTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
};

export default CinematicLayer;
