import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function game(app: FastifyInstance) {
  app.get('/game/:gameId', { websocket: true }, (socket, request) => {
    
    const reqParams = z.object({
      gameId: z.string(),
    })
    const { gameId } = reqParams.parse(request.params)

  })
}