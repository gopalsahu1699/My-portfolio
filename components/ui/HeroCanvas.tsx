"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars, Torus } from "@react-three/drei";
import * as THREE from "three";

/* ─── Floating distorted sphere (main orb) ─── */
function FloatingOrb() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    });

    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
            <Sphere ref={meshRef} args={[1.4, 64, 64]}>
                <MeshDistortMaterial
                    color="#8B5CF6"
                    attach="material"
                    distort={0.55}
                    speed={2.5}
                    roughness={0}
                    metalness={0.3}
                    opacity={0.18}
                    transparent
                />
            </Sphere>
        </Float>
    );
}

/* ─── Wireframe torus ─── */
function WireframeTorus() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.5}>
            <Torus ref={meshRef} args={[2, 0.015, 16, 120]}>
                <meshBasicMaterial color="#3B82F6" opacity={0.25} transparent wireframe={false} />
            </Torus>
        </Float>
    );
}

/* ─── Outer ring ─── */
function OuterRing() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    });

    return (
        <Torus ref={meshRef} args={[2.8, 0.008, 16, 120]}>
            <meshBasicMaterial color="#06B6D4" opacity={0.2} transparent />
        </Torus>
    );
}

/* ─── Icosahedron wireframe ─── */
function IcosaWireframe() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    });

    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.9, 1]} />
                <meshBasicMaterial color="#8B5CF6" wireframe opacity={0.12} transparent />
            </mesh>
        </Float>
    );
}

/* ─── Main Canvas export ─── */
export default function HeroCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#8B5CF6" />
            <pointLight position={[-5, -5, 5]} intensity={0.8} color="#06B6D4" />

            {/* Star field */}
            <Stars
                radius={80}
                depth={40}
                count={2500}
                factor={3}
                saturation={0.5}
                fade
                speed={0.5}
            />

            <FloatingOrb />
            <WireframeTorus />
            <OuterRing />
            <IcosaWireframe />
        </Canvas>
    );
}
