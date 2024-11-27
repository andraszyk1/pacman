import { Player } from "./Player";
export class Enemy extends Player {
  constructor(name: string, initX: number, initY: number) {
    super(name, initX, initY);
    this.playerDiv.classList.add("enemy");
  }
 
  enemyChangeDirection = () => {
    let indexRandom = Math.ceil(Math.random() * this.directions.length);
    this.direction = this.directions[indexRandom];
  };
}
