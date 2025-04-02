import React from "react";

import { Player } from '@lottiefiles/react-lottie-player';

const Loader = () => (
    <div className="loader-container">
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/packages/lf20_usmfx6bp.json"
        style={{ width: '300px' }}
      />
    </div>
  );

export default Loader;