class spawnableItem {
  // check x,y distance, if too close, regenerate
  constructor(type,containerWidth,containerHeight,radius)
  {
    this.type = type;
    this.isTouch = false; 
    this.x = Math.random() * containerWidth;
    this.y = Math.random() * containerHeight;
    this.radius = radius;

      if (type == 'gift') {
          this.isSpawn = false;
          this.isDespawn = true;
      }
  }

  regenerateXY(containerWidth, containerHeight)
  {
    this.x = Math.random() * containerWidth;
    this.y = Math.random() * containerHeight;
  } 

  calculateDistanceHandToObject(handX,handY)
  {
    this.distanceX = Math.abs(this.x - handX);
    this.distanceY = Math.abs(this.y - handY);
  }
}

// function to compare distance of targets/trap to handX,handY
// params: 
// d1 -> target / trap x or y value
// d2 -> handX or handY value
function calcEuclDistance(object1,object2)
{
  return Math.sqrt(((object2.x - object1.x)**2) + ((object2.y - object1.y)**2));
}