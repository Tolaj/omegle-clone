// utils/signaling.js

let connectedPeers = [];

export const simplePeerSignal = (signalData) => {
  connectedPeers.forEach((peer) => {
    // Send the signal to each connected peer
    // For simplicity, you might use WebSocket or another method here
    peer(signalData);
  });
};

export const addPeer = (peer) => {
  connectedPeers.push(peer);
};

export const removePeer = (peer) => {
  connectedPeers = connectedPeers.filter((p) => p !== peer);
};
