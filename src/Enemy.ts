import { Player } from "./Player";
export class Enemy extends Player {
    constructor(name:string,initX:number,initY:number){
        super(name,initX,initY)
        this.playerDiv.classList.add('enemy')
        
    }
    uncontrolMovmentByRandom=()=>{
        this.uncontrolMovmentByRandomInterval=setInterval(()=>{
                this.uncontrolInterval1=setTimeout(()=>{
                    this.moveDown()
                },0)
                this.uncontrolInterval2=setTimeout(()=>{
                    this.moveUp()
                },2500)
            },5000)
          }
}