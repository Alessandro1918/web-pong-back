import { FastifyInstance } from "fastify";
import { moving } from "../utils/moving-pub-sub";
import { z } from "zod";

//Will listen (and react) to every message sent by the user (move, left game, etc.)
export async function game(app: FastifyInstance) {
  app.get('/game/:gameId', { websocket: true }, (socket, request) => {
    
    const reqParams = z.object({
      gameId: z.string(),   //"1234"
    })
    const { gameId } = reqParams.parse(request.params)

    //Listen to "move" events
    moving.subscribe(gameId, (message) => {
      socket.send(JSON.stringify(message))
    })
  })
}