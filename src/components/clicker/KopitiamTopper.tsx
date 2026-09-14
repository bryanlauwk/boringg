import * as THREE from "three";
import { TopperId } from "@/lib/clickerPresets";

interface Props {
  topper: TopperId;
  keycapColor: string;
  profile: "flat" | "domed" | "dish";
}

const Ceramic = ({ color = "#eee7d9" }: { color?: string }) => (
  <meshStandardMaterial color={color} roughness={0.28} metalness={0.04} />
);

const ClassicTopper = ({ keycapColor, profile }: Pick<Props, "keycapColor" | "profile">) => (
  <>
    <mesh position={[0, 0.66, 0]} castShadow>
      <cylinderGeometry
        args={[profile === "dish" ? 0.94 : 0.88, 0.86, profile === "flat" ? 0.26 : 0.34, 64]}
      />
      <meshStandardMaterial color={keycapColor} roughness={0.42} metalness={0.05} />
    </mesh>
    {profile === "domed" && (
      <mesh position={[0, 0.8, 0]} castShadow scale={[1, 0.42, 1]}>
        <sphereGeometry args={[0.88, 48, 24]} />
        <meshStandardMaterial color={keycapColor} roughness={0.4} metalness={0.05} />
      </mesh>
    )}
    {profile === "dish" && (
      <mesh position={[0, 0.84, 0]} scale={[1, 0.35, 1]}>
        <sphereGeometry args={[0.78, 48, 24]} />
        <meshStandardMaterial color={keycapColor} roughness={0.55} metalness={0.05} side={THREE.BackSide} />
      </mesh>
    )}
  </>
);

const KayaToast = () => (
  <group position={[0, 0.73, 0]} rotation-y={-0.18}>
    <mesh position={[0, -0.13, 0]} scale={[1.38, 0.2, 1.05]} castShadow>
      <boxGeometry />
      <meshStandardMaterial color="#4f6b31" roughness={0.72} />
    </mesh>
    {[-0.27, 0.27].map((x) => (
      <group key={x} position={[x, 0.02, 0]} rotation-y={x * 0.13}>
        <mesh scale={[0.6, 0.27, 1.02]} castShadow>
          <boxGeometry />
          <meshStandardMaterial color="#d69b48" roughness={0.82} />
        </mesh>
        <mesh position={[0, 0.145, 0]} scale={[0.48, 0.04, 0.82]} castShadow>
          <boxGeometry />
          <meshStandardMaterial color="#f5d77e" roughness={0.55} />
        </mesh>
      </group>
    ))}
    <mesh position={[0.16, 0.23, -0.03]} rotation-y={-0.18} scale={[0.45, 0.06, 0.32]} castShadow>
      <boxGeometry />
      <meshStandardMaterial color="#f7e6a5" roughness={0.38} />
    </mesh>
  </group>
);

const KopiCup = () => (
  <group position={[0, 0.58, 0]}>
    <mesh position={[0, 0, 0]} scale={[1, 0.18, 0.78]} castShadow>
      <cylinderGeometry args={[0.9, 0.94, 0.18, 48]} />
      <Ceramic />
    </mesh>
    <mesh position={[0, 0.38, 0]} castShadow>
      <cylinderGeometry args={[0.65, 0.52, 0.72, 48, 1, true]} />
      <Ceramic color="#f3eee4" />
    </mesh>
    <mesh position={[0, 0.75, 0]} rotation-x={-Math.PI / 2}>
      <circleGeometry args={[0.61, 48]} />
      <meshStandardMaterial color="#3a1c0e" roughness={0.35} />
    </mesh>
    <mesh position={[0.63, 0.43, 0]} rotation-y={Math.PI / 2} castShadow>
      <torusGeometry args={[0.27, 0.075, 16, 32]} />
      <Ceramic color="#f3eee4" />
    </mesh>
  </group>
);

const Eggs = () => (
  <group position={[0, 0.59, 0]}>
    <mesh scale={[1.28, 0.16, 0.94]} castShadow>
      <cylinderGeometry args={[0.82, 0.88, 0.18, 48]} />
      <Ceramic />
    </mesh>
    {[-0.38, 0.38].map((x, index) => (
      <group key={x} position={[x, 0.18, index ? 0.06 : -0.04]}>
        <mesh scale={[0.62, 0.13, 0.68]} castShadow>
          <sphereGeometry args={[0.62, 32, 18]} />
          <meshStandardMaterial color="#f5efe0" roughness={0.52} />
        </mesh>
        <mesh position={[0, 0.09, 0]} scale={[0.34, 0.13, 0.34]} castShadow>
          <sphereGeometry args={[0.52, 24, 16]} />
          <meshStandardMaterial color="#e99b23" roughness={0.34} />
        </mesh>
      </group>
    ))}
    {[-0.5, -0.2, 0.12, 0.48].map((x, index) => (
      <mesh key={x} position={[x, 0.34, index % 2 ? 0.1 : -0.15]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.018, 0.018, 0.025, 8]} />
        <meshStandardMaterial color="#342619" roughness={1} />
      </mesh>
    ))}
  </group>
);

const SoyPepper = () => (
  <group position={[0, 0.58, 0]}>
    <mesh scale={[1.25, 0.18, 0.95]} castShadow>
      <cylinderGeometry args={[0.82, 0.9, 0.18, 48]} />
      <Ceramic color="#e8dfce" />
    </mesh>
    <mesh position={[0, 0.11, 0]} rotation-x={-Math.PI / 2} scale={[1.05, 0.78, 1]}>
      <circleGeometry args={[0.72, 48]} />
      <meshStandardMaterial color="#35180e" roughness={0.25} />
    </mesh>
    {[-0.38, -0.12, 0.18, 0.42].map((x, index) => (
      <mesh key={x} position={[x, 0.16, index % 2 ? 0.2 : -0.12]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.025, 0.025, 0.025, 8]} />
        <meshStandardMaterial color="#d8c4a1" roughness={1} />
      </mesh>
    ))}
  </group>
);

const KopitiamTopper = ({ topper, keycapColor, profile }: Props) => {
  if (topper === "kaya-toast") return <KayaToast />;
  if (topper === "kopi") return <KopiCup />;
  if (topper === "eggs") return <Eggs />;
  if (topper === "soy-pepper") return <SoyPepper />;
  return <ClassicTopper keycapColor={keycapColor} profile={profile} />;
};

export default KopitiamTopper;