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
  step = 20;
  timeInterval = 500;
  playerDiv: HTMLDivElement;
  constructor(
    name: string,
    initialPositionX: number,
    initialPositionY: number
  ) {
    this.name = name;
    this.playerDiv = document.createElement("div");
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
      this.positionX = this.positionX + this.step;
      this.playerDiv.style.left = `${this.positionX}px`;
    }, this.timeInterval);
  };
  moveDown = () => {
    this.clearControlMovementByKeysIntervals();
    this.moveDownInterval = setInterval(() => {
      this.positionY = this.positionY + this.step;
      this.playerDiv.style.top = `${this.positionY}px`;
    }, this.timeInterval);
  };
  moveLeft = () => {
    this.clearControlMovementByKeysIntervals();
    this.moveLeftInterval = setInterval(() => {
      this.positionX = this.positionX - this.step;
      this.playerDiv.style.left = `${this.positionX}px`;
    }, this.timeInterval);
  };
  moveUp() {
    this.clearControlMovementByKeysIntervals();
    this.moveUpInterval = setInterval(() => {
      this.positionY = this.positionY - this.step;
      this.playerDiv.style.top = `${this.positionY}px`;
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
