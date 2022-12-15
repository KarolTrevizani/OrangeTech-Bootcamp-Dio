
let offset = 0
const limit = 10
const maxRecords = 350

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const buttonDetails = document.getElementById('buttonDetail')

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {  
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number"> #${pokemon.number} </span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    
                    <img src="${pokemon.photo}" 
                    alt=${pokemon.name}>
                </div>
            </li>`
        ).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

buttonDetails.addEventListener('click', () => {
    console.log('Fui clicado')
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {  
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon2 ${pokemon.type}">

                <div class="imagePokemon">
                    <img src="${pokemon.photo}" 
                    alt=${pokemon.name}>
                </div>

                <span class="name2">${pokemon.name}</span>
                <span class="title"> Abilities </span>

                <div class="detail2">              
                    <ol class="types2">
                        ${pokemon.abilities.map((abilitiesSlot) => `<li class="type2 ${abilitiesSlot.ability.name}">${abilitiesSlot.ability.name}</li>`).join('')}
                    </ol>
                </div>
            </li>`
        ).join('')
        pokemonList.innerHTML = newHtml
    })
})

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})