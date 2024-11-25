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
    if (level === "easy"){
        this.createEnemyWithRandomInitPosition("Antek")
        this.createEnemyWithRandomInitPosition("Szymon")
    }
    if (level === "medium") {
        this.createEnemyWithRandomInitPosition("Antek")
        this.createEnemyWithRandomInitPosition("Szymon")
        this.createEnemyWithRandomInitPosition("Amelia")
    }
    if (level === "hard") {
        this.createEnemyWithRandomInitPosition("Antek")
        this.createEnemyWithRandomInitPosition("Szymon")
        this.createEnemyWithRandomInitPosition("Amelia")
        this.createEnemyWithRandomInitPosition("Helena")
        this.createEnemyWithRandomInitPosition("Emilia")
    }
    this.pacmanContainer = document.querySelector(".pacmanContainer");
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
  createEnemyWithRandomInitPosition(enemyName:string){
    let x=Math.abs(Math.floor(Math.random()*this.windowWidth)-100)
    let y=Math.abs(Math.floor(Math.random()*this.windowHeight)-100) 
    let newEnemy=new Enemy(enemyName, x, y);
    this.enemies.push(newEnemy);
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
        if (
          Math.abs(this.pacman.positionY - enemy.positionY) < 80 &&
          Math.abs(this.pacman.positionX - enemy.positionX) < 80
        ) {
          this.gameOver();
        }
      });
    }, 500);
  }
}
