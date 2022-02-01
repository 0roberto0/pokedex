const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    const pokemonPromises = []
    
    let i = 1
    while (i <= 150) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
        i++
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeinfo => typeinfo.type.name)

                accumulator += `
                    <li class= "card ${types[0]}">
                        <img class="card-image" alt= "${pokemon.name}" src="${pokemon.sprites.other.dream_world.front_default}">
                        <h2 clasa= "card-tittle">${pokemon.id}. ${pokemon.name}</h2>
                        <p clasa= "card-subtittle">${types.join(' | ')}</p>
                    </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })
}

fetchPokemon() 