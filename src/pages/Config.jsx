import React, { useState } from 'react'
import Header2 from '../components/pokedex/Header2'

const NUMBERPOKEMONS = [4, 8, 12, 16, 20]


const Config = () => {

    let changeModoDark = localStorage.getItem('modoDark');
    const [darkMode] = useState(changeModoDark)

    const [numPokemons, setNumPokemons] = useState(12)

    const handleChangeType = (e) => {
        setNumPokemons(e.target.value)
    }

    console.log(numPokemons)
    localStorage.setItem('totalPokemon', numPokemons);

    return (
        <div className={` ${darkMode === 'true' ? "bg-white " : " bg-blue-400 min-h-screen "} `} >
            <Header2 />

            <section className='bg-blue-300'>
                <div className='p-4 w-[min(100%, 320px)] border-4 mt-6 overflow-x-hidden rounded-md bg-gray-300'>
                    <h1 className='text-black flex justify-center font-bold'>Search Settings</h1>
                    <p className='flex justify-center'>Choose the number of Pokemon per page you want to see</p>
                    <h3 className='flex justify-center'>Default is 12 per page</h3>

                    <div className='flex justify-center'>
                        <select className="p-2 flex justify-center border border-green-700" onChange={handleChangeType} >
                            <option className='flex justify-center' value="">Numbers of Pokemons</option>

                            {
                                NUMBERPOKEMONS.map((numberPokemon) => <option value={numberPokemon} key={numberPokemon} > {numberPokemon} </option>)
                            }

                        </select>
                    </div>

                </div>
            </section>


        </div>
    )
}

export default Config
