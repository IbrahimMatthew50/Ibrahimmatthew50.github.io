let paddle;
let ball;
let score = 0;
let bricks = [];
let lose;
const bricksPerCol = 3;
const bricksPerRow = 8;

function setup() {
    createCanvas(800, 600);

    let colors = [];
    colors.push(color(255, 0, 0))
    colors.push(color(135, 206, 250))
    colors.push(color(255))
    paddle = new Paddle();
    ball = new Ball(paddle);
    const brickWidth = width / bricksPerRow;
    const brickHeight = height / bricksPerCol * 0.2;
    for (let i = 0; i < bricksPerCol; i++) { //creates the bricks
        for(let j = 0; j < bricksPerRow; j++) {
            let brick = new Brick(createVector(brickWidth * j, brickHeight * i), brickWidth, brickHeight, color(255, 0, 0))
            bricks.push(brick)
        }
        //bricks[i] = new Brick(createVector(brickWidth * i, 0), brickWidth, 20, color(255, 0, 0));

    }
}

function draw() {
    background(0);
    fill(255);

    ball.bounceEdge()
    ball.bouncePaddle()

    ball.update()

    paddle.display()
    ball.paddle = paddle
    ball.display()
    textAlign(CENTER);
    textSize(20);
    text("Score: " + score, width/2, height/2)

    // for (let i = 0; i < bricksPerCol; i++) {
    //     for(let j = 0; j < bricksPerRow; j++) {
    for (let i = bricks.length - 1; i >= 0; i--){
            bricks[i].display()
            if (paddle.isColliding(ball)) {
            ball.reverseY();
            }


            if (bricks[i].isColliding(ball) ) {
                bricks.splice(i, 1)
                ball.reverseY();
            score++;

            }
     }
    if(bricks.length === 0) {
        background(0);
        text("You Win!", width/2, height*0.5);
    }

}
class Ball {
        constructor(paddle) {
        this.radius = 15;
        this.size = this.radius * 2
        this.location = createVector(paddle.location.x + (paddle.width / 2), paddle.location.y - (this.radius) - 5)
        this.color = color(255);
        this.velocity = createVector(5, 5)
        this.paddle = paddle
    }

     bouncePaddle() {
        if (this.location.x >= this.paddle.location.x - this.paddle.width/2 &&
            this.location.x <= this.paddle.location.x + this.paddle.width/2) {
                if (this.location.y + this.radius > this.paddle.location.y - this.paddle.height/2) { //as soon as it touches the paddle it bounces
                    this.velocity.y *= -1;
                    // this.location.y = this.paddle.location.y - this.radius - 1 - this.paddle.height;
                 }
                if (this.location.y > 600) { //if it's hits the bottom
                    this.velocity = createVector(5, -5)
                    this.location.y = 300;
                    this.location.x = 400;
                    lose = 1;
                    score = 0;
                }
               }
          }

    bounceEdge() {
        // this is basiclly the collison detection
        if(this.location.x + this.radius >= width) {
            this.velocity.x *= -1
        } else if (this.location.x -this.radius <= 0) {
            this.velocity.x *= -1
        } else if(this.location.y - this.radius <= 0) {
            this.velocity.y *= -1
        }
    }

    display() {
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.size, this.size);
        if(lose === 1) {
            text("You Loser!", width/2, height*0.6);
            setTimeout(() => {lose = 0}, 500);
        // this.bouncePaddle();
        }
    }

    update(){
        this.location.add(this.velocity);
    }

    reverseY() {
        this.velocity.y *= -1
    }
}

class Brick {
    constructor(location, width, height, color) {
        this.location = location
        this.width = width;
        this.height = height;
        this.color = color;
    }

    display() {
        rectMode(CORNER)
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);
    }

    isColliding(ball) {
       // collide with all sides of brick
       if (ball.location.y - ball.radius <= this.location.y + this.height &&
          ball.location.y + ball.radius >= this.location.y &&
          ball.location.x + ball.radius >= this.location.x &&
          ball.location.x - ball.radius <= this.location.x + this.width) {
              return true
        }
        return false
   }
}

class Paddle {

  constructor() {
    this.width = 150;
    this.height = 25;
    this.color = color(255);
    this.location = createVector((width / 2) - (this.width / 2), height - 35);
  }

  display() {
    fill(this.color);
    rectMode(CENTER);
    rect(mouseX, this.location.y, this.width, this.height);
    this.location = createVector(mouseX, this.location.y);
   }

  isColliding(ball) {
       // collide with all sidEs of brick
       if (ball.location.y - ball.radius <= this.location.y + this.height &&
          ball.location.y + ball.radius >= this.location.y &&
          ball.location.x + ball.radius >= this.location.x &&
          ball.location.x - ball.radius <= this.location.x + this.width) {
              return true
        }
         return false
   }
}