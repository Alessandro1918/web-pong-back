import fastify from "fastify"
import websocket from "@fastify/websocket"
import { game } from "./routes/game"
import { move } from "./routes/move"

const PORT = 4000

const app = fastify()

//websockets
app.register(websocket)

//routes
app.register(game)
app.register(move)

app
  .listen({port: PORT})
  .then(() => {console.log(`Server running on http://localhost:${PORT}`)})