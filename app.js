const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
    const elementTypes = pokemon.types.map(typeinfo => typeinfo.type.name)
    const abilities = pokemon.abilities.map(abilitiesInfo => abilitiesInfo.ability.name)

    accumulator += `
            <li class= "card ${elementTypes[0]}">
                <img class="card-image" alt= "${pokemon.name}" src="${pokemon.sprites.other.dream_world.front_default}">
                <h2 clasa= "card-tittle">${pokemon.id}. ${pokemon.name}</h2>
                <p clasa= "card-subtittle">Type: ${elementTypes.join(' | ')}</p>
                <p clasa= "card-subtittle">Ability: ${abilities.join(" | ")}</p>                                
            </li>
        `
    return accumulator
}, '')
 
const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons            
}

const pokemonPromises = generatePokemonPromises()

console.log(pokemonPromises)

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)