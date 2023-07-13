
import PokemonCard from './PokemonCard'


const PokemonsList = ({ pokemons }) => {

let changeModoDark = localStorage.getItem('darkMode');
    

    return (

        <div  >
          
          { pokemons.length !== 0 ?     
               <div  className={` ${changeModoDark === true ? "bg-zinc-200 " : " bg-gradient-to-r from-black to-violet-700 "} `} >
               <section className='z-0 grid gap-8 overflow-x-hidden grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto py-6'>
                {pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)}
                </section> 
                </div>
                 :
              <div className={` ${changeModoDark === true ? "bg-red-500 my-8 " : " bg-red-500 my-8 "} `} >
                     <h1 className='text-white flex justify-center border-white font-bold  text-center p-2  m-2 '>THERE IS NO MATCH WITH THAT NAME, TRY ANOTHER</h1>
              </div>          
         }
            

        </div>

    )
}


export default PokemonsList