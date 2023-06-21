import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const pokeLinearGradiendts = {
    grass: 'bg-gradient-to-t from-black to-green-500',
    fire: 'bg-gradient-to-t from-black to-red-500',
    normal: 'bg-gradient-to-t from-black to-lime-300',
    fighting: 'bg-gradient-to-t from-black to-blue-600',
    flying: 'bg-gradient-to-t from-black to-purple-400',
    poison: 'bg-gradient-to-t from-black to-rose-300',
    ground: 'bg-gradient-to-t from-black to-fuchsia-500',
    rock: 'bg-gradient-to-t from-black to-amber-700',
    bug: 'bg-gradient-to-t from-black to-violet-500',
    ghost: 'bg-gradient-to-t from-black to-blue-400',
    steel: 'bg-gradient-to-t from-black to-slate-200',
    water: 'bg-gradient-to-t from-black to-indigo-200',
    grass: 'bg-gradient-to-t from-black to-emerald-300',
    electric: 'bg-gradient-to-t from-black to-teal-200',
    psychic: 'bg-gradient-to-t from-black to-yellow-300',
    ice: 'bg-gradient-to-t from-black to-sky-200',
    dragon: 'bg-gradient-to-t from-black to-pink-400',
    dark: 'bg-gradient-to-t from-black to-purple-700',
    fairy: 'bg-gradient-to-t from-black to-orange-300',
    unknown: 'bg-gradient-to-t from-black to-fuchsia-100',
    shadow: 'bg-gradient-to-t from-black to-red-300',

}

const pokeLinearColorBorder = {
    grass: ' border-green-500 ',
    fire: 'border-red-500',
    normal: 'border-lime-300',
    fighting: 'border-blue-600',
    flying: 'border-purple-400',
    poison: 'border-rose-300',
    ground: 'border-fuchsia-500',
    rock: 'border-amber-700',
    bug: 'border-violet-500',
    ghost: 'border-blue-400',
    steel: 'border-slate-200',
    water: 'border-indigo-200',
    grass: 'border-emerald-300',
    electric: 'border-teal-200',
    psychic: 'border-yellow-300',
    ice: 'border-sky-200',
    dragon: 'border-pink-400',
    dark: 'border-purple-700',
    fairy: 'border-orange-300',
    unknown: 'border-fuchsia-100',
    shadow: 'border-red-300',
}


const PokemonCard = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState(null)

    const formatTypesPokemon = (types = []) => {
        const nameTypes = types.map((type) => type.type.name)
        const titleTypes = nameTypes.join(" / ")
        return titleTypes
    }


    useEffect(() => {
        axios.get(pokemonUrl)
            .then(({ data }) => setPokemon(data))
            .catch((err) => console.log(err))
    }, [])


    return (
        <Link to={`/pokedex/${pokemon?.name}`} >

            {/*aqui se hace lo mismo con los bordes, igual que los colores del fondo */}
            <div className={`p-1 border-4 mt-6 rounded-md bg-gray-300 ${pokeLinearColorBorder[pokemon?.types[0].type.name]}`} >


                {/*seccion superior */}
                <section className={` relative h-40 ${pokeLinearGradiendts[pokemon?.types[0].type.name]}`}>
                    <div className='absolute px-12 -bottom-14'>
                        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} />
                    </div>
                </section>


                {/*seccion inferior */}
                <section >
                    <div className='text-center'>
                        <h3 className='text-[30px] mt-14'>{pokemon?.name} </h3>
                        <h5 className='text-[18px] '>{formatTypesPokemon(pokemon?.types)} </h5>
                        <span className='p-2'>type</span>
                    </div>

                    <div className='p-2'>
                        <hr />
                    </div>

                    <section className='grid grid-cols-2 gap-4'>
                        {/*lista de stats */}
                        {
                            pokemon?.stats.slice(0, 4).map(stat => (
                                <div className='p-4 text-center' key={stat.stat.url}>
                                    <h6>{stat.stat.name} </h6>
                                    <span> {stat.base_stat}</span>
                                </div>
                            ))
                        }
                    </section>
                </section>

            </div>

        </Link>
    )
}

export default PokemonCard