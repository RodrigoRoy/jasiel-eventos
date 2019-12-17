export class Chair{
  constructor(x, y, size, isFree){
    this.x = x || 0;
    this.y = y || 0;
    this.size = size || 10;
    this.isFree = isFree || true;
  }

  update(mouseX, mouseY){
    if(mouseX >= this.x && (mouseX <= this.x + this.size) && mouseY >= this.y && (mouseY <= this.y + this.size))
      this.isFree = !this.isFree;
  }
}
