import { Pacman } from './Pacman'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class='pacmanContainer'>
  
  </div>
`

new Pacman("Mama","easy")
