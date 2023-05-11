
let theCanvas;
let bg;
let objImage;
let ball;
var x = 200;
var y = 600;
var x2 = 200;
var y2 = 480;
var z = 0;
var win = 0;
var gravity = 0.1;
var yourGoal = 0;
var theyGoal = 0;
let userName;

//Since multiple images (and mp3 soon) are in the project, its best practice to preload them;
//Helps avoid errors and loading screens
function preload(){
    // objImage = loadImage('/images/cleat.png');
    // img2 = loadImage('/images/head.png');
    // ball = loadImage('/images/ball.png')

    objImage = loadImage('images/cleat.png');
    img2 = loadImage('images/head.png');
    ball = loadImage('images/ball.png')
}

function setup(){
    //runs once 
    theCanvas = createCanvas(1400, 750);
    ball2 = new Ball(ball,700, 100);
}

//Not working yet - Only works locally
// function user(){
//     userName = document.getElementById("userInput").value;
//     localStorage['usn'] = userName;
//     if(userName.length == 0){
//        localStorage['usn'] = "Hero";
//     }
//     console.log(userName);
// }

function draw(){
    //this is a loop
    //defalut is 60 fps

    //Makes a clear background in P5 allowing css and html to show 
    clear();
    background(220, 10);
    
    textSize(70);
    text("Hero", 280, 80);
    //Below only works locally unfortunatly
    // text(localStorage['usn'], 280, 80);
    //fill(0, 102, 153);

    textSize(75);
    text("Enemy", 875, 80);


    // Scoreboard:
    fill(255, 87, 51)
    beginShape();
        vertex(250, 100);
        vertex(620, 100);
        vertex(620, 120)
        vertex(300, 120);
    endShape(CLOSE)
   
    beginShape();
        vertex(820, 100);
        vertex(1190, 100);
        vertex(1140, 120);
        vertex(820, 120);
    endShape(CLOSE)

    fill(255,255,255);
    ellipse(600,70,125,125);
    fill(255, 87, 51)
    text(yourGoal, 580, 90);

    fill(255,255,255);
    ellipse(800,70,125,125);
    fill(255, 87, 51)
    text(theyGoal, 780, 90);



    image(objImage, x, y,100,100);
    image(img2, x2, y2, 120, 120);

    // Your net
    fill(199, 0, 57);
    rect(0,300,30,550);
    
    // Opp net
    fill(15, 255, 80);
    rect(1380,500,100,250);

    ball2.update();
    ball2.show();



    //Collosion detection:
    var d = dist(ball2.x, ball2.y, x2, y2);
    if (d < 50) {
        ball2.coll();
      }
    
    var d2 = dist(ball2.x, ball2.y, x, y);
    if (d2 < 30) {
        ball2.coll();
      }

    
    if(ball2.x <= 0){
        if(ball2.y > 300){
            ball2.goal();
            theyGoal +=1;
        }
    }

    if(ball2.x >= 1290){
        if(ball2.y > 425){
            ball2.goal();
            yourGoal +=1;
        }
    }
    
    if(yourGoal >= 10){
        alert("Golazo!! You've won");
        yourGoal = 0;
    }
    else if(theyGoal >= 10){
        alert("Thats too bad. You've lost this one. Try again!");
        theyGoal = 0;
    }
}



//Function for player movement using arrow keys (could use improvement)
function keyPressed() {
    if (keyIsDown(UP_ARROW) && y2>0) {
      y = y - 20;
      y2 = y2 - 20;
    } else if (keyIsDown(DOWN_ARROW)&& y<650) {
     y = y + 20;
     y2 = y2 + 20;
    }
    if (keyIsDown(LEFT_ARROW) && x>0) {
      x = x - 20;
      x2 = x2 - 20;
    } else if (keyIsDown(RIGHT_ARROW) && x<550) {
      x = x + 20;
      x2 = x2 + 20;
    }
  }

//Ball function that acts almost like a class, easier to create and control speeds through set functions 
//within the ball function itself
 function Ball(ball,x,y){
    this.x = x;
    this.y = y;
    this.r = 25;

    this.yspeed = 2;
    this.xspeed = -3;

    this.update = function(){
        this.y += this.yspeed;
       // this.yspeed += gravity;

        this.x += this.xspeed;

        if(this.y > 650 || this.y < 0){
            //this.y = 650;
            this.yspeed *= -1;
        }
        if(this.x > 1350 || this.x < 0){
            this.xspeed *= -1;
        }

    }

    this.show = function(){
        image(ball, this.x, this.y, 100,100)
    }

    this.coll = function(){
        this.xspeed *= -1;
        this.xspeed += 3;
        this.yspeed += -2;

    }

    this.goal = function(){
        this.x = x;
        this.y = y;
        this.yspeed = 2;
        this.xspeed = -3;
    }


  }