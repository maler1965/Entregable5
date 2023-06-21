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
    const [currentPage, setCurrentPage] = useState(1)


    const nameTrainer = useSelector(store => store.nameTrainer)

    const pokemonsByName = pokemons.filter((pokemon) => pokemon?.name.includes(namePokemon.toLowerCase().trim()))


    const handleSubmit = (e) => {
        e.preventDefault()
        setNamePokemon(e.target.namePokemon.value)
    }


    const handleChangeType = (e) => {
        setCurrentType(e.target.value)
    }

    const paginacionLogic = () => {
        const POKEMONS_PER_PAGE = 12
        //pokemon que se van a mostrar en la pagina actual
        const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
        const sliceEnd = sliceStart + POKEMONS_PER_PAGE
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

        //ultima pagina
        const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

        //bloque actual
        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        //Paginas que se mostraran en el bloque actual
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
        setCurrentPage(1)
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
                    setPokemons(pokemonByType)
                })
                .catch((err) => console.log(err))

        }

    }, [currentType])



    return (
        <main>
            <Header />

            <p className="p-4 text-[20px]"> <span className="text-red-500 text-[20px] font-bold">Welcome {nameTrainer} </span> , her you can find your favorite Pokemon</p>


            <form onSubmit={handleSubmit}  >
                <div className=" flex gap-2 justify-center" >
                    <div className="px-4" >
                        <input className="text-black bg-white border border-black text-sm outline-none p-2" id="namePokemon" placeholder="Write a name of Pokemon..." type="text" />
                        <button className="bg-red-500  hover:bg-red-300 text-sm p-2 px-5 border border-green-700 ">Search</button>
                    </div>

                    <select className="p-2 border border-green-700" onChange={handleChangeType} >
                        <option value="">All types of Pokemon</option>

                        {
                            types.map((type) => <option value={type.name} key={type.url} > {type.name} </option>)
                        }

                    </select>
                </div>

            </form>

            <section className="bg-gray-100 min-h-screen text-black">
                {/* lista de pokemon */}
                <PokemonsList pokemons={pokemonInPage} />
            </section>




            {/* Paginacion */}
            <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap ">

                <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>


                <li onClick={handleClickPreviusPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<"}</li>
                {
                    pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-400"} `} key={numberPage} >{numberPage}</li>)
                }
                <li onClick={handleClickNextPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"> {">"} </li>

                <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"> {">>"} </li>

            </ul>




        </main>
    )
}

export default Pokedex