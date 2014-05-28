
//Score Variables
var score = 0; // starting score
var highscore = 0; //high score
var cashpoints = 3000;

var countstart = 11; // start time
var count=countstart; // countdown timer
var counter = countstart;



//Alien Variables

//Player variables and upgrades

var bulletcount = 3;
var bulletupgradebought = false;

var bulletspeed = -200;
var bulletspeedupgradebought = false;

var playerspeed = 200;
var playerspeedupgradebought = false;

var bulletinterval = 3;
///////////////////////////////////////
///////////Custom Functions////////////
//////////////////////////////////////

function starttimer () // timer wont start until this is run (hopefully)
{
	clearInterval(counter);
	count = countstart;
	counter = setInterval(timer, 900); //1000 will  run it every 1 second
}

//////////// timer

function timer()
{
  count = count-1;
  if (count <= -1)
  {
     clearInterval(counter);
     //counter ended, player dies
	 Player.prototype.die();
     return;
  }
  //put count number into html
 document.getElementById('countdown').innerHTML="Time Left : " + count;
 
}

//////////// cashpoints


function addcashpoints () {
	//Add Cash Points
  cashpoints = cashpoints + score;
  document.getElementById('cashpoints').innerHTML="Cash : " + cashpoints;
	
}

//////////// Upgrades

function bulletupgrade () {
	
	if(cashpoints >= 500 && bulletupgradebought != true){
	bulletcount = bulletcount + 5;
	cashpoints = cashpoints - 500;
	
	document.getElementById('cashpoints').innerHTML="Cash : " + cashpoints;
	document.getElementById('bulletcount').innerHTML="2000 : Max Bullet Count";
	
	bulletupgradebought = true;
	alert('Bullet Count Bought');
	
	} else if (cashpoints >= 2000 && bulletupgradebought != false) {
		
	bulletcount = bulletcount+5;
	cashpoints = cashpoints - 2000;
	document.getElementById('cashpoints').innerHTML="Cash : " + cashpoints;
	document.getElementById('bulletcount').innerHTML="Bullet Count Maxed";
	
	alert('Bullet Count Maxed');
	
	}
}


function bulletspeedupgrade ()
{
		
	if(cashpoints >= 500 && bulletspeedupgradebought != true)
	{
	bulletspeed = bulletspeed -100;
	cashpoints = cashpoints - 500;
	
	document.getElementById('cashpoints').innerHTML="Cash : " + cashpoints;
	document.getElementById('bulletspeed').innerHTML="2000 : Max Bullet Speed";
	
	bulletspeedupgradebought = true;
	alert('Bullet Speed Bought');
	
	} else if (cashpoints >= 2000 && bulletspeedupgradebought != false) {
		
	bulletspeed = bulletspeed -100;
	cashpoints = cashpoints - 2000;
	document.getElementById('cashpoints').innerHTML="Cash : " + cashpoints;
	document.getElementById('bulletspeed').innerHTML="Bullet Speed Maxed";
	
	alert('Bullet Speed Maxed');
	}
}


function playerspeedupgrade ()
{
		
	if(cashpoints >= 1000 && playerspeedupgradebought != true)
	{
	playerspeed = playerspeed + 100;
	cashpoints = cashpoints - 1000;
	
	document.getElementById('cashpoints').innerHTML="Cash : " + cashpoints;
	document.getElementById('playerspeed').innerHTML="3000 : Max Player Speed";
	
	playerspeedupgradebought = true;
	alert('Player Speed Bought');
	
	} else if (cashpoints >= 3000 && playerspeedupgradebought != false) {
		
	playerspeed = playerspeed + 100;
	cashpoints = cashpoints - 3000;
	document.getElementById('cashpoints').innerHTML="Cash : " + cashpoints;
	document.getElementById('playerspeed').innerHTML="Player Speed Maxed";
	
	alert('Player Speed Maxed');
	}
}




///////////////////////



var AlienFlock = function AlienFlock() { // the whole block of aliens
  this.invulnrable = true; // is invulnerable
  this.dx = 10; this.dy = 0; 
  this.hit = 2; this.lastHit = 0;
  this.speed = 50; // flocks initial speed

  this.draw = function() {}; // gets drawn to canvas


  //when the flock dies, if there is a next level load it. If not then player wins game	
  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
	  count = count + 10;
    } else {
      Game.callbacks['win']();
	  
	   //add cashpoints when you win game
	   addcashpoints(); 
	  
	  //added high score at win game
	  if (score > highscore) {
		  highscore = score;
	  }
	  
	  // inserts score to html
	   document.getElementById('highscore').innerHTML="High Score : " + highscore;
	   
	  // score reset
	  score = 0;
	  
    }
  }
  

  // Dont know what this does yet
  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}


// dont know yet
var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

//draw alien sprites to canvas every frame
Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
  
}

// when alien dies play die sound, increase flock speed, remove alien from board, +1 to score, update the score in the html
Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
  score = score + (1*count);
  document.getElementById('score').innerHTML="Score : " + score;
  
  
}

// dont know yet
Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}

// Alien will fire 10% of the time
Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 3) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}


//dont know yet
var Player = function Player(opts) { 
  this.reloading = 1;
}

// draw player sprite to canvas
Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
   
   
}


// when player dies play die audio and run die function.
//Also now update highscore and reset score
Player.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
  addcashpoints();
  
  
  //added high score at lose game
	  if (score > highscore) {
		  highscore = score;
	  }
	  // inserts score to html
	   document.getElementById('highscore').innerHTML="High Score : " + highscore;
	   
	  // score reset
	  score = 0;
}

// sets what the keys do, adds constraints
Player.prototype.step = function(dt) {
  if(Game.keys['left']) { this.x -= playerspeed * dt; }
  if(Game.keys['right']) { this.x += playerspeed * dt; }
  //if(Game.keys['down']) { this.y += 300 * dt; }
  //if(Game.keys['up']) { this.y -= 300 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;
    
  //if(this.y < 0) this.y = 0;
  //if(this.y > Game.height-this.y) this.y = Game.height-this.y;

  this.reloading--;

 // if fire is pressed and reloading is <= 0 you are allowed to fire X missiles. Also Bullet speed
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < bulletcount) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: bulletspeed, player: true });
    this.board.missiles++;
    this.reloading = bulletinterval;
  }
  return true;
}


var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}
