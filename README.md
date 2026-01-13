```markdown
# Timalsina Masala — Local dev instructions

This repo contains a static storefront (index.html, shop.html, checkout.html, order.html, style.css) and a small demo backend (server.js) that accepts orders.

Quick start (static-only)
1. Put the files (index.html, shop.html, checkout.html, order.html, style.css) in a folder.
2. Add images to `images/` (see product image names in shop.html: images/jeera.jpg, images/chilli.jpg, images/haldi.jpg, images/garam.jpg).
3. Run a static server:
   - Python: `python -m http.server 8000`
   - Or use VSCode Live Server
4. Open `http://localhost:8000/shop.html` and test adding items, checkout, and order confirmation.

Quick start (with demo backend)
1. Ensure Node.js is installed (14+).
2. Put static files into a `public/` directory (so server serves them as static files).
   - Example layout:
     - project/
       - server.js
       - package.json
       - orders.json (optional)
       - public/
         - index.html
         - shop.html
         - checkout.html
         - order.html
         - style.css
         - images/
           - jeera.jpg
           - chilli.jpg
           - haldi.jpg
           - garam.jpg
3. Install dependencies:
   - `npm install`
4. Start the server:
   - `npm start`
   - or during development: `npm run dev` (requires nodemon)
5. Open `http://localhost:3000/shop.html` to test the full flow. Checkout will attempt to POST orders to `/api/orders` and the server will persist them to `orders.json`.

API
- POST /api/orders
  - Body: JSON order object (the checkout page will POST the same structure it saves to localStorage)
  - Returns: { success: true, id: "ORD-SRV-..." }
- GET /api/orders/:id
  - Returns the order object previously saved.

Notes
- This backend is a minimal development demo, not production-ready.
- For production you should add authentication, validation, and secure payment integrations (Khalti/eSewa/Stripe).
- If you want, I can next:
  - Add simple server-side validation and email sending (development-only).
  - Add user accounts and order history (requires a database).
  - Deploy the backend to a cloud service (Heroku, Render, or Vercel with serverless functions).
```# Timalsinamasala2
