import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import PokemonsList from "../components/pokedex/PokemonsList"


const Pokedex = () => {


    const [pokemons, setPokemons] = useState([])
    const [namePokemon, setNamePokemon] = useState("")
    const [types, setTypes] = useState([])
    const [currentType, setCurrentType] = useState("")
    

    let newPage = parseInt(localStorage.getItem("numPage"), 10)
    console.log('#1 en numPage', { newPage })
    const [currentPage, setCurrentPage] = useState(newPage)
    console.log('#1 de currentPage', { currentPage })

    let changeModoDark = localStorage.getItem('darkMode');
    

    const { nameTrainer } = useSelector(store => store.darkSlice)


    const pokemonsByName = pokemons.filter((pokemon) => pokemon?.name.includes(namePokemon.toLowerCase().trim())) //filter si puede trabajar con un array vacio  // en includes cuando esta vacio "" y lo compara con cualquier string lo concidera true por eso lo deja pasar, asi cuando el input esta vacio deja pasar todos
    localStorage.setItem('numPage', currentPage);
    console.log('#2 en numPage ', { currentPage })
    console.log('#1 en filter ', { pokemonsByName })
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1)
        setCurrentType("")
        const namePokemonValue = e.target.namePokemonDesktop.value || e.target.namePokemonMobile.value;   
        setNamePokemon(namePokemonValue);
    }



    const handleChangeType = (e) => {
        setNamePokemon("")
        setCurrentPage(1)
        setCurrentType(e.target.value)      
    }

    let endNumPokemon = parseInt(localStorage.getItem("totalPokemon"), 10)
    

    const paginacionLogic = () => {
        const POKEMONS_PER_PAGE = endNumPokemon
        
        const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
        const sliceEnd = sliceStart + POKEMONS_PER_PAGE
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

       
        const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        const pagesInBlock = []
        const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
        const maxPage = actualBlock * PAGES_PER_BLOCK
        for (let i = minPage; i <= maxPage; i++) {
            if (i <= lastPage) {
                pagesInBlock.push(i)
            }
        }
        return { pokemonInPage, lastPage, pagesInBlock }
    }

    const { pokemonInPage, lastPage, pagesInBlock } = paginacionLogic()


    const handleClickPreviusPage = () => {
        const newCurrentPage = currentPage - 1
        if (newCurrentPage >= 1) {
            setCurrentPage(newCurrentPage)
        }
    }

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1
        if (newCurrentPage <= lastPage) {
            setCurrentPage(newCurrentPage)
        }
    }

    useEffect(() => {
        if (namePokemon !== ' ') {
            let newPage = parseInt(localStorage.getItem("numPage"), 10)
            setCurrentPage(newPage)
        } else {
            setCurrentPage(1)
        }

    }, [namePokemon])



    useEffect(() => {
        if (!currentType) {  
            const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1281'

            axios.get(URL)
                .then(({ data }) => setPokemons(data.results))
                .catch((err) => console.log(err))
        }
        
    }, [currentType])  


    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/type'

        axios.get(URL)
            .then(({ data }) => setTypes(data.results))
            .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        if (currentType) {
            const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

            axios.get(URL)
                .then(({ data }) => {
                    const pokemonByType = data.pokemon.map(pokemon => pokemon.pokemon)
                    localStorage.setItem('pokemonType', pokemonByType);
                    console.log({ pokemonByType })
                    setPokemons(pokemonByType)
                })
                .catch((err) => console.log(err))
        }
    }, [currentType])

   

    return (
        <main>

            <Header />

            <div className={` ${changeModoDark === true ? "bg-white " : " bg-blue-400 "} `} >

                <p className="p-4 text-[20px]"> <span className="text-red-500 text-[20px] font-bold">Welcome {nameTrainer} </span> , her you can find your favorite Pokemon</p>

                <form onSubmit={handleSubmit}  >

                    <div className='    block md:hidden'>
                        <div className=" flex-col gap-2 text-center p-2 items-center" >

                            <div className="px-4" >
                                <input className="text-black bg-white border border-black m-1 text-sm outline-none p-2"  id="namePokemonDesktop" placeholder="Write a name of Pokemon..." type="text" />
                                <button className="bg-red-500  hover:bg-red-300 text-sm  m-1 p-2 px-5 border border-green-700 ">Search</button>
                            </div>
                            {/**/}
                            <select className="p-2  m-1 border border-green-700" onChange={handleChangeType} >
                                <option value="">All types of Pokemon</option>

                                {
                                    types.map((type) => <option value={type.name} key={type.url} > {type.name} </option>)
                                }

                            </select>

                        </div>
                    </div>


                    <div className='  hidden md:block'>
                        <div className=" flex  gap-2  p-2 justify-center" >

                            <div className="px-4" >
                                <input className="text-black bg-white border border-black text-sm outline-none p-2"  id="namePokemonMobile" placeholder="Write a name of Pokemon..." type="text" />
                                <button className="bg-red-500  hover:bg-red-300 text-sm p-2 px-5 border border-green-700 ">Search</button>
                            </div>
                            {/**/}
                            <select className="p-2 border border-green-700" onChange={handleChangeType} >
                                <option value="">All types of Pokemon</option>

                                {
                                    types.map((type) => <option value={type.name} key={type.url} > {type.name} </option>)
                                }

                            </select>

                        </div>
                    </div>

                </form>

            </div>



            <div >
                <section className="bg-gray-100 min-h-screen overflow-x-hidden text-black">
                    {/* lista de pokemon */}
                    
                    <PokemonsList pokemons={pokemonInPage} />
                </section>
            </div>



            {/* Paginacion cursor-pointer " bg-blue-400"   */}
            <div className={` ${changeModoDark === true ? "bg-white " : " bg-blue-400 "} `}  >

                <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap ">

                    <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>


                    <li onClick={handleClickPreviusPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<"}</li>
                    {
                        pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 ${numberPage === currentPage ? "bg-red-300 rounded-md text-black" : " bg-red-600 font-bold text-white rounded-md "} `} key={numberPage} >{numberPage}</li>)
                    }
                    <li onClick={handleClickNextPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"> {">"} </li>

                    <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"> {">>"} </li>

                </ul>

            </div>



        </main>
    )
}

export default Pokedex