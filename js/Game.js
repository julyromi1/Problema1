class Game {
  constructor() {
    this.resetTitle = createElement ("h2");
    this.resetButton = createButton ("");
    this.leaderBoardTitle = createElement ("h2");
    this.leader1 = createElement ("h2");
    this.leader2 = createElement ("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html ("resetGame");
    this.resetTitle.class ("resetText"); //Es el tipo de clase de boton  que va a ser
    this.resetTitle.position (width/2+200,40);
    this.resetButton.class ("resetButton");
    this.resetButton.position (width/2+230,100);
    this.leaderBoardTitle.html ("Puntacion");
    this.leaderBoardTitle.class ("resetText");
    this.leaderBoardTtiel.position (width/3-60,40);
    this.leader1.class ("leadersText");
    this.leader1.position (width/3-50,80);
    this.leader2.class ("leadersText");
    this.leader2.position (width/3-50,130);
  }

  play() {
    this.handleElements();
    this.handleResetBotton ();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showLeaderBoard ();

      //Índice de la matriz
      var index = 0;   //El index identifica a los jugadores por medio de valores que el interponga 
      for (var plr in allPlayers) {
        //agrega 1 al índice para cada bucle
        index = index + 1;

        //utilizar datos de la base de datos para mostrar los autos en las direcciones x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index == player.index){
          fill ("#79CFFA");
          ellipse (x,y,60,60);
          stroke (8);
          camera.position.x=cars[index - 1].position.x;
          camera.position.y=cars[index - 1].position.y;
        }
    
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    // manejar eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
