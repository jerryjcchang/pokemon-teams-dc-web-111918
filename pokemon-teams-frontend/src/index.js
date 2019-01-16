const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',function(){

getAllTrainers()

})

function mainDiv(){
  return document.querySelector('#main-div')
}

function getAllTrainers(){
  fetch(TRAINERS_URL)
  .then(r => r.json())
  .then(trainers => {
    trainers.forEach(trainer => renderTrainer(trainer))
  })
}

function renderTrainer(trainer){
  const trainerCard = document.createElement('div')
  trainerCard.classList.add('card')
  trainerCard.dataset.id = trainer.id
  const trainerNamePTag = document.createElement('p')
  trainerNamePTag.innerText = trainer.name
  trainerCard.appendChild(trainerNamePTag)
  const addPokemonButton = document.createElement('button')
  trainerCard.appendChild(addPokemonButton)
  const pokemonList = document.createElement('ul')
  trainer.pokemons.forEach(pokemon => renderPokemonListItem(pokemon, pokemonList))
  trainerCard.appendChild(pokemonList)
  addPokemonButton.innerText = 'Add Pokemon'
  addPokemonButton.dataset.trainerId = trainer.id
  addPokemonButton.addEventListener('click', (e) => {addPokemon(trainer, pokemonList)})
  mainDiv().appendChild(trainerCard)

}

function addPokemon(trainer, pokemonList){
  // if(trainer.pokemons.length < 6){
    let data = {
      "trainer_id": trainer.id
    }
    fetch(POKEMONS_URL,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(function(pokemon){
      if(!pokemon.error){
      renderPokemonListItem(pokemon, pokemonList)
    }
  })
  // }
}

function renderPokemonListItem(pokemon, pokemonList){
  // debugger
  const pokemonListItem = document.createElement('li')
  pokemonListItem.innerText = `${pokemon.nickname} (${pokemon.species})`
  pokemonListItem.id = `pokemon-${pokemon.id}`
  const releaseButton = document.createElement('button')
  releaseButton.classList.add('release')
  releaseButton.dataset.pokemonId = pokemon.id
  releaseButton.innerText = 'Release'
  releaseButton.addEventListener('click', (e) => {releasePokemon(pokemon.id)})
  pokemonListItem.appendChild(releaseButton)
  pokemonList.appendChild(pokemonListItem)
}

function releasePokemon(id){
  event.preventDefault()
  fetch(`http://localhost:3000/pokemons/${id}`,{
    method:"DELETE"
  })
  .then(r => r.json())
  .then((deletedPokemon) => {
    document.querySelector(`#pokemon-${deletedPokemon.id}`).remove()
  })
}
