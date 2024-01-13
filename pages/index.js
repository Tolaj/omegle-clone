import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

const Home = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peer1, setPeer1] = useState(null);
  const [peer2, setPeer2] = useState(null);

  useEffect(() => {
    const initPeers = () => {
      const newPeer1 = new Peer({ initiator: true });
      const newPeer2 = new Peer();

      setPeer1(newPeer1);
      setPeer2(newPeer2);

      newPeer1.on('signal', data => {
        newPeer2.signal(data);
      });

      newPeer2.on('signal', data => {
        newPeer1.signal(data);
      });

      newPeer2.on('stream', stream => {
        if (remoteVideoRef.current) {
          if ('srcObject' in remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          } else {
            remoteVideoRef.current.src = window.URL.createObjectURL(stream); // for older browsers
          }
          remoteVideoRef.current.play();
        }
      });
    };

    if (!peer1 || !peer2) {
      initPeers();
    }

    return () => {
      if (peer1) {
        peer1.destroy();
      }
      if (peer2) {
        peer2.destroy();
      }
    };
  }, [peer1, peer2]);

  const addMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (peer1) {
        peer1.addStream(stream);
        if (localVideoRef.current) {
          if ('srcObject' in localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          } else {
            localVideoRef.current.src = window.URL.createObjectURL(stream); // for older browsers
          }
          localVideoRef.current.play();
        }
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Your Video</h2>
        <video ref={localVideoRef} width="400" height="300" />
      </div>
      <div>
        <h2>Remote Video</h2>
        <video ref={remoteVideoRef} width="400" height="300" />
      </div>
      <div>
        <button onClick={addMedia}>Get Media</button>
      </div>
    </div>
  );
};

export default Home;
