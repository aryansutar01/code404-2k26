'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF, Environment, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model(props: any) {
    const { scene } = useGLTF('/eywa_tree/eywa-optimized.glb');
    const ref = useRef<THREE.Group>(null);

    // Filter out the base (grass) and rocks
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
useGLTF.preload('/eywa_tree/eywa-optimized.glb');

export default function BioTree() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Suspense fallback={null}>
                    {/* Lighting for the model */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00E5FF" />
                    <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#5B4B8A" />
                    <pointLight position={[0, 5, 0]} intensity={2} color="#4DFFD2" distance={10} />

                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                        <Center>
                            {/* Slightly reduced scale */}
                            <Model scale={0.15} />
                        </Center>
                    </Float>

                    {/* Additional "Spirit" particles around the tree */}
                    <Sparkles count={500} scale={12} size={4} speed={0.4} opacity={0.5} color="#00E5FF" />

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
