import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header2 from '../components/pokedex/Header2'

const PokemonId = () => {
    const [pokemon, setPokemon] = useState(null)
    const { pokemonName } = useParams()

    //console.log('detalle 1 ', pokemonName)
    // console.log('detalle 2 ', pokemon)

    const porcentProgresStat = (baseStat) => {
        const STAT_MAX = 255
        return `${(baseStat * 100) / STAT_MAX}%`

    }

    const pokeLinearGradiendts = {
        grass: 'bg-gradient-to-t from-black to-green-500',
        fire: 'bg-gradient-to-t from-black to-red-500',
        normal: 'bg-gradient-to-t from-black to-lime-300',
        fighting: 'bg-gradient-to-t from-black to-blue-500',
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

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

        axios.get(URL)
            .then(({ data }) => setPokemon(data))
            .catch((err) => console.log(err))
    }, [])



    return (
        <main >
            <Header2 />

            <section className='z-0  justify-center max-w-[1024px] mx-auto py-8'>
                {/* informacion detalle de pokemon      */}

                <article className=' bg-zinc-100 ' >
                    {/* */}
                    <section className={`flex justify-center relative rounded-md mt-[62px] p-2 h-[140px] ${pokeLinearGradiendts[pokemon?.types[0].type.name]}`}>
                        <div className='absolute   px-12 -top-14'>
                            <img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} className="w-[200px] h-[200px] " />
                        </div>
                    </section>


                    <section>

                        <div className='flex justify-center  '>
                            <h3 className=' rounded-md border border-black font-bold text-[20px] mt-4 h-auto px-2 '> # {pokemon?.order}</h3>
                        </div>

                        <div className='flex justify-evenly'>
                            <hr className='border-gray-300 my-4 px-4' />
                            <h2 className=' font-bold text-[30px]'>{pokemon?.name}</h2>
                            <hr className='border-gray-300 my-4 px-4' />
                        </div>

                        <div className='p-4 flex justify-center'>
                            <div className='p-4'>
                                <label className='flex justify-center text-[13px] font-bold'>Weight</label>
                                <div className='font-bold mx-4 h-auto p-2'>{pokemon?.weight}</div>
                            </div>

                            <div className='p-4'>
                                <label className='flex justify-center text-[13px] font-bold'>Height</label>
                                <div className='font-bold mx-4 h-auto p-2'>{pokemon?.height}</div>
                            </div>
                        </div>

                        {/*   detalles */}

                        <section className=' p-4  flex justify-evenly '>
                            {/**/}
                            <div className=' p-2 flex-col justify-center'>
                                <label className=' px-4 pb-4 text-[20px] font-bold flex justify-center'>Types</label>
                                <div className=' px-4 flex justify-evenly'>
                                    {pokemon?.types[0] && <div className={`${pokeLinearGradiendts[pokemon.types[0].type.name]} text-white rounded-md border border-black mx-2 px-4 font-bold h-auto p-2`}>{pokemon.types[0].type.name}</div>}
                                    {pokemon?.types[1] && <div className={`${pokeLinearGradiendts[pokemon.types[1].type.name]} bg-purple-400 text-white rounded-md border border-black mx-2 px-4 font-bold h-auto p-2`}>{pokemon.types[1].type.name}</div>}
                                </div>
                            </div>


                            <div className=' p-2 flex-col justify-center' >
                                <label className=' px-4 pb-4 text-[20px] font-bold flex justify-center'>Abilities</label>
                                <div className=' px-4 flex justify-evenly'>
                                    {pokemon?.abilities[0] && <div className='rounded-md border bg-green-400 border-black mx-4 font-bold h-auto p-2'>{pokemon.abilities[0].ability.name}</div>}
                                    {pokemon?.abilities[1] && <div className='rounded-md border bg-blue-400 border-black mx-4 font-bold h-auto p-2'>{pokemon.abilities[1].ability.name}</div>}
                                </div>
                            </div>

                        </section>


                    </section>





                </article>


                <article className='bg-zinc-100 pb-2 px-2' >


                    {/* Stats */}

                    <div >
                        <div className='p-2'>
                            <hr />
                        </div>
                        <h4 className='pb-4 font-bold text-[25px]'>Stats</h4>
                    </div>


                    <section>
                        {
                            pokemon?.stats.map((stat) => (
                                <article key={stat.stat.url}  >
                                    <div className='flex justify-between'>
                                        <h5>{stat.stat.name}</h5>
                                        <span>{stat.base_stat}/150</span>
                                    </div>


                                    {/* barra de progreso */}
                                    <div className='bg-gray-300 h-8 rounded-md overflow-hidden' >
                                        <div style={{ width: porcentProgresStat(stat.base_stat) }} className='h-full bg-yellow-500'></div>
                                    </div>

                                </article>
                            ))
                        }
                    </section>

                </article>

            </section>
        </main>
    )
}



export default PokemonId