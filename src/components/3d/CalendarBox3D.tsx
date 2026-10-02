'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Box3DModel() {
  const boxRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta * 0.3;
    }
    // Gentle opening lid motion
    if (lidRef.current) {
      const time = state.clock.getElapsedTime();
      lidRef.current.position.y = 0.8 + Math.sin(time * 1.5) * 0.15;
      lidRef.current.rotation.z = Math.sin(time * 1.5) * 0.1;
    }
  });

  return (
    <group ref={boxRef} position={[0, -0.2, 0]}>
      {/* Gift Box Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 1.2, 1.6]} />
        <meshStandardMaterial color="#0B201A" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Gold Ribbon Vertical */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.63, 1.22, 0.25]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Gold Ribbon Horizontal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.25, 1.22, 1.63]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Opening Lid */}
      <mesh ref={lidRef} position={[0, 0.8, 0]}>
        <boxGeometry args={[1.7, 0.25, 1.7]} />
        <meshStandardMaterial color="#163E32" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Ribbon Bow on top */}
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[0.25, 0.08, 16, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function CalendarBox3D() {
  const [hasWebGL, setHasWebGL] = React.useState(true);

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
      <div className="w-24 h-24 rounded-2xl bg-[#0B201A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-xl">
        <span className="font-serif text-2xl font-bold">48h</span>
      </div>
    );
  }

  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64 relative">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 2, 4]} fov={45} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} color="#FFFDF9" />
        <pointLight position={[-3, 2, -2]} color="#C5A059" intensity={1.2} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <Box3DModel />
        </Float>
      </Canvas>
    </div>
  );
}
