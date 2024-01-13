// pages/api/signal.js

import { simplePeerSignal } from '../../utils/signaling'; // Create this utility function

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { signalData } = req.body;

    // Broadcast the signal to all connected clients (for simplicity)
    simplePeerSignal(signalData);

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (req.method === 'GET') {
    
    const responseData = localStorage.getItem('signalDataPC1')

    res.status(200).json(responseData);
}


}
