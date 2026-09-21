import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props { growth: number; tick: number; tiny: boolean; reducedMotion: boolean }
const RED = "#ed5945";
function Muscle({ position, scale, rotation = 0 }: { position: [number, number, number]; scale: [number, number, number]; rotation?: number }) {
  return <mesh position={position} scale={scale} rotation-z={rotation} castShadow>
    <sphereGeometry args={[1, 40, 32]} />
    <meshPhysicalMaterial color={RED} roughness={.3} clearcoat={.35} clearcoatRoughness={.3} />
  </mesh>;
}
function Arm({ side }: { side: number }) {
  return <group scale={[side, 1, 1]}>
    <Muscle position={[.98, .54, 0]} scale={[.61, .57, .57]} rotation={-.2} />
    <Muscle position={[1.46, .23, 0]} scale={[.68, .46, .46]} rotation={-.25} />
    <Muscle position={[1.57, .51, .13]} scale={[.54, .59, .48]} rotation={-.5} />
    <Muscle position={[1.92, .28, -.02]} scale={[.43, .45, .43]} />
    <Muscle position={[2.03, .81, -.02]} scale={[.35, .75, .35]} rotation={.16} />
    <Muscle position={[1.96, 1.23, 0]} scale={[.27, .5, .29]} rotation={.3} />
    <group position={[1.77, 1.66, .02]} rotation-z={.38}>
      <RoundedBox args={[.64, .58, .55]} radius={.16} smoothness={6} castShadow><meshPhysicalMaterial color={RED} roughness={.32} clearcoat={.25} /></RoundedBox>
      {[0, 1, 2, 3].map(i => <Muscle key={i} position={[-.22 + i * .145, -.12, .24]} scale={[.105, .17, .13]} />)}
      <Muscle position={[-.23, -.26, .08]} scale={[.19, .24, .19]} rotation={-.5} />
    </group>
  </group>;
}
function Toy({ growth, tick, tiny, reducedMotion }: Props) {
  const whole = useRef<THREE.Group>(null);
  const arms = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const pulse = useRef(0);
  useEffect(() => { if (tick) pulse.current = 1; }, [tick]);
  useFrame((_, dt) => {
    const factor = reducedMotion ? 1 : 1 - Math.exp(-11 * Math.min(dt, .05));
    pulse.current = Math.max(0, pulse.current - dt * 4.5);
    const bump = reducedMotion ? 0 : Math.sin(pulse.current * Math.PI);
    const target = tiny ? .38 : .62 + growth * .6;
    if (whole.current) {
      whole.current.scale.setScalar(THREE.MathUtils.lerp(whole.current.scale.x, target, factor));
      whole.current.position.y = -1.34 + .47 * whole.current.scale.x;
      whole.current.rotation.z = bump * .025 * (tick % 2 ? 1 : -1);
    }
    if (arms.current) {
      const size = Math.max(0, (growth - .12) / .88);
      const value = THREE.MathUtils.lerp(arms.current.scale.x, size, factor);
      arms.current.scale.setScalar(value);
      arms.current.visible = value > .015;
      arms.current.rotation.z = bump * .025;
    }
    if (body.current) body.current.scale.y = 1 + growth * .6;
    if (cap.current) cap.current.position.y = growth * .29 - bump * .16;
  });
  return <group ref={whole} scale={.62} position={[0, -.75, 0]} rotation-y={-.12}>
    <mesh position={[0, -.3, 0]} castShadow receiveShadow><cylinderGeometry args={[.94, .96, .34, 72]} /><meshPhysicalMaterial color="#bba7ea" roughness={.32} clearcoat={.3} /></mesh>
    <mesh position={[0, -.11, 0]} rotation-x={-Math.PI / 2}><torusGeometry args={[.79, .045, 16, 72]} /><meshStandardMaterial color="#69518c" metalness={.5} roughness={.32} /></mesh>
    {[-.7, .7].map(x => <group key={x} position={[x, -.3, .65]} rotation-y={x * .65}>
      <mesh><sphereGeometry args={[.066, 20, 16]} /><meshStandardMaterial color="#a49e91" metalness={.8} roughness={.28} /></mesh>
      <mesh position={[0, 0, .064]} rotation-z={.35}><boxGeometry args={[.08, .012, .008]} /><meshStandardMaterial color="#514c44" /></mesh>
    </group>)}
    <mesh ref={body} position={[0, .12, 0]} castShadow><cylinderGeometry args={[.78, .85, .5, 64]} /><meshPhysicalMaterial color={RED} roughness={.3} clearcoat={.35} /></mesh>
    <group ref={arms} scale={0}><Arm side={-1} /><Arm side={1} /></group>
    <group ref={cap}>
      <mesh position={[0, .43, 0]} castShadow><cylinderGeometry args={[.62, .65, .27, 64]} /><meshPhysicalMaterial color={RED} roughness={.27} clearcoat={.4} /></mesh>
      <mesh position={[0, .57, 0]} scale={[1, .12, 1]} castShadow><sphereGeometry args={[.62, 48, 32]} /><meshPhysicalMaterial color={RED} roughness={.27} clearcoat={.4} /></mesh>
      <mesh position={[0, .3, 0]} rotation-x={-Math.PI / 2}><torusGeometry args={[.65, .025, 16, 64]} /><meshStandardMaterial color="#7e342a" roughness={.6} /></mesh>
    </group>
  </group>;
}
export default function SwoleToy(props: Props) {
  return <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 2.4, 9.8], fov: 39 }} gl={{ antialias: true, alpha: true }} fallback={<div className="toy-fallback"><span /></div>}>
    <ambientLight intensity={1.3} />
    <hemisphereLight args={["#fff9ec", "#b3a18c", 1.2]} />
    <directionalLight position={[-3, 7, 5]} intensity={3.5} castShadow shadow-mapSize={[1024, 1024]} />
    <directionalLight position={[4, 3, -2]} intensity={2} color="#fff1dc" />
    <Toy {...props} />
    <ContactShadows position={[0, -1.34, 0]} opacity={.28} scale={12} blur={2.8} far={5} resolution={256} color="#6c5540" />
  </Canvas>;
}
