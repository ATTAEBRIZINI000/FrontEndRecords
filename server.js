import { createServer } from 'cors-anywhere';

const PORT = process.env.PORT || 8082;

createServer({
  originWhitelist: [], // Allow all origins
}).listen(PORT, () => {
  console.log(`CORS Anywhere server running on port ${PORT}`);
});
