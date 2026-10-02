'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  scrollProgress: number; // 0 to 1
}

// -------------------------------------------------------------
// INGREDIENTS DROPPING & RICE GRAINS (CHAPTER II)
// -------------------------------------------------------------
function DroppingIngredients({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const ch2T = Math.max(0, Math.min(1, (progress - 0.35) / 0.30));

  const pepperY = ch2T < 0.15 ? 4.0 - ch2T * 20 : 0.4;
  const pepperVis = ch2T > 0.05;

  const tomatoY = ch2T < 0.35 ? 4.5 - (ch2T - 0.15) * 18 : 0.4;
  const tomatoVis = ch2T > 0.20;

  const fishY = ch2T < 0.55 ? 5.0 - (ch2T - 0.35) * 18 : 0.4;
  const fishVis = ch2T > 0.38;

  const gingerY = ch2T < 0.75 ? 5.0 - (ch2T - 0.55) * 18 : 0.4;
  const gingerVis = ch2T > 0.58;

  // Reduce particle count on mobile for 60fps performance
  const riceCount = isMobile ? 20 : 40;
  const [ricePos] = React.useMemo(() => {
    const pos = new Float32Array(riceCount * 3);
    for (let i = 0; i < riceCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.0;
      pos[i * 3 + 1] = Math.random() * 2.5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
    }
    return [pos];
  }, [riceCount]);

  const riceRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (riceRef.current && ch2T > 0.7) {
      const posAttr = riceRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      for (let i = 0; i < riceCount; i++) {
        array[i * 3 + 1] -= delta * 1.5;
        if (array[i * 3 + 1] < 0.3) {
          array[i * 3 + 1] = 2.5;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {pepperVis && (
        <group position={[0.3, Math.max(0.35, pepperY), 0.2]} rotation={[0.4, 0.2, 0.5]}>
          <mesh>
            <coneGeometry args={[0.22, 0.7, 16]} />
            <meshStandardMaterial color="#D9261C" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} />
            <meshStandardMaterial color="#2E8B57" roughness={0.5} />
          </mesh>
        </group>
      )}

      {tomatoVis && (
        <group position={[-0.4, Math.max(0.35, tomatoY), -0.2]}>
          <mesh>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial color="#E63946" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <torusGeometry args={[0.1, 0.025, 8, 16]} />
            <meshStandardMaterial color="#2D6A4F" />
          </mesh>
        </group>
      )}

      {fishVis && (
        <group position={[0.2, Math.max(0.35, fishY), -0.4]} rotation={[0.3, 0.6, 0.2]}>
          <mesh>
            <boxGeometry args={[0.45, 0.2, 0.35]} />
            <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
          </mesh>
        </group>
      )}

      {gingerVis && (
        <group position={[-0.25, Math.max(0.35, gingerY), 0.3]} rotation={[0.5, 0, 0.4]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.18, 0.45, 12]} />
            <meshStandardMaterial color="#C5A059" roughness={0.8} />
          </mesh>
        </group>
      )}

      {ch2T > 0.7 && (
        <points ref={riceRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[ricePos, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.07} color="#FFFDF9" />
        </points>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// CHAPTER III: DINING TABLE, 4 COURSES, CANDLES & JOURNEY LINE
// -------------------------------------------------------------
function Chapter3TablePresentation({ progress }: { progress: number }) {
  const isVisible = progress >= 0.60 && progress <= 0.83;
  const ch3T = Math.max(0, Math.min(1, (progress - 0.60) / 0.22));

  const flame1Ref = useRef<THREE.Mesh>(null);
  const flame2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (flame1Ref.current) flame1Ref.current.scale.setScalar(1 + Math.sin(time * 12) * 0.15);
    if (flame2Ref.current) flame2Ref.current.scale.setScalar(1 + Math.cos(time * 10) * 0.15);
  });

  if (!isVisible) return null;

  return (
    <group position={[0, -0.6, 0]} scale={[ch3T, ch3T, ch3T]}>
      {/* 1. Long Mahogany Table */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[10, 0.25, 3.5]} />
        <meshStandardMaterial color="#1A0D07" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Gold Table Inlay */}
      <mesh position={[0, -0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.8, 3.3]} />
        <meshStandardMaterial color="#C5A059" wireframe roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Course Plates */}
      <group position={[-3.2, 0.05, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.5, 0.1, 32]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text position={[0, 0.4, 0]} fontSize={0.2} color="#D4AF37" anchorX="center" anchorY="middle">
          ENTRÉE
        </Text>
      </group>

      <group position={[-1.0, 0.05, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.85, 0.6, 0.12, 32]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.06, 32]} />
          <meshStandardMaterial color="#C83E2B" />
        </mesh>
        <Text position={[0, 0.4, 0]} fontSize={0.2} color="#D4AF37" anchorX="center" anchorY="middle">
          PLAT
        </Text>
      </group>

      <group position={[1.2, 0.05, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.5, 0.1, 32]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.05, 32]} />
          <meshStandardMaterial color="#D4AF37" />
        </mesh>
        <Text position={[0, 0.4, 0]} fontSize={0.2} color="#D4AF37" anchorX="center" anchorY="middle">
          DESSERT
        </Text>
      </group>

      <group position={[3.3, 0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.35, 0.6, 32]} />
          <meshStandardMaterial color="#8B0000" transparent opacity={0.8} roughness={0.1} />
        </mesh>
        <Text position={[0, 0.5, 0]} fontSize={0.2} color="#D4AF37" anchorX="center" anchorY="middle">
          BOISSON
        </Text>
      </group>

      {/* Candlesticks */}
      <group position={[-4.2, 0.4, -1.0]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.08, 0.8, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={flame1Ref} position={[0, 0.45, 0]}>
          <coneGeometry args={[0.05, 0.15, 16]} />
          <meshStandardMaterial color="#FFA500" emissive="#FF4500" emissiveIntensity={2.0} />
        </mesh>
      </group>

      <group position={[4.2, 0.4, -1.0]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.08, 0.8, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={flame2Ref} position={[0, 0.45, 0]}>
          <coneGeometry args={[0.05, 0.15, 16]} />
          <meshStandardMaterial color="#FFA500" emissive="#FF4500" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* Journey Line Map */}
      <group position={[0, 1.6, 0]}>
        <group position={[-2.5, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} />
          </mesh>
          <Text position={[0, -0.3, 0]} fontSize={0.16} color="#FAF7F2">
            Kano (Roots)
          </Text>
        </group>

        <mesh position={[-1.25, 0, 0]}>
          <boxGeometry args={[2.3, 0.02, 0.02]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1} />
        </mesh>

        <group position={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} />
          </mesh>
          <Text position={[0, -0.3, 0]} fontSize={0.16} color="#FAF7F2">
            Lagos (Coast)
          </Text>
        </group>

        <mesh position={[1.25, 0, 0]}>
          <boxGeometry args={[2.3, 0.02, 0.02]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1} />
        </mesh>

        <group position={[2.5, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} />
          </mesh>
          <Text position={[0, -0.3, 0]} fontSize={0.16} color="#FAF7F2">
            Paris (Haute Dining)
          </Text>
        </group>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// CHAPTER IV: LUXURY BOX & FLIPPING 3D CALENDAR
// -------------------------------------------------------------
function Chapter4OrderBoxAndCalendar({ progress }: { progress: number }) {
  const isVisible = progress >= 0.78;
  const ch4T = Math.max(0, Math.min(1, (progress - 0.78) / 0.22));

  const boxGroupRef = useRef<THREE.Group>(null);
  const calendarPageRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (boxGroupRef.current) {
      const slideX = ch4T * 1.6;
      boxGroupRef.current.position.x = slideX;
    }

    if (calendarPageRef.current) {
      const flipAngle = Math.min(Math.PI * 0.85, ch4T * Math.PI * 1.2);
      calendarPageRef.current.rotation.x = -flipAngle;
    }
  });

  if (!isVisible) return null;

  return (
    <group position={[0, 0.2, 0]} scale={[ch4T, ch4T, ch4T]}>
      <group ref={boxGroupRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.8, 1.3, 1.8]} />
          <meshStandardMaterial color="#0B201A" roughness={0.2} metalness={0.5} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.82, 1.32, 0.28]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.28, 1.32, 1.82]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[1.9, 0.28, 1.9]} />
          <meshStandardMaterial color="#163E32" roughness={0.2} metalness={0.4} />
        </mesh>

        <mesh position={[0, 0.95, 0]}>
          <torusGeometry args={[0.28, 0.08, 16, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
        </mesh>

        <group position={[-1.6, 0.2, 0.9]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 1.5, 0.08]} />
            <meshStandardMaterial color="#FAF7F2" roughness={0.2} />
          </mesh>

          <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 1.1, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} />
          </mesh>

          <group ref={calendarPageRef} position={[0, 0.6, 0.05]}>
            <mesh position={[0, -0.6, 0]}>
              <planeGeometry args={[1.15, 1.35]} />
              <meshStandardMaterial color="#FFFDF9" roughness={0.3} side={THREE.DoubleSide} />
            </mesh>
            <Text position={[0, -0.4, 0.02]} fontSize={0.28} color="#0B201A">
              48h
            </Text>
            <Text position={[0, -0.7, 0.02]} fontSize={0.11} color="#C5A059">
              PRE-ORDER
            </Text>
          </group>
        </group>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// MASTER POT & COALS
// -------------------------------------------------------------
function MasterPot({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const potGroupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const coalsRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const particleCount = isMobile ? 35 : 70;
  const [positions] = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = Math.random() * 2.5 + 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return [pos];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!potGroupRef.current) return;

    potGroupRef.current.rotation.y += delta * 0.2;

    if (lidRef.current) {
      let lidTargetY = 0.28;
      let lidTargetRotZ = 0;

      if (progress > 0.18 && progress < 0.65) {
        const liftFactor = Math.min(1, (progress - 0.18) / 0.18);
        lidTargetY = 0.28 + liftFactor * 1.35;
        lidTargetRotZ = liftFactor * 0.5;
      } else if (progress >= 0.65) {
        lidTargetY = 1.8;
        lidTargetRotZ = 0.6;
      }

      lidRef.current.position.y += (lidTargetY - lidRef.current.position.y) * 0.08;
      lidRef.current.rotation.z += (lidTargetRotZ - lidRef.current.rotation.z) * 0.08;
    }

    if (coalsRef.current) {
      const time = state.clock.getElapsedTime();
      const fireIntensity = progress >= 0.35 && progress <= 0.65 ? 2.0 : 0.9;
      coalsRef.current.scale.setScalar(1 + Math.sin(time * 3.5) * 0.05 * fireIntensity);
    }

    if (steamRef.current) {
      const speed = progress >= 0.35 && progress <= 0.65 ? 1.4 : 0.7;
      const posAttr = steamRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        array[i * 3 + 1] += delta * speed;
        if (array[i * 3 + 1] > 3.0) {
          array[i * 3 + 1] = 0.3;
        }
      }
      posAttr.needsUpdate = true;
    }

    if (ringRef.current) {
      const ch2Progress = Math.max(0, Math.min(1, (progress - 0.35) / 0.30));
      ringRef.current.rotation.z += delta * 0.5;
      ringRef.current.scale.setScalar(0.2 + ch2Progress * 0.85);
    }
  });

  return (
    <group ref={potGroupRef} position={[0, -0.5, 0]}>
      {/* Heavy Cast Iron Pot Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 1.3, 1.2, 64]} />
        <meshStandardMaterial color="#0B201A" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Gold Lip Ring */}
      <mesh position={[0, 0.601, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.05, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 12-Hour Gold Patience Ring */}
      <mesh ref={ringRef} position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.05, 16, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>

      {/* Inner Stew & Jollof Rice */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 0.4, 64]} />
        <meshStandardMaterial color="#B83220" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Dropping Ingredients */}
      <DroppingIngredients progress={progress} isMobile={isMobile} />

      {/* Heavy Lid */}
      <group ref={lidRef} position={[0, 0.28, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[2.02, 2.05, 0.2, 64]} />
          <meshStandardMaterial color="#0B201A" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[1.7, 2.0, 0.15, 64]} />
          <meshStandardMaterial color="#163E32" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.3, 0.2, 0.25, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Handles */}
      <mesh position={[-2.2, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.26, 0.07, 16, 32]} />
        <meshStandardMaterial color="#0B201A" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[2.2, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.26, 0.07, 16, 32]} />
        <meshStandardMaterial color="#0B201A" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Coals Platform */}
      <group ref={coalsRef} position={[0, -0.65, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.2, 32]} />
          <meshBasicMaterial color="#FF4500" transparent opacity={0.7} />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI) / 4;
          const radius = 1.3 + (i % 2) * 0.3;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, 0.05, Math.sin(angle) * radius]}
            >
              <dodecahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial
                color="#E63946"
                emissive="#FF3300"
                emissiveIntensity={1.8}
                roughness={0.8}
              />
            </mesh>
          );
        })}
      </group>

      {/* Steam Particles */}
      <points ref={steamRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
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

// -------------------------------------------------------------
// SCROLL DRIVEN CAMERA & LIGHTING
// -------------------------------------------------------------
function ScrollCameraController({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;

    // Mobile camera adjustments (slightly farther back for small screens)
    const zOffset = isMobile ? 1.5 : 0;

    let targetPosX = 0;
    let targetPosY = 1.8;
    let targetPosZ = 6.5 + zOffset;
    let targetFov = 45;

    if (progress < 0.2) {
      const t = progress / 0.2;
      targetPosX = 0;
      targetPosY = 1.8 - t * 0.3;
      targetPosZ = 6.5 + zOffset - t * 0.8;
    } else if (progress < 0.4) {
      const t = (progress - 0.2) / 0.2;
      const angle = t * Math.PI * 1.2;
      targetPosX = Math.sin(angle) * (4.8 + zOffset);
      targetPosY = 1.8 + Math.sin(t * Math.PI) * 0.6;
      targetPosZ = Math.cos(angle) * (4.8 + zOffset);
    } else if (progress < 0.62) {
      const t = (progress - 0.4) / 0.22;
      targetPosX = Math.sin(t * Math.PI) * 0.4;
      targetPosY = 1.1;
      targetPosZ = 3.5 + zOffset;
    } else if (progress < 0.83) {
      const t = (progress - 0.62) / 0.21;
      targetPosX = -0.5 + t * 0.5;
      targetPosY = 3.2;
      targetPosZ = 7.0 + zOffset;
      targetFov = 50;
    } else {
      const t = (progress - 0.83) / 0.17;
      targetPosX = 0.8 * (1 - t);
      targetPosY = 1.6;
      targetPosZ = 5.2 + zOffset;
    }

    cameraRef.current.position.x += (targetPosX - cameraRef.current.position.x) * 0.05;
    cameraRef.current.position.y += (targetPosY - cameraRef.current.position.y) * 0.05;
    cameraRef.current.position.z += (targetPosZ - cameraRef.current.position.z) * 0.05;
    cameraRef.current.fov += (targetFov - cameraRef.current.fov) * 0.05;
    cameraRef.current.updateProjectionMatrix();

    cameraRef.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.8, 6.5]} fov={45} />;
}

// -------------------------------------------------------------
// MAIN SCENE CONTAINER
// -------------------------------------------------------------
export default function MainScrollStoryScene({ scrollProgress }: SceneProps) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!hasWebGL) return null;

  const isFireMode = scrollProgress >= 0.35 && scrollProgress <= 0.62;
  const isTableMode = scrollProgress > 0.62 && scrollProgress <= 0.83;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ScrollCameraController progress={scrollProgress} isMobile={isMobile} />

        <ambientLight intensity={isFireMode ? 0.5 : isTableMode ? 1.3 : 1.1} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={isTableMode ? 2.2 : 1.8}
          color={isFireMode ? '#FF7700' : '#FFFDF9'}
          castShadow
        />
        <pointLight
          position={[0, -0.3, 0]}
          color="#FF4500"
          intensity={isFireMode ? 4.0 : 1.2}
        />
        <pointLight position={[-4, 3, -2]} color="#C5A059" intensity={1.5} />

        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
          <MasterPot progress={scrollProgress} isMobile={isMobile} />
        </Float>

        <Chapter3TablePresentation progress={scrollProgress} />
        <Chapter4OrderBoxAndCalendar progress={scrollProgress} />
      </Canvas>
    </div>
  );
}
