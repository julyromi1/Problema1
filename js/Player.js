class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0; 
    this.score = 0;
   }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank:this.rank,
      score:this.score
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank:this.rank,
      score:this.score
    });
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  getDistance (){
    var playerDistanceRef= database.ref ("players/player"+this.index);
    playerDistanceRef.on("value",data =>{
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    })
  }

  showLeaderBoard (){
    let leader1;
    let leader2;
    let players = Object.values(allPlayers);
    if  (players [0].rank == 0 && players [1].rank == 0 || players [0].rank == 1) {
      leader1 = players [0].rank + "&emsp;" + players [0]. name + "&emsp;" + player [0].score;   //"&emsp" es una etiqueta para añadir 4 espacios (cuatro pixeles) es como un espacio cuando escribes no escribes Yosoyjulianna escribes Yo (4 espacios) soy (cuatro espacios) julianna.
      leader2 = players [1].rank + "&emsp;" + players [1]. name + "&emsp:" + player [1].score;
    }
    this.leader1.html (leader1);
    this.leader2.html (leader2);
   }
}

