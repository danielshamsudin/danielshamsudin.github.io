class spawnableItem {
  // check x,y distance, if too close, regenerate
  constructor(type,containerWidth,containerHeight,radius)
  {
    this.type = type;
    this.isTouch = false; 
    this.x = Math.random() * ((containerWidth * 0.9) - (containerWidth * 0.1)) + (containerWidth * 0.1);
    this.y = Math.random() * ((containerHeight * 0.9) - (containerHeight * 0.1)) + (containerHeight * 0.1);
    this.radius = radius;
    this.distanceX = 0;
    this.distanceY = 0;
      if (type == 'hint') {
          this.isSpawn = false;  //if hint is spawned once, it wont spawn again
          this.isDespawn = true; //if hint is despawned then player cannot touch it
      }
  }

  regenerateXY(containerWidth, containerHeight)
  {
      this.x = Math.random() * ((containerWidth * 0.9) - (containerWidth * 0.1)) + (containerWidth * 0.1);
      this.y = Math.random() * ((containerHeight * 0.9) - (containerHeight * 0.1)) + (containerHeight * 0.1);
  } 

  calculateDistanceHandToObject(handX,handY)
  {
    this.distanceX = Math.abs(this.x - handX);
    this.distanceY = Math.abs(this.y - handY);
  }
}

// function to compare distance of targets/trap to handX,handY
// params: 
// object1 -> target / trap x or y value
// object2 -> handX or handY value
function calcEuclDistance(object1,object2)
{
  return Math.sqrt(((object2.x - object1.x)**2) + ((object2.y - object1.y)**2));
}