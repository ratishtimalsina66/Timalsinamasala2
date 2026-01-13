// Simple Express backend for orders (development/demo)
// - Serves static files from ./public
// - POST /api/orders to accept an order JSON and persist to orders.json (append in memory and file)
// - GET  /api/orders/:id to retrieve an order
// NOTE: This is a small demo server not intended for production use.

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'orders.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load existing orders (file may not exist)
let orders = [];
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    orders = JSON.parse(raw || '[]');
  }
} catch (e) {
  console.warn('Could not read orders.json, starting with empty orders.');
  orders = [];
}

function persistOrders() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write orders.json', e);
  }
}

app.post('/api/orders', (req, res) => {
  const order = req.body;
  if (!order || !Array.isArray(order.items) || !order.customer) {
    return res.status(400).json({ error: 'Invalid order payload' });
  }
  // If the client provided an id, keep it; otherwise generate server id.
  const id = order.id && String(order.id).startsWith('ORD-') ? order.id : 'ORD-SRV-' + Date.now();
  const finalOrder = Object.assign({}, order, { id });
  finalOrder.received_at = new Date().toISOString();
  orders.push(finalOrder);
  persistOrders();
  res.json({ success: true, id });
});

app.get('/api/orders/:id', (req, res) => {
  const id = req.params.id;
  const found = orders.find(o => o.id === id);
  if (!found) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(found);
});

app.listen(PORT, () => {
  console.log(`Order API server running on http://localhost:${PORT}`);
  console.log('Serving static files from /public');
});