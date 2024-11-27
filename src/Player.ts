type TDirection = "left" | "right" | "up" | "down" | "";
export class Player {
  positionY = 0;
  positionX = 0;
  direction: TDirection;
  directions: TDirection[];
  name = "";
  step = 60;
  timeInterval = 500;
  playerDiv: HTMLDivElement;
  playerMounth: HTMLDivElement;
  pacmanContainer: HTMLDivElement | null;
  constructor(
    name: string,
    initialPositionX: number,
    initialPositionY: number
  ) {
    this.direction = "";
    this.directions = ["right", "left", "up", "down"];
    this.name = name;

    this.positionX = initialPositionX ? initialPositionX : 0;
    this.positionY = initialPositionY ? initialPositionY : 0;

    this.pacmanContainer = document.querySelector(".pacmanContainer");

    this.playerDiv = document.createElement("div");
    this.playerDiv.classList.add("player");
    this.playerDiv.textContent = name;
    this.pacmanContainer?.appendChild(this.playerDiv);
    this.playerDiv.style.left = `${this.positionX}px`;
    this.playerDiv.style.top = `${this.positionY}px`;

    this.playerMounth = document.createElement("div");
    this.playerMounth.classList.add("playerMounth");
    this.playerDiv.appendChild(this.playerMounth);
  }

  moveRight = () => {
    this.positionX = this.positionX + this.step;
    this.playerDiv.style.left = `${this.positionX}px`;
  };
  moveDown = () => {
    this.positionY = this.positionY + this.step;
    this.playerDiv.style.top = `${this.positionY}px`;
  };
  moveLeft = () => {
    this.positionX = this.positionX - this.step;
    this.playerDiv.style.left = `${this.positionX}px`;
  };
  moveUp() {
    this.positionY = this.positionY - this.step;
    this.playerDiv.style.top = `${this.positionY}px`;
  }
  changePosition = () => {
    console.log(this.positionY, Number(this.pacmanContainer?.clientHeight), this.playerDiv.offsetHeight);
    
    if (this.direction === "right") this.moveRight();
    if (
      this.direction === "right" &&
      this.positionX >
        Number(this.pacmanContainer?.clientWidth) - this.playerDiv.offsetWidth
    )
      this.moveLeft();
    if (this.direction === "left") this.moveLeft();
    if (this.direction === "left" && this.positionX < 0) this.moveRight();
    if (this.direction === "up") this.moveUp();
    if (this.direction === "up" && this.positionY < 0) this.moveDown();
    if (this.direction === "down") this.moveDown();
    if (
      this.direction === "down" &&
      this.positionY >
        Number(this.pacmanContainer?.clientHeight) - this.playerDiv.offsetHeight
    )
      this.moveUp();
  };

  changeDirection = () => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") this.direction = "right";
      if (e.key === "ArrowDown") this.direction = "down";
      if (e.key === "ArrowLeft") this.direction = "left";
      if (e.key === "ArrowUp") this.direction = "up";
    });
  };
}
