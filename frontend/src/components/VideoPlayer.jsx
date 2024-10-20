import React, { useState } from "react";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import Hls from "hls.js";

import { MediaPlayer, MediaProvider, isHLSProvider, Poster } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

function VideoPlayer({ src, thumbnail, title, duration, autoPlay = true }) {
  const [isPlaying, setIsPlaying] = useState(false);

  function onProviderChange(provider) {
    if (isHLSProvider(provider)) {
      provider.library = Hls;
    }
  }

  // When the video starts playing, hide the poster
  function handlePlay() {
    setIsPlaying(true);
  }

  return (
    <MediaPlayer
      title={title}
      src={src}
      autoPlay={autoPlay}
      playsInline
      load="eager"
      posterLoad="eager"
      crossOrigin
      storage={`video-player-settings-${title}`}
      onProviderChange={onProviderChange}
      onPlay={handlePlay} // Event listener for play
      duration={duration}
      streamType="on-demand"
      className="w-full h-full"
    >
      <MediaProvider />
      {/* Show the poster only if the video is not playing yet */}
      {!isPlaying && <Poster className="vds-poster" src={thumbnail} alt={title} />}
      <PlyrLayout thumbnails={thumbnail} icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}

export default VideoPlayer;
