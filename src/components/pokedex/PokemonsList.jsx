
import PokemonCard from './PokemonCard'
//import Prueva from '../../pages/Prueva'

const PokemonsList = ({ pokemons }) => {

    // console.log(' list  ', pokemons)
    //const pokemons2 = [1, 2, 3, 4,]
    //key={pokemon.url} pokemonUrl={pokemon.Url}
    // console.log('objeto  ', pokemons)
    /*
     <div>Hola mundo</div>
    <Prueva />


    */

    return (
        <section className='z-0 grid gap-8 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto py-6'>

            {pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)}

        </section>
    )
}

export default PokemonsList