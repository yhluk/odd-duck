'use strict';



// ******* GLOBALS *******
let productArray = [];
let votingRounds = 25;


//  ****** DOM WINDOWS *********************************************************************************
let imgContainer = document.getElementById('images');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');


// ***** CONSTRUCTOR FUNCTION *************************************************************************

class Product{
  constructor(name) {
    this.name = name;
    this.img = `img/${name}.jpg`;
    this.votes = 0;
    this.views = 0;
    this.percentage = 0;
  }
  calculatePercentage() {
    this.percentage = Math.floor(this.votes/this.views*100);
  }
}

// ***** HELPER FUNCTIONS / UTILITIES *******************************************************************
// percentage();
// {
//   return Math.floor(this.votes/this.views*100);
// }
// console.log(percentage());

function randomIndex()
{
  return Math.floor(Math.random() * productArray.length);
}

function renderImages()
{
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  while(imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex===imgThreeIndex)
  {
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }
  // console.log(renderImages);

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;

  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.title = productArray[imgThreeIndex].name;

  imgOne.alt = `the image of ${productArray[imgOneIndex].name}`;
  imgTwo.alt = `the image of ${productArray[imgTwoIndex].name}`;
  imgThree.alt = `the image of ${productArray[imgThreeIndex].name}`;


  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

}

// **** EVENT HANDLERS *******************************************************************************

function handleClick(event){
  let imgClicked = event.target.title;

  for(let i=0; i<productArray.length; i++)
  {
    if(imgClicked===productArray[i].name)
    {
      productArray[i].votes++;
    }
  }
  votingRounds--;

  renderImages();

  if(votingRounds===0)
  {
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults()
{
  if(votingRounds === 0){
    for(let i = 0; i < productArray.length; i++)
    {
      productArray[i].calculatePercentage();
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} - views: ${productArray[i].views} & votes: ${productArray[i].votes} with picking rate of ${productArray[i].percentage}` ;
      resultsList.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }

}




// **** EXECUTABLE CODE ******************************************************************************

let bagProduct = new Product('bag');
let bananaProduct = new Product('banana');
let bathroomProduct = new Product('bathroom');
let bootsProduct = new Product('boots');
let breakfastProduct = new Product('breakfast');
let bubblegumProduct = new Product('bubblegum');
let chairProduct = new Product('chair');
let cthulhuProduct = new Product('cthulhu');
let dogDuckProduct = new Product('dog-duck');
let dragonProduct = new Product('dragon');
let penProduct = new Product('pen');
let petSweepProduct = new Product('pet-sweep');
let scissorsProduct = new Product('scissors');
let sharkProduct = new Product('shark');
let sweepProduct = new Product('sweep');
let tauntaunProduct = new Product('tauntaun');
let unicornProduct = new Product('unicorn');
let waterCanProduct = new Product('water-can');
let wineGlassProduct = new Product('wine-glass');

productArray.push (bagProduct, bananaProduct, bathroomProduct, bootsProduct, breakfastProduct, bubblegumProduct, chairProduct, cthulhuProduct, dogDuckProduct, dragonProduct, penProduct, petSweepProduct, scissorsProduct, sharkProduct, sweepProduct, tauntaunProduct, unicornProduct,waterCanProduct, wineGlassProduct);

renderImages();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
