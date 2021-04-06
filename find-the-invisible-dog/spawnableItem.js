class spawnableItem {
  // check x,y distance, if too close, regenerate
  constructor(type,containerWidth,containerHeight,radius)
  {
    this.type = type;
    this.isTouch = false; 
    this.x = Math.random() * containerWidth;
    this.y = Math.random() * containerHeight;
    this.radius = radius;
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

  // function for "gifts"
  // randomise between 4 of the available perks
  // 1. show area of a single target (random)
  // 2. show area of trap (randomised if multiple trap)
  // 3. increment time of game
  // 4. display coins for extra points added to score
  giftPerks()
  {
    if(this.type === "gift")
    {
      let choice = Math.floor(Math.random()*4)+1;
      switch(choice)
      {
        case 1:
          // show area of one of the target 
          // where isTouch is false
          break;
        case 2:
          // show area of trap where isTouch
          // is false
          break;
        case 3:
          // show a message that timer 
          // has been increased
          break;
        case 4:
          // display coins on screen
          // 5-10 coins worth 2 points each
          // for a limited time
          break;
      }
    }
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