'use client';

import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model(props: any) {
    const { scene } = useGLTF('/eywa_tree/eywa_lowPoly2c-v1.glb');
    const ref = useRef<THREE.Group>(null);

    // Filter out the base (grass) and rocks, and enable frustum culling optimizations
    React.useLayoutEffect(() => {
        scene.traverse((child: any) => {
            if (child.isMesh) {
                // The grass texture was named 'lambert3' in the optimized log
                const matName = child.material?.name?.toLowerCase() || '';
                const mapName = child.material?.map?.name?.toLowerCase() || '';

                // Check if it looks like the base (lambert3) or rocks (blinn3)
                if (matName.includes('lambert3') || mapName.includes('lambert3') ||
                    matName.includes('blinn3') || mapName.includes('blinn3')) {
                    child.visible = false;
                } else {
                    // Explicitly enable frustum culling for visible meshes
                    child.frustumCulled = true;

                    // Compute bounding box and sphere for accurate culling
                    if (child.geometry) {
                        child.geometry.computeBoundingBox();
                        child.geometry.computeBoundingSphere();
                    }

                    // Optimize material for better performance - LOWP for mobile
                    if (child.material) {
                        child.material.precision = 'lowp'; // Switched from mediump to lowp
                    }

                    // Explicitly disable shadow casting and receiving
                    child.castShadow = false;
                    child.receiveShadow = false;
                }
            }
        });
    }, [scene]);

    // Auto-rotate the tree slowly
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return <primitive ref={ref} object={scene} {...props} />;
}

// Preload the model
useGLTF.preload('/eywa_tree/eywa_lowPoly2c-v1.glb');

export default function BioTree() {
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer to pause rendering when out of view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // Trigger when at least 10% is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                // Performance optimizations
                dpr={Math.min(window.devicePixelRatio, 1.5)} // Clamp DPR to max 1.5
                gl={{
                    antialias: false, // Disable antialiasing - major mobile win
                    stencil: false, // Disable stencil buffer
                    alpha: true, // Enable alpha for transparent background
                    powerPreference: 'high-performance', // Request high-performance GPU
                    precision: 'lowp', // Low precision for better performance
                }}
                shadows={false} // Explicitly disable shadows
                frameloop={isVisible ? 'always' : 'demand'} // Pause when not visible
            >
                <Suspense fallback={null}>
                    {/* Optimized lighting - simplified setup for mobile */}
                    <ambientLight intensity={2} />
                    {/* Reduced to single directional light instead of multiple spotlights */}
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={2}
                        color="#00E5FF"
                        castShadow={false} // Explicitly no shadows
                    />
                    {/* Single accent light instead of multiple point/spot lights */}
                    <pointLight
                        position={[0, 3, 0]}
                        intensity={2}
                        color="#4DFFD2"
                        distance={8}
                        castShadow={false} // Explicitly no shadows
                    />

                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                        <Center>
                            {/* Slightly reduced scale */}
                            <Model scale={0.15} />
                        </Center>
                    </Float>

                    {/* Reduced particles from 500 to 200 */}
                    <Sparkles count={200} scale={12} size={4} speed={0.4} opacity={0.5} color="#00E5FF" />

                    {/* Removed Environment component - expensive for mobile */}
                </Suspense>
            </Canvas>
        </div>
    );
}
