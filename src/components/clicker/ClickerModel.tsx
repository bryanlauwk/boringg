import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ClickerConfig } from "@/hooks/useClickerConfig";
import { FINISHES, weightRatio } from "@/lib/clickerPresets";

interface Props {
  config: ClickerConfig;
  pressTick: number;
  onPress: () => void;
}

const ClickerModel = ({ config, pressTick, onPress }: Props) => {
  const group = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const held = useRef(false);
  const shock = useRef(1.6);
  const [hovered, setHovered] = useState(false);

  const finish = useMemo(
    () => FINISHES.find((f) => f.id === config.finish) ?? FINISHES[0],
    [config.finish],
  );
  const r = weightRatio(config.weight);
  const travel = 0.1 + r * 0.09;
  const stiffness = 26 - r * 12;

  useEffect(() => {
    if (pressTick > 0) shock.current = 0;
  }, [pressTick]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;

    const { x, y } = state.pointer;
    const targetRotY = x * 0.4;
    const targetRotX = -y * 0.28;
    const targetLift = hovered ? 0.08 : 0;
    const k = 1 - Math.exp(-6 * dt);

    g.rotation.y += (targetRotY - g.rotation.y) * k;
    g.rotation.x += (targetRotX - g.rotation.x) * k;
    g.position.y += (targetLift - g.position.y) * k;

    if (cap.current) {
      const target = held.current || shock.current < 0.22 ? -travel : 0;
      const ck = 1 - Math.exp(-stiffness * dt);
      cap.current.position.y += (target - cap.current.position.y) * ck;
    }

    // shockwave ring
    shock.current = Math.min(1.6, shock.current + dt * 2.2);
    if (ring.current) {
      const t = shock.current;
      const scale = 0.9 + t * 1.9;
      ring.current.scale.set(scale, scale, scale);
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, (1 - t / 1.6) * (0.35 + r * 0.35));
    }

    // impact shake
    const shake = Math.max(0, 1 - shock.current / 0.35) * (0.02 + r * 0.05);
    state.camera.position.x = Math.sin(shock.current * 55) * shake;
    state.camera.position.y = 3.6 + Math.cos(shock.current * 55) * shake;
    state.camera.lookAt(0, 0, 0);
  });

  const down = () => {
    held.current = true;
    onPress();
  };
  const up = () => {
    held.current = false;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.repeat) return;
      if (e.target instanceof HTMLElement && e.target.closest("button, input, textarea, select, [role='slider'], [role='switch'], [contenteditable='true']")) return;
      e.preventDefault();
      down();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") up();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  });

  const shellProps = {
    color: finish.color,
    metalness: finish.metalness,
    roughness: finish.roughness,
    ...(finish.transmission
      ? { transmission: finish.transmission, thickness: 0.8, transparent: true, opacity: 0.85 }
      : {}),
  };

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        up();
      }}
      onPointerDown={down}
      onPointerUp={up}
    >
      {/* base plate */}
      <mesh position={[0, -0.95, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.45, 0.14, 64]} />
        <meshPhysicalMaterial {...shellProps} />
      </mesh>

      {/* body shell */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.12, 1.32, 1.36, 64]} />
        <meshPhysicalMaterial {...shellProps} />
      </mesh>

      {/* collar ring */}
      <mesh position={[0, 0.46, 0]} rotation-x={-Math.PI / 2} castShadow>
        <torusGeometry args={[1.06, 0.09, 24, 72]} />
        <meshStandardMaterial color="#897e64" metalness={0.25} roughness={0.55} />
      </mesh>

      {/* switch stem housing */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.92, 1.02, 0.22, 48]} />
        <meshStandardMaterial color="#232629" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* keycap */}
      <group ref={cap} position={[0, 0, 0]}>
        <mesh position={[0, 0.66, 0]} castShadow>
          <cylinderGeometry
            args={[
              config.profile === "dish" ? 0.94 : 0.88,
              0.86,
              config.profile === "flat" ? 0.26 : 0.34,
              64,
            ]}
          />
          <meshStandardMaterial color={config.keycap} roughness={0.42} metalness={0.05} />
        </mesh>

        {config.profile === "domed" && (
          <mesh position={[0, 0.8, 0]} castShadow scale={[1, 0.42, 1]}>
            <sphereGeometry args={[0.88, 48, 24]} />
            <meshStandardMaterial color={config.keycap} roughness={0.4} metalness={0.05} />
          </mesh>
        )}

        {config.profile === "dish" && (
          <mesh position={[0, 0.84, 0]} scale={[1, 0.35, 1]}>
            <sphereGeometry args={[0.78, 48, 24]} />
            <meshStandardMaterial
              color={config.keycap}
              roughness={0.55}
              metalness={0.05}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </group>

      {/* shockwave */}
      <mesh ref={ring} position={[0, -0.86, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.4, 1.55, 64]} />
        <meshBasicMaterial
          color={config.glow ? config.glowColor : "#b3b99a"}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* underglow */}
      {config.glow && (
        <>
          <pointLight position={[0, -0.8, 0]} intensity={9} distance={5} color={config.glowColor} />
          <mesh position={[0, -0.86, 0]} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[1.32, 1.6, 64]} />
            <meshBasicMaterial
              color={config.glowColor}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

export default ClickerModel;
