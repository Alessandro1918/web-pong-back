import { FastifyInstance } from "fastify";
import { player } from "../utils/player-pub-sub";
import { z } from "zod";

//Will listen (and react) to every message sent by the user ("spawn", "move", etc.)
export async function game(app: FastifyInstance) {
  app.get('/game/:gameId', { websocket: true }, (socket, request) => {
    
    const reqParams = z.object({
      gameId: z.string(),   //"1234"
    })
    const { gameId } = reqParams.parse(request.params)

    //Listen to different player events ("spawn", "move", etc.)
    player.subscribe(gameId, (message) => {
      socket.send(JSON.stringify(message))
    })
  })
}