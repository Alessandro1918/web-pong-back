type Message = {                                  //object; each event ("spawn", "move") will send a different message with different obj keys
  action: string,       //"spawn", "move"
  playerId?: string,    //"P1", "P2"
  playerPos?: number    //42
}  
type Subscriber = (message: Message) => void;     //function with 1 param (the message) and no return

//Class with the methods to:
//1. subscribe channel (listen to messages) and 
//2. publish to a websocket connection (send messages)  
class PlayerPubSub {
  
  //Array of channel IDs (1) and connections listening for it's messages (2)
  private channels: Record<string, Subscriber[]> = {};

  //Method used by the Websocket connection route;
  //Used by a connection that wants to listen to this channel's messages:
  subscribe(gameId: string, subscriber: Subscriber) {
    
    //If no one was listening to this channel's messages, init array
    if (!this.channels[gameId]) {
      this.channels[gameId] = [];
    }

    this.channels[gameId].push(subscriber);
  }

  //Method used by the HTTP POST route;
  //Used by a connection that wants to send a new message:
  publish(gameId: string, message: Message) {
    if (!this.channels[gameId]) {
      return;
    }

    for (const subscriber of this.channels[gameId]) {
      subscriber(message)
    }
  }

  //Method used by the HTTP POST 'spawn' route;
  //If player entered in new game, return "P1" (Player 1). Else, they are "P2".
  getPlayerId(gameId: string) {
    if (this.channels[gameId].length == 1)  {
      return "P1"
    } else {
      return "P2  "
    }
  }
}

export const player = new PlayerPubSub();