import React from "react";
import { motion, useScroll } from "framer-motion";


const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    
    return (
      <motion.div
        className="progress-bar"
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: '#64ffda',
          transformOrigin: '0%',
          zIndex: 1000
        }}
      />
    );
  };

  export default ScrollProgress;
