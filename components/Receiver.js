// components/Receiver.js

import { useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { addPeer, removePeer, simplePeerSignal } from '../utils/signaling';

const Receiver = () => {
  const peerRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const peer = new Peer({ trickle: false, stream });

        // Handle signal data received from the signaling server
        fetch('/api/data', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers as needed
            },
          })
            .then(response => {
              // Check if the response status is OK (status code 200-299)
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              
              // Parse the response JSON
              return response.json();
            })
            .then(data => {
              // Handle the data from the response
              console.log('Data:', data);
            })
            .catch(error => {
              // Handle errors
              console.error('Error:', error.message);
            });
        peer.signal(localStorage.getItem('signalDataPC1'));

        // Add the peer to the connected peers list
        peer.on('signal', data => {
            localStorage.setItem('signalDataPC2', data);
        })
        peer.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
        });

        peerRef.current = peer;
      })
      .catch((error) => console.error('Error accessing media devices:', error));
  }, []);

  return (
    <div>
      <video  ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default Receiver;
