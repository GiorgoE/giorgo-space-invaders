  
  
  
  var levelData = { 
     1:  [
	      [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
	      [4,4,1,1,5,5,0,0,0,0],
		  [4,4,1,1,5,5,0,0,0,0],
		  [4,4,1,1,5,5,0,0,0,0],
		  		  ],
	 2:  [
	     [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,3,3,1,1,2,2,0,0,0],
		  [0,3,3,1,1,2,2,0,0,0],
	      [0,3,3,1,1,2,2,0,0,0],
		  [0,3,3,1,1,2,2,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  		  ],
		  
		  
     3:  [
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,0,0,0,0,0,0,0,0],
		  ],
		  
		   4:  [
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
		  [0,2,2,2,2,2,2,2,2,0],
		  [0,2,2,2,1,1,2,2,2,0],
		  [0,2,2,1,1,1,1,2,2,0],
		  [0,2,2,2,1,1,2,2,2,0],
		  [0,2,2,2,2,2,2,2,2,0],
		  [0,0,0,0,0,0,0,0,0,0],
          
		  ],
		  
		  5:  [
	      [0,0,0,0,0,0,0,0,0,0],
		  [0,3,1,1,2,2,1,1,3,0],
		  [0,1,3,1,2,2,1,3,1,0],
		  [0,1,1,1,2,2,1,1,1,0],
		  [0,2,2,2,2,2,2,2,2,0],
		  [0,2,2,2,2,2,2,2,2,0],
		  [0,1,1,1,2,2,1,1,1,0],
		  [0,1,3,1,2,2,1,3,1,0],
		  [0,3,1,1,2,2,1,1,3,0],
		  [0,0,0,0,0,0,0,0,0,0]
		  ],
		  
		  6:  [
		  [3,1,1,2,2,1,1,3,3,3,3,3,3,3,3,3],
		  [1,3,1,2,2,1,3,1,3,3,3,3,3,3,3,3],
		  [1,1,1,2,2,1,1,1,3,3,3,3,2,3,3,3],
		  [2,2,2,2,2,2,2,2,3,3,3,3,3,3,2,3],
		  [2,2,2,2,2,2,2,2,3,3,2,3,3,3,3,3],
		  [1,1,1,2,2,1,1,1,3,3,3,3,3,3,3,3],
		  [1,3,1,2,2,1,3,1,3,3,3,3,3,3,3,3],
		  [3,1,1,2,2,1,1,3,3,3,3,3,2,3,3,3],
		  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
		  ],
		  
		   };

  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 23, h: 18, cls: Alien, frames: 2 },
    'alien2': { sx: 0,  sy: 18, w: 23, h: 18, cls: Alien, frames: 2 },
    'player': { sx: 0,  sy: 36, w: 26, h: 17, cls: Player },
    'missile': { sx: 0,  sy: 86, w: 3,  h: 14, cls: Missile },
	'alien3': {  sx: 0,  sy: 100,  w: 23, h: 18, cls: Alien, frames: 2 },
	'alien4': {  sx: 0,  sy: 118,  w: 23, h: 18, cls: Alien, frames: 2 },
	'alien5': {  sx: 0,  sy: 136,  w: 23, h: 18, cls: Alien, frames: 2 }
  }

  function startGame() {
    var screen = new GameScreen("VADERS","PRESS S TO START",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
									 starttimer ();
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
    var screen = new GameScreen("GAME OVER","(PRESS S TO RESTART)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
									 starttimer();
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("YOU WIN!","(PRESS S TO START)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
									 //starttimer();
                                 });
    Game.loadBoard(screen);
  }

  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/explosion.ogg', 'aliendie' : 'media/pop.ogg'}, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });

