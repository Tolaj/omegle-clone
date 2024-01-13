// ExampleComponent.js
import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';
import { useSocket } from './SocketContext';

const ExampleComponent = () => {
  const socket = useSocket();
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerRef = useRef(null);

  useEffect(() => {
    if (socket) {
      // Handle incoming messages
      socket.on('message', (data) => {
        console.log('Received message:', data);
        // Handle the message as needed
      });

      // Handle signaling data
      socket.on('signal', (data) => {
        if (peerRef.current) {
          peerRef.current.signal(data.signal);
        }
      });
    }

    return () => {
      // Cleanup resources on component unmount
      if (peerRef.current) {
        // Check if the peer exists before attempting to destroy it
        peerRef.current.destroy();
        peerRef.current = null; // Clear the reference
      }
    };
  }, [socket]);

  const handleJoinRoom = () => {
    // Create a new peer connection
    const peer = new Peer({
      initiator: true,
      trickle: false,
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Display local stream
        localVideoRef.current.srcObject = stream;
        peer.addStream(stream);

        // Send signaling data to the other peer
        peer.on('signal', (data) => {
          socket.emit('signal', { target: 'PC2', signal: data });
        });

        // Receive signaling data from the other peer
        socket.on('signal', (data) => {
          if (peerRef.current) {
            peerRef.current.signal(data.signal);
          }
        });

        // Display remote stream
        peer.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });

        // Set the peer reference for cleanup on component unmount
        peerRef.current = peer;
      })
      .catch((error) => console.error('Error accessing media devices:', error));
  };

  const handleSendMessage = () => {
    socket.emit('sendMessage', { roomId, message, username });
    setMessage('');
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleJoinRoom}>Join Room</button>

        <input type="text" placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      <div>
        <video ref={localVideoRef} autoPlay playsInline muted />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </>
  );
};

export default ExampleComponent;
