import { FastifyInstance } from "fastify"
import { z } from "zod"
import { player } from "../utils/player-pub-sub"

//User will call this route every 1s, sending it's current position
export async function move(app: FastifyInstance) {
  app.post("/game/:gameId/move", async (request, reply) => {

    const reqParams = z.object({
      gameId: z.string(),         //"1234"
    })
    const reqBody = z.object({
      playerId: z.string(),       //"P1"
      playerPos: z.number()       //42

    })
    const { gameId } = reqParams.parse(request.params)
    const { playerId, playerPos } = reqBody.parse(request.body)

    player.publish(
      gameId, 
      {
        action: "move",
        playerId,
        playerPos
      }
    )

    return reply
      .status(200)
      .send()
  })
}