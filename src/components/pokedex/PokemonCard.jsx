import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const pokeLinearGradiendts = {
    grass: 'bg-gradient-to-t from-black to-green-500',
    fire: 'bg-gradient-to-t from-black to-red-500',
    normal: 'bg-gradient-to-t from-black to-Lime-300',
    fighting: 'bg-gradient-to-t from-black to-Blue-600',
    flying: 'bg-gradient-to-t from-black to-Purple-400',
    poison: 'bg-gradient-to-t from-black to-Rose-300',
    ground: 'bg-gradient-to-t from-black to-Fuchsia-500',
    rock: 'bg-gradient-to-t from-black to-Amber-700',
    bug: 'bg-gradient-to-t from-black to-Violet-500',
    ghost: 'bg-gradient-to-t from-black to-Blue-400',
    steel: 'bg-gradient-to-t from-black to-Slate-200',
    water: 'bg-gradient-to-t from-black to-Indigo-200',
    grass: 'bg-gradient-to-t from-black to-Emerald-300',
    electric: 'bg-gradient-to-t from-black to-Teal-200',
    psychic: 'bg-gradient-to-t from-black to-Yellow-300',
    ice: 'bg-gradient-to-t from-black to-Sky-200',
    dragon: 'bg-gradient-to-t from-black to-Pink-400',
    dark: 'bg-gradient-to-t from-black to-Purple-700',
    fairy: 'bg-gradient-to-t from-black to-Orange-300',
    unknown: 'bg-gradient-to-t from-black to-Fuchsia-100',
    shadow: 'bg-gradient-to-t from-black to-red-300',

} //se tiene que poner los demas colores segun los otros tipos

const pokeLinearColorBorder = {
    grass: ' border-green-500 ',
    fire: 'border-red-500',
    normal: 'border-Lime-300',
    fighting: 'border-Blue-600',
    flying: 'border-Purple-400',
    poison: 'border-Rose-300',
    ground: 'border-Fuchsia-500',
    rock: 'border-Amber-700',
    bug: 'border-Violet-500',
    ghost: 'border-Blue-400',
    steel: 'border-Slate-200',
    water: 'border-Indigo-200',
    grass: 'border-Emerald-300',
    electric: 'border-Teal-200',
    psychic: 'border-Yellow-300',
    ice: 'border-Sky-200',
    dragon: 'border-Pink-400',
    dark: 'border-Purple-700',
    fairy: 'border-Orange-300',
    unknown: 'border-Fuchsia-100',
    shadow: 'border-red-300',
} //se tiene que poner los demas colores segun los otros tipos


const PokemonCard = ({ pokemonUrl }) => {
    //
    // console.log('card  ', pokemonUrl)

    const [pokemon, setPokemon] = useState(null)

    const formatTypesPokemon = (types = []) => {
        const nameTypes = types.map((type) => type.type.name)
        const titleTypes = nameTypes.join(" / ")
        return titleTypes
    }
    /* */

    //console.log('card  ', pokemon)

    useEffect(() => {
        axios.get(pokemonUrl)
            .then(({ data }) => setPokemon(data))
            .catch((err) => console.log(err))
    }, [])

    console.log('color  ', pokemon)

    //bg-gray-300
    return (
        <Link to={`/pokedex/${pokemon?.name}`} > {/*aqui se hace lo mismo con los bordes, igual que los colores del fondo */}

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