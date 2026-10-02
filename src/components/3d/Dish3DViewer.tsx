'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Dish3DModel({ course }: { course: string }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const getDishColor = () => {
    switch (course) {
      case 'Entrées':
        return '#8B4513';
      case 'Plats':
        return '#C83E2B';
      case 'Desserts':
        return '#D4AF37';
      case 'Boissons':
        return '#8B0000';
      default:
        return '#C83E2B';
    }
  };

  return (
    <group ref={meshRef} position={[0, -0.3, 0]}>
      {/* Porcelain Gourmet Dish Plate */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 1.8, 0.4, 64]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* Gold Outer Rim */}
      <mesh position={[0, 0.201, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.52, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Center Food Presentation Base */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[2.0, 2.1, 0.2, 64]} />
        <meshStandardMaterial color={getDishColor()} roughness={0.5} />
      </mesh>

      {/* Gourmet Garnish Torus Ring */}
      <mesh position={[0, 0.4, 0]} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[0.9, 0.15, 16, 32]} />
        <meshStandardMaterial color="#FAF7F2" metalness={0.2} roughness={0.3} />
      </mesh>

      {/* Chef Micro-Herb Accent */}
      <mesh position={[0, 0.6, 0]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function Dish3DViewer({ course, imageUrl, name }: { course: string; imageUrl: string; name: string }) {
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  React.useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full relative rounded-xl overflow-hidden border border-[#C5A059]/30 shadow-2xl">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="w-full h-[350px] sm:h-[450px] relative rounded-xl overflow-hidden glass-panel border border-[#C5A059]/40 shadow-2xl">
      <div className="absolute top-4 left-4 z-10 bg-[#0B201A]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40 text-[11px] font-sans text-[#FAF7F2] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
        <span>3D Plate Interactive — Drag to rotate</span>
      </div>

      <Canvas dpr={[1, 1.5]} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFDF9" />
        <pointLight position={[-4, 2, -2]} color="#C5A059" intensity={1} />
        
        <Dish3DModel course={course} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
