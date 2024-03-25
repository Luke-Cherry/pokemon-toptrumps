const GENERATIONLIST = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 905 },
  9: { start: 906, end: 1025 },
};

//Scoring Div
const scoringDiv = document.getElementById("scoringDiv");
const numberOfCards = document.getElementById("noOfCards");

const startGame = () => {
  // Get generations selected
  const checkedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const checkedValues = Array.from(checkedCheckboxes).map(
    (checkbox) => checkbox.value
  );

  checkedValues.map((e) => {
    console.log(GENERATIONLIST[parseInt(e)]);
  });

  //Gets the number of cards player selected to play with
  const numberOfCardsSelected = numberOfCards.value;

  // Check if at least one checkbox is checked
  if (checkedValues.length === 0) {
    alert("Please select at least one generation.");
    return;
  }

  // Hide the hero section
  document.querySelector(".hero").style.display = "none";

  console.log("Selected generations:", checkedValues);
  console.log("Number of cards per player:", numberOfCardsSelected);
};

const playerAttack = document.getElementById("playerAttack");
playerAttack.innerText = "20";
const playerAttackProgress = document.getElementById("playerAttackProgress");
playerAttackProgress.style.width = "20%";
