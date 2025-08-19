// import React, { useRef, useState, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Stars, TorusKnot } from '@react-three/drei';
// import * as THREE from 'three';

// function Particles({ count }) {
//   const mesh = useRef();
//   const light = useRef();

//   const [positions, colors] = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const colors = new Float32Array(count * 3);
//     const color = new THREE.Color();
//     for (let i = 0; i < count; i++) {
//       const x = (Math.random() - 0.5) * 10;
//       const y = (Math.random() - 0.5) * 10;
//       const z = (Math.random() - 0.5) * 10;
//       positions.set([x, y, z], i * 3);
//       color.setHSL(Math.random() * 0.2 + 0.6, 1, 0.5);
//       colors.set([color.r, color.g, color.b], i * 3);
//     }
//     return [positions, colors];
//   }, [count]);

//   useFrame((state, delta) => {
//     if (mesh.current) {
//       mesh.current.rotation.x += delta * 0.05;
//       mesh.current.rotation.y += delta * 0.03;
//     }
//     if (light.current) {
//       light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
//       light.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 3;
//       light.current.position.z = Math.sin(state.clock.elapsedTime * 0.6) * 3;
//     }
//   });

//   return (
//     <points ref={mesh}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={colors.length / 3}
//           array={colors}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         vertexColors={true}
//         size={0.05}
//         sizeAttenuation={true}
//         transparent={true}
//         alphaTest={0.5}
//         depthWrite={false}
//       />
//       <pointLight ref={light} position={[0, 0, 0]} intensity={1.5} color="#ffa500" />
//     </points>
//   );
// }

// function AnimatedTorusKnot({ accentColor }) {
//   const meshRef = useRef();
//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.005;
//       meshRef.current.rotation.x += 0.002;
//     }
//     const hue = (Math.sin(state.clock.elapsedTime * 0.1) * 0.5 + 0.5) * 0.2 + 0.6;
//     accentColor.setHSL(hue, 0.8, 0.7);
//   });
//   return (
//     <TorusKnot ref={meshRef} args={[1, 0.4, 100, 16]}>
//       <meshStandardMaterial
//         color={accentColor}
//         metalness={0.8}
//         roughness={0.2}
//         wireframe={false}
//       />
//     </TorusKnot>
//   );
// }

// const Event3DBackground = () => {
//   const [accentColor] = useState(new THREE.Color('#2575fc'));
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 5], fov: 75 }}
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         zIndex: -1,
//       }}
//     >
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} intensity={1} color={accentColor} />
//       <pointLight position={[-10, -10, -10]} intensity={0.7} color="#fff" />
//       <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
//       <AnimatedTorusKnot accentColor={accentColor} />
//       <Particles count={500} />
//     </Canvas>
//   );
// };

// export default Event3DBackground;



// src/components/Event3DBackground.js
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';

// --- PARTICLES FOR TECH EVENTS (default) ---
function TechParticles({ count }) {
  const mesh = useRef();
  const light = useRef();
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      positions.set([x, y, z], i * 3);
      color.setHSL(0.55 + Math.random() * 0.2, 0.8, 0.7); // blue/purple
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [count]);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.03;
      mesh.current.rotation.y += delta * 0.02;
    }
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.7) * 4;
      light.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 4;
      light.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 4;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial vertexColors={true} size={0.07} sizeAttenuation={true} transparent={true} alphaTest={0.5} depthWrite={false} />
      <pointLight ref={light} position={[0, 0, 0]} intensity={2} color="#00ffff" />
    </points>
  );
}

// --- PARTICLES FOR DANCE EVENTS ---
function DanceParticles({ count }) {
  // Colorful, wavy, energetic
  const mesh = useRef();
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const x = (Math.sin(i) + Math.random() - 0.5) * 8;
      const y = (Math.cos(i) + Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 8;
      positions.set([x, y, z], i * 3);
      color.setHSL(Math.random(), 0.85, 0.65); // rainbow
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [count]);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.04;
      mesh.current.rotation.y += delta * 0.04;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial vertexColors={true} size={0.09} sizeAttenuation={true} transparent={true} alphaTest={0.5} depthWrite={false} />
    </points>
  );
}

// --- PARTICLES FOR SINGING EVENTS ---
function SingingParticles({ count }) {
  // Soft, musical, wave-like
  const mesh = useRef();
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const x = Math.sin(i * 0.2) * 7 + (Math.random() - 0.5) * 2;
      const y = Math.cos(i * 0.2) * 7 + (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 6;
      positions.set([x, y, z], i * 3);
      color.setHSL(0.6 + Math.sin(i) * 0.1, 0.7, 0.8); // blue/purple, musical
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [count]);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.z += delta * 0.03;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial vertexColors={true} size={0.08} sizeAttenuation={true} transparent={true} alphaTest={0.5} depthWrite={false} />
    </points>
  );
}

// --- PARTICLES FOR BUSINESS EVENTS ---
function BusinessParticles({ count }) {
  // Gold, silver, blue, more structured
  const mesh = useRef();
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 7;
      const y = (Math.random() - 0.5) * 7;
      const z = (Math.random() - 0.5) * 7;
      positions.set([x, y, z], i * 3);
      // Gold, silver, blue
      if (i % 3 === 0) color.set('#ffd700'); // gold
      else if (i % 3 === 1) color.set('#c0c0c0'); // silver
      else color.set('#0077ff'); // blue
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [count]);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial vertexColors={true} size={0.08} sizeAttenuation={true} transparent={true} alphaTest={0.5} depthWrite={false} />
    </points>
  );
}

// --- PARTICLES FOR SPORTS EVENTS ---
function SportsParticles({ count }) {
  // Green, orange, energetic
  const mesh = useRef();
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 9;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 9;
      positions.set([x, y, z], i * 3);
      if (i % 2 === 0) color.set('#43ea5e'); // green
      else color.set('#ff9800'); // orange
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [count]);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.05;
      mesh.current.rotation.y += delta * 0.03;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial vertexColors={true} size={0.09} sizeAttenuation={true} transparent={true} alphaTest={0.5} depthWrite={false} />
    </points>
  );
}

// --- PARTICLES FOR ART & CULTURE EVENTS ---
function ArtCultureParticles({ count }) {
  // Pastel, artistic, soft
  const mesh = useRef();
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 8;
      positions.set([x, y, z], i * 3);
      color.setHSL(0.2 + Math.random() * 0.6, 0.4, 0.8); // pastel
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [count]);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial vertexColors={true} size={0.09} sizeAttenuation={true} transparent={true} alphaTest={0.5} depthWrite={false} />
    </points>
  );
}

// --- BUSINESS BAR CHART BACKGROUND ---
function BusinessBars() {
  // Animated bar chart for business events
  const group = useRef();
  const barCount = 12;
  // Animate bar heights
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((bar, i) => {
        // Animate height with sine wave
        const scaleY = 1.2 + Math.abs(Math.sin(state.clock.elapsedTime * 1.2 + i)) * 2.5;
        bar.scale.y = scaleY;
        bar.position.y = scaleY / 2 - 1.5;
      });
    }
  });
  return (
    <group ref={group} position={[0, -1.5, 0]}>
      {Array.from({ length: barCount }).map((_, i) => (
        <mesh key={i} position={[(i - barCount / 2) * 0.5, 0, 0]}>
          <boxGeometry args={[0.35, 2, 0.35]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#ffd700' : '#0077ff'} metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// --- SPORTS BOUNCING BALLS BACKGROUND ---
function SportsBalls() {
  // Animated bouncing balls for sports events
  const group = useRef();
  const ballCount = 8;
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((ball, i) => {
        // Animate y position with sine wave
        const t = state.clock.elapsedTime * 1.5 + i;
        ball.position.y = Math.abs(Math.sin(t)) * 2.2 - 1.2;
        ball.position.x = Math.sin(t * 0.5) * 2 + (i - ballCount / 2) * 0.7;
        ball.position.z = Math.cos(t * 0.7) * 1.2;
      });
    }
  });
  return (
    <group ref={group}>
      {Array.from({ length: ballCount }).map((_, i) => (
        <mesh key={i} position={[(i - ballCount / 2) * 0.7, 0, 0]} castShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#43ea5e' : '#ff9800'} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// --- MINIMAL 3D FOOTBALL FOR SPORTS EVENTS ---
function MinimalSportsFootball() {
  const ballRef = useRef();
  const shadowRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const y = Math.abs(Math.sin(t * 1.5)) * 1.7 - 0.7;
    if (ballRef.current) ballRef.current.position.y = y;
    if (shadowRef.current) shadowRef.current.scale.x = shadowRef.current.scale.y = 0.7 + 0.5 * (1 - y / 1.0);
  });
  return (
    <>
      <mesh ref={ballRef} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#fff" metalness={0.4} roughness={0.3} />
      </mesh>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i/6)*2*Math.PI)*0.5, 0.1, Math.sin((i/6)*2*Math.PI)*0.5]}>
          <circleGeometry args={[0.18, 12]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      <mesh ref={shadowRef} position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#222" transparent opacity={0.18} />
      </mesh>
    </>
  );
}

// --- MAIN 3D BACKGROUND COMPONENT ---
// category: 'tech' | 'dance' | 'singing' | 'business' | 'sports' | 'art-culture'
const Event3DBackground = ({ category = 'tech' }) => {
  let ParticlesComponent = TechParticles;
  let CustomComponent = null;
  if (category === 'dance') ParticlesComponent = DanceParticles;
  else if (category === 'singing') ParticlesComponent = SingingParticles;
  else if (category === 'business') {
    ParticlesComponent = null;
    CustomComponent = null;
  }
  else if (category === 'sports') {
    ParticlesComponent = null;
    CustomComponent = MinimalSportsFootball;
  }
  else if (category === 'art-culture') ParticlesComponent = ArtCultureParticles;

  // For business, render a flat background instead of 3D
  if (category === 'business') {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #ffd700 0%, #0077ff 100%)',
        opacity: 0.18
      }}>
        {/* Flat gold/blue background for business events (no 3D) */}
      </div>
    );
  }

  // For sports, render a minimal 3D football scene
  if (category === 'sports') {
    return (
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 60 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 2]} intensity={0.7} />
        <MinimalSportsFootball />
      </Canvas>
    );
  }

  // For all other categories, render the 3D Canvas background
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <ambientLight intensity={0.3} />
      {category === 'dance' && <pointLight position={[5, 5, 5]} intensity={1} color="#ff69b4" />} {/* Pink */}
      {category === 'singing' && <pointLight position={[5, 5, 5]} intensity={1} color="#8ec6ff" />} {/* Blue */}
      {category === 'art-culture' && <pointLight position={[5, 5, 5]} intensity={1} color="#ffb6c1" />} {/* Pastel pink */}
      {category === 'tech' && <pointLight position={[5, 5, 5]} intensity={1} color="#00aaff" />} {/* Blue */}
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
      {ParticlesComponent && <ParticlesComponent count={600} />}
      {CustomComponent && <CustomComponent />}
      {(category === 'tech') && (
        <Grid
          renderOrder={-1}
          position={[0, -2, 0]}
          args={[20, 20]}
          cellSize={1}
          sectionSize={5}
          cellColor={'#004488'}
          sectionColor={'#0077ff'}
          fadeDistance={25}
          followCamera={false}
          infiniteGrid={true}
        />
      )}
    </Canvas>
  );
};

export default Event3DBackground;