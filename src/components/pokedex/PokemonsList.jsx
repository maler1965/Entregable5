
import { useState } from 'react';
import PokemonCard from './PokemonCard'


const PokemonsList = ({ pokemons }) => {

    let changeModoDark = localStorage.getItem('modoDark');
    const [darkMode] = useState(changeModoDark)


    return (
        <div className={` ${darkMode === 'true' ? "bg-zinc-200 " : " bg-gradient-to-r from-black to-violet-700 "} `}  >
            <section className='z-0 grid gap-8 overflow-x-hidden grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto py-6'>

                {pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)}

            </section>
        </div>
    )
}

export default PokemonsList