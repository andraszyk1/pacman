import { Enemy } from "./Enemy";
import { Player } from "./Player";
type TLevel = "easy" | "medium" | "hard";
export class Pacman {
  pacmanInterval: any;
  enemiesInterval: any;
  timeOutLevel1: any;
  timeOutLevel2: any;
  level: TLevel;
  pacman: Player;
  enemies: Enemy[];
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  pacmanContainer: HTMLDivElement | null;
  pointsCounterDiv: HTMLDivElement | null;
  scores=0
  constructor(playername: string, level: TLevel) {
    this.pacmanContainer = document.querySelector(".pacmanContainer");
    this.enemies = [];
    this.level = level;
    if (level === "easy") {
      this.createEnemy("Tata");
    }
    if (level === "medium") {
      this.createEnemy("Antek");
      this.createEnemy("Szymon");
      this.createEnemy("Amelia");
    }
    if (level === "hard") {
      this.createEnemy("Antek");
      this.createEnemy("Szymon");
      this.createEnemy("Amelia");
      this.createEnemy("Helena");
      this.createEnemy("Emilia");
    }
    this.pacman = new Player(playername, 0, 0);
  
    this.pointsCounterDiv=document.createElement("div")
    this.pointsCounterDiv.classList.add('pointsCounter')
    this.pacmanContainer?.parentNode?.appendChild(this.pointsCounterDiv)

    this.playGame()
  }
  createEnemy(enemyName: string) {
    if (this.pacmanContainer) {
      let x = Math.round((Math.random()*this.pacmanContainer.clientWidth)/60)*60;
      let y = Math.round((Math.random() * this.pacmanContainer.clientHeight) / 60) * 60;
      let newEnemy = new Enemy(enemyName, x, y);
      this.enemies.push(newEnemy);
    }
  }

  gameOver() {
    clearInterval(this.pacmanInterval)
    clearInterval(this.enemiesInterval)
    clearTimeout(this.timeOutLevel1)
    clearTimeout(this.timeOutLevel2)
    const gameOverDiv = document.createElement("div");
    gameOverDiv.classList.add("gameOver");
    const newGameBtn = document.createElement("button");
    newGameBtn.innerText = "New game";
    gameOverDiv.appendChild(newGameBtn);
    this.pacmanContainer?.appendChild(gameOverDiv);
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
  checkGameOver(){
    this.enemies.forEach((enemy) => {
      if (this.pacman.positionY === enemy.positionY && this.pacman.positionX===enemy.positionX) 
        this.gameOver();
    
    });
  }
  countPoints(){
    this.scores=this.scores+1
    if (this.pointsCounterDiv) {
      this.pointsCounterDiv.innerText = this.scores.toString();
    }
  }
  playGame() {
    this.pacmanInterval=setInterval(() => { 
      this.pacman.changeDirection()
      this.pacman.changePosition()
      this.countPoints()
      this.checkGameOver()
      this.enemies.forEach(enemy=>{
        enemy.changePosition()
      })
    }, 1000);
    this.enemiesInterval=setInterval(() => { 
    this.enemies.forEach(enemy=>{
      enemy.enemyChangeDirection()
    })
  }, 4000);
    this.timeOutLevel1=setTimeout(()=>{
      this.createEnemy("Antek")
      this.createEnemy("Szymon")
    },10000)
    this.timeOutLevel2=setTimeout(()=>{
      this.createEnemy("Helena")
      this.createEnemy("Amelia")
    },15000)
  }
}
