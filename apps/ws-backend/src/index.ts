import "dotenv/config";
import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT);

console.log(PORT)

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", function (ws) {
  ws.on("message", function (data) {
    console.log(data);
  });
});
