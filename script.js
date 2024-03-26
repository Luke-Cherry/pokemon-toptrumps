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
const playerSpAttackProgress = document.getElementById(
  "playerSpAttackProgress"
);
const playerSpDefenceProgress = document.getElementById(
  "playerSpDefenceProgress"
);
const playerSpeedProgress = document.getElementById("playerSpeedProgress");

let playerPokemonArray = [];

const startGame = async () => {
  // Get generations selected
  const checkedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const checkedValues = Array.from(checkedCheckboxes).map(
    (checkbox) => GENERATIONLIST[checkbox.value]
  );

  // Check if at least one checkbox is checked
  if (checkedValues.length === 0) {
    alert("Please select at least one generation.");
    return;
  }

  //Gets the number of cards player selected to play with
  const numberOfCardsSelected = numberOfCards.value;

  //Get Player array of pokemon
  const playerPokemonIdArray = getPokemomIds(
    checkedValues,
    numberOfCardsSelected
  );

    playerPokemonArray = await Promise.all(playerPokemonIdArray.map(async (pokemon) => {
    return await getPokemon(pokemon.id);
  }));

  console.log(playerPokemonArray);

  updatePlayerCard(playerPokemonArray[0])

  // Hide the hero section
  document.querySelector(".hero").style.display = "none";
};

const getPokemomIds = (checkedValues, numberOfCardsSelected) => {
  const pokemonArray = [];
  for (let i = 0; i < parseInt(numberOfCardsSelected); i++) {
    const gen = checkedValues[Math.floor(Math.random() * checkedValues.length)];
    const pokeId = Math.floor(
      Math.random() * (gen.end - gen.start + 1) + gen.start
    );
    pokemonArray.push({ id: pokeId });
  }
  return pokemonArray;
};


const getPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const object = {
      id: id,
      name: data.name.toUpperCase(),
      imageUrl: data.sprites.front_default,
      stats: {
        weight: data.weight,
        height: data.height,
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
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
    console.log(pokeData)
    //Set pokemon name/image
    playerName.textContent = pokeData.name;
    playerId.textContent = `#${pokeData.id}`;
    playerWeight.textContent = pokeData.stats.weight;
    playerHeight.textContent = pokeData.stats.height;
    playerImg.src = pokeData.imageUrl;

    //Set pokemon stats
    playerHealth.textContent = pokeData.stats.health;
    playerAttack.textContent = pokeData.stats.attack;
    playerDefence.textContent = pokeData.stats.defense;
    playerSpAttack.textContent = pokeData.stats.spattack;
    playerSpDefence.textContent = pokeData.stats.spdefence;
    playerSpeed.textContent = pokeData.stats.speed;

    //Set pokemon stat progress bars
    playerHealthProgress.style.width = `${
      (pokeData.stats.health / 255) * 100
    }%`;
    playerAttackProgress.style.width = `${
      (pokeData.stats.attack / 255) * 100
    }%`;
    playerDefenceProgress.style.width = `${
      (pokeData.stats.defense / 255) * 100
    }%`;
    playerSpAttackProgress.style.width = `${
      (pokeData.stats.spattack / 255) * 100
    }%`;
    playerSpDefenceProgress.style.width = `${
      (pokeData.stats.spdefence / 255) * 100
    }%`;
    playerSpeedProgress.style.width = `${
      (pokeData.stats.speed / 255) * 100
    }%`;
}

const newCard = () => {
    playerPokemonArray.shift();
    console.log(playerPokemonArray);
    updatePlayerCard(playerPokemonArray[0])
    
}

/* //Set pokemon name/image
    playerName.textContent = `${data.name.toUpperCase()}`;
    playerId.textContent = `#${data.id}`;
    playerWeight.textContent = `${data.weight}`;
    playerHeight.textContent = `${data.height}`;
    playerImg.src = `${data.sprites.front_default}`;

    //Set pokemon stats
    playerHealth.textContent = data.stats[0].base_stat;
    playerAttack.textContent = data.stats[1].base_stat;
    playerDefence.textContent = data.stats[2].base_stat;
    playerSpAttack.textContent = data.stats[3].base_stat;
    playerSpDefence.textContent = data.stats[4].base_stat;
    playerSpeed.textContent = data.stats[5].base_stat;

    //Set pokemon stat progress bars
    playerHealthProgress.style.width = `${
      (data.stats[0].base_stat / 255) * 100
    }%`;
    playerAttackProgress.style.width = `${
      (data.stats[1].base_stat / 255) * 100
    }%`;
    playerDefenceProgress.style.width = `${
      (data.stats[2].base_stat / 255) * 100
    }%`;
    playerSpAttackProgress.style.width = `${
      (data.stats[3].base_stat / 255) * 100
    }%`;
    playerSpDefenceProgress.style.width = `${
      (data.stats[4].base_stat / 255) * 100
    }%`;
    playerSpeedProgress.style.width = `${
      (data.stats[5].base_stat / 255) * 100
    }%`; */
