import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import VideoPlayer from './VideoPlayer'
import videojs from 'video.js'
function App() {
const playerRef = useRef(null);
//can get url from db

const videoLink = "http://localhost:8080/uploads/courses/b0bfbfda-f199-47a0-b9f1-82bbd8e1ec59/index.m3u8"
const videoPlayerOptions={
  controls: true,
  responsive:true,
  fluid:true,
  sources:[
    {
      src:videoLink,
      type:"application/x-mpegURL"
    }
  ]
}
const handlePlayerReady = (player) => {
  playerRef.current = player;

  // You can handle player events here, for example:
  player.on('waiting', () => {
    videojs.log('player is waiting');
  });

  player.on('dispose', () => {
    videojs.log('player will dispose');
  });
};
  return (
   <>
   <VideoPlayer 
   options={videoPlayerOptions}
   onReady={handlePlayerReady}
   />
   </>
  )
}

export default App
