let canvasLength, canvasHeight;
let player, playerBullet;
let monster;




function setup(){

    // sets up variables for the canvas
    canvasLength = 600;
    canvasHeight = 600;

    //object for player's  
    player = {
        x: canvasLength/2,
        y: 550,
        size: 30,
        speed: 8,
    }

    playerBullet = {
        x: player.x,
        y: player.y,
        size: 15,
        speed: 40,
        check: false 
    }

    monster = {
        x: canvasLength/2,
        y: 150, 
        size: 30,
        speed: 10,
        life: true
    }

    createCanvas(canvasLength, canvasHeight);

}



function drawPlayer() {
    stroke(0);
    circle(player.x, player.y, player.size);
    if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && player.x >= player.size/2) {
        player.x -= player.speed;
    } else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) && player.x <= canvasLength - player.size/2) {
        player.x += player.speed;
    }

}

function drawMonster() {
    if (bulletToMonsterCollision() == false) {
        // draws monster
        circle(monster.x, monster.y, monster.size);

        // moves monster
        monster.x += monster.speed;

        // if monster touches barrier, monster switches direction  
        if (monster.x <= monster.size/2 || monster.x >= canvasLength - monster.size/2) {
        monster.speed *= -1;
        }

    } else {
        monster.life = false;
    }

}

function drawPlayerBullet() {

    //makes player's bullet
    noStroke();
    circle(playerBullet.x, playerBullet.y, playerBullet.size);
    

    //bullet movement (if bullet is not out, bullet moves with player)
    if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && playerBullet.check == false && player.x >= playerBullet.size/2) {
        playerBullet.x -= player.speed;
        playerBullet.x = player.x;
    } else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) && playerBullet.check == false && player.x <= canvasLength - playerBullet.size/2) {
        playerBullet.x += player.speed;
        playerBullet.x = player.x;
    }

    //shooting the bullet
    //if the bullet check is true (the bullet is out), 
    if(playerBullet.check == true) {
        playerBullet.y -= playerBullet.speed;
    }

    //checks if bullet reached upper part of canvas, return bullet to player if true
    if(playerBullet.y <= 0) {
        playerBullet.x = player.x;
        playerBullet.y = player.y;
        playerBullet.check = false;
    }

}


function keyPressed() {
    // if the spacebar is pressed, the bullet check is true (the player's bullet shoots)
    if (keyCode == 32) {
        playerBullet.check = true;
    }
}

//checks whther two circles are overlapping or not
function checkCollision(x1, y1, size1, x2, y2, size2) {
    let radDist = (size1/2) + (size2/2);
    let centerDist = dist(x1, y1, x2, y2);
 
    if (radDist < centerDist) {
        return false;
    } else if (centerDist <= radDist) {
        return true;
    } 
}

function bulletToMonsterCollision() {
    if (checkCollision(playerBullet.x, playerBullet.y, playerBullet.size, monster.x, monster.y, monster.size) == true) {
        return true;
    } 

    return false;
}


//draws game
function draw(){
    background(0);
    drawPlayer();
    drawMonster();
    drawPlayerBullet();
    
    }







//draws game
function draw(){
    background(0);
    drawPlayer();
    drawPlayerBullet();
    bulletToMonsterCollision();

    // 
    if (monster.life == true) {
        drawMonster();
        }
    }
    