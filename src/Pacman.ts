import { Enemy } from "./Enemy";
import { Player } from "./Player";
type TLevel = "easy" | "medium" | "hard";
export class Pacman {
  gameInterval: any;
  level: TLevel;
  pacman: Player;
  enemies: Enemy[];
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  pacmanContainer: HTMLDivElement | null;
  constructor(playername: string, level: TLevel) {
    this.enemies = [];
    this.pacman = new Player(playername, 0, 0);
    this.level = level;
    this.pacmanContainer = document.querySelector(".pacmanContainer");
    if (level === "easy") {
      this.createEnemyWithRandomInitPosition("Antek");
    }
    if (level === "medium") {
      this.createEnemyWithRandomInitPosition("Antek");
      this.createEnemyWithRandomInitPosition("Szymon");
      this.createEnemyWithRandomInitPosition("Amelia");
    }
    if (level === "hard") {
      this.createEnemyWithRandomInitPosition("Antek");
      this.createEnemyWithRandomInitPosition("Szymon");
      this.createEnemyWithRandomInitPosition("Amelia");
      this.createEnemyWithRandomInitPosition("Helena");
      this.createEnemyWithRandomInitPosition("Emilia");
    }
    this.pacman.playerDiv.classList.add("player");
    this.pacmanContainer?.appendChild(this.pacman.playerDiv);
    this.pacman.controlMovementByKeys();
    this.enemies.forEach((enemy) => {
      enemy.uncontrolMovmentByRandom();
      enemy.playerDiv.classList.add("enemy");
      this.pacmanContainer?.appendChild(enemy.playerDiv);
    });
    this.getPositions();
  }
  createEnemyWithRandomInitPosition(enemyName: string) {
    if (this.pacmanContainer) {
      let x = Math.round((Math.random()*this.pacmanContainer.clientWidth-60)/60)*60;
      let y = Math.round((Math.random() * this.pacmanContainer.clientHeight) / 60) * 60;
      console.log(x,y);

      let newEnemy = new Enemy(enemyName, x, y);
      this.enemies.push(newEnemy);
    }
  }

  gameOver() {
    this.pacman.clearControlMovementByKeysIntervals();
    this.enemies.forEach((enemy) => {
      enemy.clearUncontrolMovmentByRandomInterval();
    });
    const gameOverDiv = document.createElement("div");
    gameOverDiv.classList.add("gameOver");
    const newGameBtn = document.createElement("button");
    newGameBtn.innerText = "New game";
    gameOverDiv.appendChild(newGameBtn);
    this.pacmanContainer?.appendChild(gameOverDiv);
    clearInterval(this.gameInterval);
    newGameBtn.addEventListener("click", (e: Event) => {
      e.preventDefault();
      this.pacman.playerDiv.remove();
      this.enemies.forEach((enemy) => {
        enemy.playerDiv.remove();
      });
      gameOverDiv.remove();
      new Pacman(this.pacman.name, this.level);
    });
  }
  getPositions() {
    this.gameInterval = setInterval(() => {
      this.enemies.forEach((enemy) => {
        console.log(this.pacman.positionX,this.pacman.positionY,enemy.positionX,enemy.positionY);
        if (
          this.pacman.positionY === enemy.positionY &&
          this.pacman.positionX===enemy.positionX
        ) {
         
          
          this.gameOver();
        }
      });
    }, 500);
  }
}
