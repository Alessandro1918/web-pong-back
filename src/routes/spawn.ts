import { FastifyInstance } from "fastify"
import { z } from "zod"
import { player } from "../utils/player-pub-sub"

//User will call this route when entering the match.
//Will get (and return to the front) the playerId ("P1", "P2")
export async function spawn(app: FastifyInstance) {
  app.post("/game/:gameId/spawn", async (request, reply) => {

    const reqParams = z.object({
      gameId: z.string(),                         //"1234"
    })
    const { gameId } = reqParams.parse(request.params)

    const playerId = player.getPlayerId(gameId)   //"P1"

    player.publish(
      gameId, 
      {
        action: "spawn",
        playerId
      }
    )

    return reply
      .status(200)
      .send({playerId})
  })
}