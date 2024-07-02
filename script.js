const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');

const width = window.innerWidth * 0.9;
const height = window.innerHeight * 0.9;
canvas.width = width;
canvas.height = height;

const ball = {
    x: width / 2,
    y: height - 30,
    dx: 2,
    dy: -2,
    radius: 10
};

const paddle = {
    width: 75,
    height: 10,
    x: (width - 75) / 2,
    dx: 7
};

let score = 0;
let gameOver = false;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 8, 20);
}

function updateBallPosition() {
    if (ball.x + ball.dx > width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
            score++; // パドルに当たったときにスコアを増加
        } else {
            gameOver = true;
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

function updatePaddlePosition() {
    if (rightPressed && paddle.x < width - paddle.width) {
        paddle.x += paddle.dx;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

function draw() {
    if (gameOver) {
        ctx.clearRect(0, 0, width, height);
        ctx.font = "24px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("Game Over", width / 2 - 70, height / 2);
        ctx.fillText("Score: " + score, width / 2 - 50, height / 2 + 40);
        restartButton.style.display = 'block'; // リスタートボタンを表示
        return;
    }

    ctx.clearRect(0, 0, width, height);
    drawBall();
    drawPaddle();
    drawScore();
    updateBallPosition();
    updatePaddlePosition();

    requestAnimationFrame(draw);
}

function restartGame() {
    ball.x = width / 2;
    ball.y = height - 30;
    ball.dx = 2;
    ball.dy = -2;
    paddle.x = (width - paddle.width) / 2;
    score = 0;
    gameOver = false;
    restartButton.style.display = 'none'; // リスタートボタンを非表示
    draw();
}

draw();
