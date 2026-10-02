'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function SpicesGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Chili Pod (Red Cone + Green Top) */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <group position={[-3.5, 2, -2]} rotation={[0.4, 0.2, -0.3]}>
          <mesh>
            <coneGeometry args={[0.25, 1.2, 16]} />
            <meshStandardMaterial color="#D9261C" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
            <meshStandardMaterial color="#2E8B57" roughness={0.5} />
          </mesh>
        </group>
      </Float>

      {/* 2. Bay Leaf (Flat Green Blade) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[3.8, 1, -1]} rotation={[0.8, -0.4, 0.5]}>
          <coneGeometry args={[0.35, 1.4, 4, 1]} />
          <meshStandardMaterial color="#3B7A57" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* 3. Heritage Cherry Tomato Sphere */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.1}>
        <group position={[-2.8, -2.5, -1]}>
          <mesh>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color="#E63946" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <torusGeometry args={[0.12, 0.03, 8, 16]} />
            <meshStandardMaterial color="#2D6A4F" />
          </mesh>
        </group>
      </Float>

      {/* 4. Star Anise (Golden Spiked Shape) */}
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={0.9}>
        <group position={[3.2, -2, -2]} rotation={[0.5, 0.5, 0]}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
              <coneGeometry args={[0.15, 0.7, 8]} />
              <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
            </mesh>
          ))}
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#5C3A21" roughness={0.8} />
          </mesh>
        </group>
      </Float>

      {/* 5. Peppercorn Sphere Duo */}
      <Float speed={2.2} floatIntensity={1.8}>
        <mesh position={[0.5, -3.2, -1.5]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#0B201A" roughness={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function FloatingSpices3D() {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-70">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 2]} intensity={1.5} color="#FAF7F2" />
        <pointLight position={[-2, -2, 2]} color="#C5A059" intensity={1} />
        <SpicesGroup />
      </Canvas>
    </div>
  );
}
