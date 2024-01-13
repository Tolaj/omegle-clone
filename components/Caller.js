// components/Caller.js

import { useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { addPeer, removePeer, simplePeerSignal } from '../utils/signaling';

const Caller = () => {
  const peerRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
          
            
          localStorage.setItem('signalDataPC1', data);

          // Add the peer to the connected peers list
          remoteVideoRef.current.srcObject = stream;

        });

        // peer.signal(localStorage.getItem('signalDataPC2'));


        // peer.on('stream', (remoteStream) => {
        //   remoteVideoRef.current.srcObject = remoteStream;
        // });

        peerRef.current = peer;
      })
      .catch((error) => console.error('Error accessing media devices:', error));
  }, []);

  return (
    <div>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default Caller;
