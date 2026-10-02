'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Golden Rimmed Gourmet Dish & Pot
function PotAndPlate({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const potRef = useRef<THREE.Group>(null);
  const steamParticlesRef = useRef<THREE.Points>(null);

  // Generate steam particles
  const particleCount = 60;
  const [positions] = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.4;
      pos[i * 3 + 1] = Math.random() * 2.2 + 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    if (potRef.current) {
      // Continuous rotation + subtle mouse tilt
      potRef.current.rotation.y += delta * 0.35;
      const targetX = 0.45 + mousePosition.y * 0.25;
      const targetZ = mousePosition.x * 0.2;
      potRef.current.rotation.x += (targetX - potRef.current.rotation.x) * 0.05;
      potRef.current.rotation.z += (targetZ - potRef.current.rotation.z) * 0.05;
    }

    // Animate steam particles rising
    if (steamParticlesRef.current) {
      const posAttr = steamParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        array[i * 3 + 1] += delta * 0.6; // rise up
        if (array[i * 3 + 1] > 2.2) {
          array[i * 3 + 1] = 0.3; // reset to pot center
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={potRef} position={[0, -0.4, 0]} rotation={[0.45, 0, 0]} scale={[0.85, 0.85, 0.85]}>
      {/* Porcelain Gourmet Dish Base */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.2, 1.4, 0.45, 64]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* Gold Rim Accent Ring */}
      <mesh position={[0, 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.24, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Inner Jollof Mound Base */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[1.75, 1.95, 0.28, 64]} />
        <meshStandardMaterial color="#C83E2B" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Gourmet Garnish: Charred Poulet Supreme & Peppers */}
      <mesh position={[0, 0.48, 0]} rotation={[0.2, 0.5, 0]}>
        <boxGeometry args={[0.95, 0.25, 0.65]} />
        <meshStandardMaterial color="#8B4513" roughness={0.4} />
      </mesh>

      <mesh position={[0.45, 0.48, 0.35]} rotation={[0, 0.8, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#D9261C" roughness={0.3} />
      </mesh>

      <mesh position={[-0.55, 0.48, -0.25]} rotation={[0.4, 0, 0.3]}>
        <coneGeometry args={[0.18, 0.4, 8]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.5} />
      </mesh>

      {/* Cast Iron Handles */}
      <mesh position={[-2.35, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.24, 0.06, 16, 32]} />
        <meshStandardMaterial color="#0B201A" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.35, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.24, 0.06, 16, 32]} />
        <meshStandardMaterial color="#0B201A" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Soft Ground Gold Ring Shadow */}
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 2.6, 64]} />
        <meshBasicMaterial color="#C5A059" transparent opacity={0.15} />
      </mesh>

      {/* Rising Steam Particles */}
      <points ref={steamParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#FFFDF9"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function Hero3DScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLowPower, setIsLowPower] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLowPower(true);
    }

    // Check WebGL availability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Static Fallback if low power / no WebGL
  if (isLowPower || !hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-72 h-72 rounded-full border-4 border-[#C5A059] overflow-hidden shadow-2xl relative animate-pulse">
          <img
            src="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop"
            alt="Maison Jollof Signature Pot"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] sm:h-[480px] md:h-[550px] relative flex items-center justify-center">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 1.2, 5.2]} fov={45} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 8, 5]} intensity={1.8} color="#FFFDF9" castShadow />
        <pointLight position={[-4, 3, -2]} intensity={1} color="#C5A059" />

        <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.3}>
          <PotAndPlate mousePosition={mousePos} />
        </Float>
      </Canvas>
    </div>
  );
}
