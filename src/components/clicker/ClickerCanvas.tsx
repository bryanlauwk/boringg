import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Studio from "./Studio";
import ClickerModel from "./ClickerModel";
import { ClickerConfig } from "@/hooks/useClickerConfig";

interface Props {
  config: ClickerConfig;
  pressTick: number;
  onPress: () => void;
}

const ClickerCanvas = ({ config, pressTick, onPress }: Props) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.25, 6], fov: 40 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#ef6c69"]} />
      <fog attach="fog" args={["#ef6c69", 10, 24]} />
      <Suspense fallback={null}>
        <Studio />
        <ClickerModel config={config} pressTick={pressTick} onPress={onPress} />
      </Suspense>
    </Canvas>
  );
};

export default ClickerCanvas;
