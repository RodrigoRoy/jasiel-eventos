import {Chair} from './Chair'

export class Table{
  constructor(x, y, size, numChairs, chairSize){
    this.x = x || 0;
    this.y = y || 0;
    this.size = size || 10;
    this.numChairs = numChairs || 0;
    this.chairSize = chairSize || (this.size / 2);
    this.chairs = [];
    for(let i = 0; i < this.numChairs; i++){
      let angle = 2 * Math.PI / this.numChairs;
      let sx = this.x + Math.cos(i * angle) * (this.size) - (this.chairSize / 2);
      let sy = this.y + Math.sin(i * angle) * (this.size) - (this.chairSize / 2);
      this.chairs[i] = new Chair(sx, sy, this.chairSize, true);
    }
  }
}
