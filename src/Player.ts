export class Player {
  positionY = 0;
  positionX = 0;
  moveRightInterval: any;
  moveLeftInterval: any;
  moveDownInterval: any;
  moveUpInterval: any;
  uncontrolInterval1: any;
  uncontrolInterval2: any;
  uncontrolInterval3: any;
  uncontrolMovmentByRandomInterval: any;
  name = "";
  step = 60;
  timeInterval = 500;
  playerDiv: HTMLDivElement;
  pacmanContainer: HTMLDivElement | null;
  constructor(
    name: string,
    initialPositionX: number,
    initialPositionY: number
  ) {
    this.name = name;
    this.playerDiv = document.createElement("div");
    this.pacmanContainer = document.querySelector(".pacmanContainer");
    let playerMounth = document.createElement("div");
    playerMounth.classList.add("playerMounth");
    this.playerDiv.appendChild(playerMounth);
    this.positionX = initialPositionX ? initialPositionX : 0;
    this.positionY = initialPositionY ? initialPositionY : 0;
    this.playerDiv.style.left = `${this.positionX}px`;
    this.playerDiv.style.top = `${this.positionY}px`;
  }
  clearControlMovementByKeysIntervals = () => {
    clearInterval(this.moveDownInterval);
    clearInterval(this.moveLeftInterval);
    clearInterval(this.moveUpInterval);
    clearInterval(this.moveRightInterval);
  };
  clearUncontrolMovmentByRandomInterval = () => {
    clearInterval(this.uncontrolMovmentByRandomInterval);
    clearInterval(this.uncontrolInterval1);
    clearInterval(this.uncontrolInterval2);
    clearInterval(this.uncontrolInterval3);
  };
  moveRight = () => {
    this.clearControlMovementByKeysIntervals();
    this.moveRightInterval = setInterval(() => {
      if (this.pacmanContainer) {
        console.log("PacmanRight",this.playerDiv.offsetLeft,this.pacmanContainer.offsetWidth);
      
        this.positionX = this.positionX + this.step;
        if (this.positionX > this.pacmanContainer.offsetWidth - this.playerDiv.offsetWidth) {
          this.clearControlMovementByKeysIntervals();
        } else {
          this.playerDiv.style.left = `${this.positionX}px`;
        }
      }
    }, this.timeInterval);
  };
  moveDown = () => {
    this.clearControlMovementByKeysIntervals();
    this.moveDownInterval = setInterval(() => {
      if (this.pacmanContainer) {
        this.positionY = this.positionY + this.step;
        if (
          this.positionY > this.pacmanContainer?.offsetHeight - this.playerDiv.offsetHeight
        ) {
          this.clearControlMovementByKeysIntervals();
        } else {
          this.playerDiv.style.top = `${this.positionY}px`;
        }
      }
    }, this.timeInterval);
  };
  moveLeft = () => {
    this.clearControlMovementByKeysIntervals();
    this.moveLeftInterval = setInterval(() => {
      if (this.pacmanContainer) {
      
        if (this.positionX < this.pacmanContainer?.offsetLeft-this.playerDiv.offsetWidth) {
          this.clearControlMovementByKeysIntervals();
        
        } else {
          this.positionX = this.positionX - this.step;
          this.playerDiv.style.left = `${this.positionX}px`;
        }
      }
    }, this.timeInterval);
  };
  moveUp() {
    this.clearControlMovementByKeysIntervals();
    this.moveUpInterval = setInterval(() => {
      if (this.pacmanContainer) {
        this.positionY = this.positionY - this.step;
        if (
          this.positionY < this.pacmanContainer?.offsetTop
        ) {
          this.clearControlMovementByKeysIntervals();
        } else {
          this.playerDiv.style.top = `${this.positionY}px`;
        }
      }
    }, this.timeInterval);
  }

  controlMovementByKeys = () => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        this.moveRight();
      }
      if (e.key === "ArrowDown") {
        this.moveDown();
      }
      if (e.key === "ArrowLeft") {
        this.moveLeft();
      }
      if (e.key === "ArrowUp") {
        this.moveUp();
      }
      if (e.key === "Enter") {
        this.clearControlMovementByKeysIntervals();
      }
    });
  };
}
