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
      camera={{ position: [0, 3.6, 6.2], fov: 42 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#e9eadd"]} />
      <fog attach="fog" args={["#e9eadd", 9, 22]} />
      <Suspense fallback={null}>
        <Studio />
        <ClickerModel config={config} pressTick={pressTick} onPress={onPress} />
      </Suspense>
    </Canvas>
  );
};

export default ClickerCanvas;
