let player = document.getElementById('player');
let coins = document.querySelectorAll('.coin');
let gameContainer = document.getElementById('game-container');
let gravity = 0.5;
let playerSpeed = 5;
let jumpPower = 10;
let isJumping = false;
let isFalling = false;
let velocityY = 0;
let jumpHeight = 0;
let score = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    movePlayer(1);
  }
  if (e.key === 'ArrowLeft') {
    movePlayer(-1);
  }
  if (e.key === ' ' && !isJumping) {
    jump();
  }
});

function movePlayer(direction) {
  let currentLeft = parseInt(window.getComputedStyle(player).left);
  if (currentLeft + direction * playerSpeed >= 0 && currentLeft + direction * playerSpeed <= gameContainer.offsetWidth - player.offsetWidth) {
    player.style.left = currentLeft + direction * playerSpeed + 'px';
  }
}

function jump() {
  isJumping = true;
  velocityY = jumpPower;
}

function collectCoins() {
  coins.forEach((coin) => {
    let coinRect = coin.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < coinRect.left + coinRect.width &&
      playerRect.left + playerRect.width > coinRect.left &&
      playerRect.top < coinRect.top + coinRect.height &&
      playerRect.top + playerRect.height > coinRect.top
    ) {
      coin.remove();
      score += 10;
      console.log("Score: " + score);
    }
  });
}

function gameLoop() {
  if (isJumping) {
    velocityY -= gravity;
    player.style.bottom = (parseInt(window.getComputedStyle(player).bottom) + velocityY) + 'px';

    if (parseInt(window.getComputedStyle(player).bottom) <= 50) {
      player.style.bottom = '50px';
      isJumping = false;
    }
  } else {
    if (parseInt(window.getComputedStyle(player).bottom) > 50) {
      velocityY -= gravity;
      player.style.bottom = (parseInt(window.getComputedStyle(player).bottom) + velocityY) + 'px';
    }
  }

  collectCoins();
  requestAnimationFrame(gameLoop);
}

gameLoop();
