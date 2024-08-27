import React from "react";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import { Player, Ui, DefaultUi, DefaultControls, Video } from "@vime/react";

function VideoPlayer({ src }) {
  return (
    <Player>
      <Video>
        <source data-src={src} type="video/mp4" />
      </Video>

      <DefaultUi noControls>
        <DefaultControls hideOnMouseLeave activeDuration={2000} />
      </DefaultUi>
    </Player>
  );
}

export default VideoPlayer;
