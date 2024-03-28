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
const nextCardBtn = document.getElementById("nextCardBtn");
const cardOverlay = document.getElementById("overlay");
const gameAlert = document.getElementById("gameAlert");
let computerWinner = false;
let difficulty = 1;

//Player card name/image
const playerName = document.getElementById("playerName");
const playerId = document.getElementById("playerId");
const playerImg = document.getElementById("playerImg");

//Player Card Stats
const playerHeight = document.getElementById("playerHeight");
const playerWeight = document.getElementById("playerWeight");
const playerHealth = document.getElementById("playerHealth");
const playerAttack = document.getElementById("playerAttack");
const playerDefence = document.getElementById("playerDefence");
const playerSpAttack = document.getElementById("playerSpAttack");
const playerSpDefence = document.getElementById("playerSpDefence");
const playerSpeed = document.getElementById("playerSpeed");

//Player Card Progress bars
const playerHeightProgress = document.getElementById("playerHeightProgress");
const playerWeightProgress = document.getElementById("playerWeightProgress");
const playerHealthProgress = document.getElementById("playerHealthProgress");
const playerAttackProgress = document.getElementById("playerAttackProgress");
const playerDefenceProgress = document.getElementById("playerDefenceProgress");
const playerSpAttackProgress = document.getElementById("playerSpAttackProgress");
const playerSpDefenceProgress = document.getElementById("playerSpDefenceProgress");
const playerSpeedProgress = document.getElementById("playerSpeedProgress");

//Pokemon Gif Box
const gifPlayerPokemon = document.getElementById("gifPlayerPokemon");

//Computer card name/image
const computerName = document.getElementById("computerName");
const computerId = document.getElementById("computerId");
const computerImg = document.getElementById("computerImg");

//Computer Card Stats
const computerHeight = document.getElementById("computerHeight");
const computerWeight = document.getElementById("computerWeight");
const computerHealth = document.getElementById("computerHealth");
const computerAttack = document.getElementById("computerAttack");
const computerDefence = document.getElementById("computerDefence");
const computerSpAttack = document.getElementById("computerSpAttack");
const computerSpDefence = document.getElementById("computerSpDefence");
const computerSpeed = document.getElementById("computerSpeed");

//Computer Card Progress bars
const computerHeightProgress = document.getElementById("computerHeightProgress");
const computerWeightProgress = document.getElementById("computerWeightProgress");
const computerHealthProgress = document.getElementById("computerHealthProgress");
const computerAttackProgress = document.getElementById("computerAttackProgress");
const computerDefenceProgress = document.getElementById("computerDefenceProgress");
const computerSpAttackProgress = document.getElementById("computerSpAttackProgress");
const computerSpDefenceProgress = document.getElementById("computerSpDefenceProgress");
const computerSpeedProgress = document.getElementById("computerSpeedProgress");

//Pokemon Gif Box
const gifComputerPokemon = document.getElementById("gifComputerPokemon");

//Player Stats Selected
const heightSelected = document.getElementById("heightSelected");
const weightSelected = document.getElementById("weightSelected");
const healthSelected = document.getElementById("healthSelected");
const attackSelected = document.getElementById("attackSelected");
const defenceSelected = document.getElementById("defenceSelected");
const spattackSelected = document.getElementById("spattackSelected");
const spdefenceSelected = document.getElementById("spdefenceSelected");
const speedSelected = document.getElementById("speedSelected");

//Computer Stats Selected
const computerHeightSelected = document.getElementById("computerHeightSelected");
const computerWeightSelected = document.getElementById("computerWeightSelected");
const computerHealthSelected = document.getElementById("computerHealthSelected");
const computerAttackSelected = document.getElementById("computerAttackSelected");
const computerDefenceSelected = document.getElementById("computerDefenceSelected");
const computerSpattackSelected = document.getElementById("computerSpattackSelected");
const computerSpdefenceSelected = document.getElementById("computerSpdefenceSelected");
const computerSpeedSelected = document.getElementById("computerSpeedSelected");

//Card borders
const playerCardBorder = document.getElementById("playerCardBorder");
const computerCardBorder = document.getElementById("computerCardBorder");

let playerPokemonArray = [];
let computerPokemonArray = [];

const showCardOverlay = () => {
  cardOverlay.style.display = "block";
};

const hideCardOverlay = () => {
  cardOverlay.style.display = "none";
};

const startGame = async () => {
  // Get generations selected
  const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const checkedValues = Array.from(checkedCheckboxes).map((checkbox) => GENERATIONLIST[checkbox.value]);

  // Check if at least one checkbox is checked
  if (checkedValues.length === 0) {
    alert("Please select at least one generation.");
    return;
  }

  //Gets the number of cards player selected to play with
  const numberOfCardsSelected = numberOfCards.value;
  scoringDiv.innerText = `Cards: You ${numberOfCardsSelected} | ${numberOfCardsSelected} Computer`;

  //Get Player array of pokemon
  const playerPokemonIdArray = getPokemomIds(checkedValues, numberOfCardsSelected);

  const computerPokemonIdArray = getPokemomIds(checkedValues, numberOfCardsSelected);

  playerPokemonArray = await Promise.all(
    playerPokemonIdArray.map(async (pokemon) => {
      return await getPokemon(pokemon.id);
    })
  );

  computerPokemonArray = await Promise.all(
    computerPokemonIdArray.map(async (pokemon) => {
      return await getPokemon(pokemon.id);
    })
  );

  console.log(playerPokemonArray);

  updatePlayerCard(playerPokemonArray[0]);
  updateComputerCard(computerPokemonArray[0]);
  updateGif();

  // Hide the hero section
  document.querySelector(".hero").style.display = "none";
  document.getElementById("game").classList.remove("d-none");
};

const getPokemomIds = (checkedValues, numberOfCardsSelected) => {
  const pokemonArray = [];
  for (let i = 0; i < parseInt(numberOfCardsSelected); i++) {
    const gen = checkedValues[Math.floor(Math.random() * checkedValues.length)];
    const pokeId = Math.floor(Math.random() * (gen.end - gen.start + 1) + gen.start);
    pokemonArray.push({ id: pokeId });
  }
  return pokemonArray;
};

const getPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const imageUrl = data.sprites.other.dream_world.front_default || data.sprites.front_default;
    const gifUrl = data.sprites.other.showdown.front_default || data.sprites.front_default;
    const object = {
      id: id,
      name: data.name.toUpperCase(),
      imageUrl: imageUrl,
      gifUrl: gifUrl,
      displayInBox: false,
      stats: {
        weight: data.weight,
        height: data.height,
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defence: data.stats[2].base_stat,
        spattack: data.stats[3].base_stat,
        spdefence: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
    };
    return object;
  } catch (err) {
    console.log(err);
  }
};

const updatePlayerCard = (pokeData) => {
  //Set pokemon name/image
  playerName.textContent = pokeData.name;
  playerId.textContent = `#${pokeData.id}`;
  playerWeight.textContent = pokeData.stats.weight;
  playerHeight.textContent = pokeData.stats.height;
  playerImg.src = pokeData.imageUrl;

  //Set pokemon stats
  playerHealth.textContent = pokeData.stats.health;
  playerAttack.textContent = pokeData.stats.attack;
  playerDefence.textContent = pokeData.stats.defence;
  playerSpAttack.textContent = pokeData.stats.spattack;
  playerSpDefence.textContent = pokeData.stats.spdefence;
  playerSpeed.textContent = pokeData.stats.speed;

  //Set pokemon stat progress bars
  playerHealthProgress.style.width = `${(pokeData.stats.health / 255) * 100}%`;
  playerAttackProgress.style.width = `${(pokeData.stats.attack / 255) * 100}%`;
  playerDefenceProgress.style.width = `${(pokeData.stats.defence / 255) * 100}%`;
  playerSpAttackProgress.style.width = `${(pokeData.stats.spattack / 255) * 100}%`;
  playerSpDefenceProgress.style.width = `${(pokeData.stats.spdefence / 255) * 100}%`;
  playerSpeedProgress.style.width = `${(pokeData.stats.speed / 255) * 100}%`;
};

const updateComputerCard = (pokeData) => {
  // Set pokemon name/image
  computerName.textContent = pokeData.name;
  computerId.textContent = `#${pokeData.id}`;
  computerWeight.textContent = pokeData.stats.weight;
  computerHeight.textContent = pokeData.stats.height;
  computerImg.src = pokeData.imageUrl;

  // Set pokemon stats
  computerHealth.textContent = pokeData.stats.health;
  computerAttack.textContent = pokeData.stats.attack;
  computerDefence.textContent = pokeData.stats.defence;
  computerSpAttack.textContent = pokeData.stats.spattack;
  computerSpDefence.textContent = pokeData.stats.spdefence;
  computerSpeed.textContent = pokeData.stats.speed;

  // Set pokemon stat progress bars
  computerHealthProgress.style.width = `${(pokeData.stats.health / 255) * 100}%`;
  computerAttackProgress.style.width = `${(pokeData.stats.attack / 255) * 100}%`;
  computerDefenceProgress.style.width = `${(pokeData.stats.defence / 255) * 100}%`;
  computerSpAttackProgress.style.width = `${(pokeData.stats.spattack / 255) * 100}%`;
  computerSpDefenceProgress.style.width = `${(pokeData.stats.spdefence / 255) * 100}%`;
  computerSpeedProgress.style.width = `${(pokeData.stats.speed / 255) * 100}%`;
};

const newCard = (winner) => {
  playerPokemonArray[0].displayInBox = true;
  computerPokemonArray[0].displayInBox = true;
  if (winner === "player") {
    playerPokemonArray.push(playerPokemonArray.shift());
    const removedCard = computerPokemonArray.shift();
    playerPokemonArray.push(removedCard);
    computerWinner = false;
  } else if (winner === "computer") {
    computerPokemonArray.push(computerPokemonArray.shift());
    const removedCard = playerPokemonArray.shift();
    computerPokemonArray.push(removedCard);
    computerWinner = true;
  } else {
    playerPokemonArray.push(playerPokemonArray.shift());
    computerPokemonArray.push(computerPokemonArray.shift());
    computerWinner = false;
  }
  disableButtons();
};

const updateGif = () => {
  let tempPlayer = ``;
  let tempComputer = ``;
  playerPokemonArray.forEach((pokemon) => {
    if (pokemon.displayInBox) {
      tempPlayer += `<div>
      <img
          src="${pokemon.gifUrl}"
          class="pokemon-sprite mx-auto d-block"
          alt="Pokemon Sprite"
      />
  </div>`;
    } else {
      tempPlayer += `<div>
      <img
          src="./assets/pokeball.gif"
          class="pokemon-sprite mx-auto d-block"
          alt="Pokemon Sprite"
      />
  </div>`;
    }
  });
  computerPokemonArray.forEach((pokemon) => {
    if (pokemon.displayInBox) {
      tempComputer += `<div>
      <img
          src="${pokemon.gifUrl}"
          class="pokemon-sprite mx-auto d-block"
          alt="Pokemon Sprite"
      />
  </div>`;
    } else {
      tempComputer += `<div>
      <img
          src="./assets/pokeball.gif"
          class="pokemon-sprite mx-auto d-block"
          alt="Pokemon Sprite"
      />
  </div>`;
    }
  });
  gifPlayerPokemon.innerHTML = tempPlayer;
  gifComputerPokemon.innerHTML = tempComputer;
};

const compareStats = (selectedStat) => {
  const playerStat = parseInt(playerPokemonArray[0].stats[selectedStat]);
  const computerStat = parseInt(computerPokemonArray[0].stats[selectedStat]);
  console.log("player-stats:", playerStat);
  console.log("computer-stats:", computerStat);

  if (playerStat > computerStat) {
    console.log("Player wins");
    highlightWinner("player", selectedStat);
    newCard("player");
  } else if (playerStat < computerStat) {
    console.log("Computer wins");
    highlightWinner("computer", selectedStat);
    newCard("computer");
  } else {
    console.log("draw");
    highlightWinner("draw", selectedStat);
    newCard("draw");
  }
  disableButtons();
  hideCardOverlay();
  nextCardBtn.classList.remove("disabled");
};

const highlightWinner = (winner, selectedStat) => {
  const playerSelectedId = `${selectedStat}Selected`;
  const computerSelectedId = `computer${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)}Selected`;

  // Set default colors
  const winColor = "#c8e6c9";
  const loseColor = "#e6c8c8";
  const drawColor = "#c0c0c0";

  // Apply colors based on the winner
  if (winner === "player") {
    document.getElementById(playerSelectedId).style.backgroundColor = winColor;
    document.getElementById(computerSelectedId).style.backgroundColor = loseColor;
    playerCardBorder.style.outline = `5px solid ${winColor}`;
    computerCardBorder.style.outline = `5px solid ${loseColor}`;
    gameAlert.innerHTML = `<div class="alert alert-success text-center font-weight-bold heading-3" role="alert">Your card wins!</div>`;
  } else if (winner === "computer") {
    document.getElementById(playerSelectedId).style.backgroundColor = loseColor;
    document.getElementById(computerSelectedId).style.backgroundColor = winColor;
    playerCardBorder.style.outline = `5px solid ${loseColor}`;
    computerCardBorder.style.outline = `5px solid ${winColor}`;
    gameAlert.innerHTML = `<div class="alert alert-danger text-center font-weight-bold heading-3" role="alert">Your card loses!</div>`;
  } else {
    document.getElementById(playerSelectedId).style.backgroundColor = drawColor;
    document.getElementById(computerSelectedId).style.backgroundColor = drawColor;
    playerCardBorder.style.outline = `5px solid ${drawColor}`;
    computerCardBorder.style.outline = `5px solid ${drawColor}`;
    gameAlert.innerHTML = `<div class="alert alert-secondary text-center font-weight-bold heading-3" role="alert">You both draw!</div>`;
  }
};

heightSelected.addEventListener("click", () => {
  compareStats("height");
});
weightSelected.addEventListener("click", () => {
  compareStats("weight");
});
healthSelected.addEventListener("click", () => {
  compareStats("health");
});
attackSelected.addEventListener("click", () => {
  compareStats("attack");
});
defenceSelected.addEventListener("click", () => {
  compareStats("defence");
});
spattackSelected.addEventListener("click", () => {
  compareStats("spattack");
});
spdefenceSelected.addEventListener("click", () => {
  compareStats("spdefence");
});
speedSelected.addEventListener("click", () => {
  compareStats("speed");
});

const updateScore = () => {
  scoringDiv.innerText = `Cards: You ${playerPokemonArray.length} | ${computerPokemonArray.length} Computer`;
};

nextCardBtn.addEventListener("click", () => {
  updateGif();
  showCardOverlay();
  updateScore();
  removeBackground();
  updatePlayerCard(playerPokemonArray[0]);
  updateComputerCard(computerPokemonArray[0]);
  nextCardBtn.classList.add("disabled");

  if (computerWinner) {
    computersTurn();
    return;
  }

  enableButtons();
});

const computersTurn = () => {
  if (difficulty == 1) {
    const listOfStats = ["height", "weight", "health", "attack", "defence", "spattack", "spdefence", "speed"];
    const randomStat = listOfStats[Math.floor(Math.random() * listOfStats.length)];
    gameAlert.innerHTML = `<div class="alert alert-secondary text-center font-weight-bold heading-3 d-flex justify-content-center align-items-center" role="alert">
    <div class="spinner-border text-info" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <span class="ms-2">Opponent is picking their card</span>
  </div>`;

    setTimeout(() => {
      compareStats(randomStat);
    }, 2000);
  }
};

const disableButtons = () => {
  heightSelected.classList.add("disabled");
  weightSelected.classList.add("disabled");
  healthSelected.classList.add("disabled");
  attackSelected.classList.add("disabled");
  defenceSelected.classList.add("disabled");
  spattackSelected.classList.add("disabled");
  spdefenceSelected.classList.add("disabled");
  speedSelected.classList.add("disabled");
};

const enableButtons = () => {
  heightSelected.classList.remove("disabled");
  weightSelected.classList.remove("disabled");
  healthSelected.classList.remove("disabled");
  attackSelected.classList.remove("disabled");
  defenceSelected.classList.remove("disabled");
  spattackSelected.classList.remove("disabled");
  spdefenceSelected.classList.remove("disabled");
  speedSelected.classList.remove("disabled");
};

const removeBackground = () => {
  heightSelected.style.backgroundColor = null;
  weightSelected.style.backgroundColor = null;
  healthSelected.style.backgroundColor = null;
  attackSelected.style.backgroundColor = null;
  defenceSelected.style.backgroundColor = null;
  spattackSelected.style.backgroundColor = null;
  spdefenceSelected.style.backgroundColor = null;
  speedSelected.style.backgroundColor = null;
  computerHeightSelected.style.backgroundColor = null;
  computerWeightSelected.style.backgroundColor = null;
  computerHealthSelected.style.backgroundColor = null;
  computerAttackSelected.style.backgroundColor = null;
  computerDefenceSelected.style.backgroundColor = null;
  computerSpattackSelected.style.backgroundColor = null;
  computerSpdefenceSelected.style.backgroundColor = null;
  computerSpeedSelected.style.backgroundColor = null;
  playerCardBorder.style.outline = null;
  computerCardBorder.style.outline = null;
  gameAlert.innerHTML = `<div class="alert alert-secondary text-center font-weight-bold heading-3" role="alert">Pick your stat to beat the opponent</d>`;
};
