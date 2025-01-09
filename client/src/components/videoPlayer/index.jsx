// This component create a React video player
// and defines custom controls
// Note that 90% this page is NOT required
// You can copy paste the react video player component
// and add a controls attriubte to get default controls

// React methods
import React, { useCallback, useEffect, useRef, useState } from "react";

//Third-party UI components
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

// React player
import ReactPlayer from "react-player";

function VideoPlayer({ width = "100%", height = "100%", url }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // references
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // methods
  const playAndPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleRewind = () => {
    playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 5);
  };

  const handleForward = () => {
    playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 5);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleSeekChange = (newValue) => {
    setPlayed(newValue[0]);
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef?.current?.seekTo(played);
  };

  const handleVolumeChange = (newValue) => {
    setVolume(newValue[0]);
  };

  const pad = (str) => {
    return ("0" + str).slice(-2);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());

    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }

    return `${mm}:${ss}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef?.current.requestFullscreen) {
        playerContainerRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullScreen]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out
      ${isFullScreen ? "w-screen h-screen" : ""}`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        className=" absolute top-0 left-0"
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        // controls // Uncomment to have react player default controls
      />
      {/*custom controls - comment if using react player default controls */}
      {showControls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={(value) => handleSeekChange([value[0] / 100])}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between space-x-2 w-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={playAndPause}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRewind}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleForward}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                <RotateCw className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleMute}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                {muted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                className="w-24"
                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-white">
                {formatTime(played * (playerRef?.current?.getDuration() || 0))}/
                {formatTime(playerRef?.current?.getDuration() || 0)}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullScreen}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                {isFullScreen ? (
                  <Minimize className="h-6 w-6 " />
                ) : (
                  <Maximize className="h-6 w-6 " />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
