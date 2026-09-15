import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

const Studio = () => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight
        position={[4, 8, 5]}
        angle={0.5}
        penumbra={0.9}
        intensity={75}
        color="#fff2d5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 4, -4]} intensity={1.4} color="#c7f0df" />

      <Environment resolution={256}>
        <Lightformer intensity={2.4} position={[0, 5, 2]} scale={[8, 8, 1]} />
        <Lightformer
          intensity={1.2}
          color="#b9ead7"
          position={[-5, 2, -2]}
          rotation-y={Math.PI / 2}
          scale={[14, 3, 1]}
        />
        <Lightformer
          intensity={1}
          color="#ffcf9c"
          position={[5, 1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[14, 3, 1]}
        />
      </Environment>

      {/* floor */}
      <mesh rotation-x={-Math.PI / 2} position-y={-1.02} receiveShadow>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color="#743f35" roughness={0.68} metalness={0.12} />
      </mesh>

      <ContactShadows
        position={[0, -1.01, 0]}
        opacity={0.65}
        scale={12}
        blur={2.6}
        far={4}
      />
    </>
  );
};

export default Studio;
