//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj, allFoods;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodObj=new Food();
  dog=createSprite(250,250,40,40);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedPet=createButton("Feed the Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46, 139, 87);
  foodObj.display();
  fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM", 350,30);
  }else if(lastFed===0){
    text("Last Feed: 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed+"AM",350,30);
  }

  drawSprites();
}
  

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  if(addFood.mousePressed){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
}

function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
