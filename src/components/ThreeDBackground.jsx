import React from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';


const ThreeDBackground = () => (
    <div className="three-bg">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
        />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );

  export default ThreeDBackground;