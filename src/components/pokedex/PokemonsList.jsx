
import PokemonCard from './PokemonCard'


const PokemonsList = ({ pokemons }) => {



    return (
        <section className='z-0 grid gap-8 overflow-x-hidden grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto py-6'>

            {pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)}

        </section>
    )
}

export default PokemonsList