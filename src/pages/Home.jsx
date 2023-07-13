
import { useDispatch } from 'react-redux'
import FooterHome from '../components/home/FooterHome'

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { setdark } from '../store/slices/dark.slice'
import { setNameTrainer } from '../store/slices/dark.slice'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
 

  const { nameTrainer } = useSelector((state) => state.darkSlice);
  

  const { dark } = useSelector(state => state.darkSlice)
  const darkValue = JSON.parse(dark);
 

  localStorage.setItem('numPage', 1);
  console.log('#0 de numPage', localStorage.getItem("numPage") )
  localStorage.setItem('totalPokemon', 12);

  const handleClickModeDark = (e) => {
    e.preventDefault()
    dispatch(setdark(!dark));
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainer(nameTrainer))
    navigate("/pokedex")
  }



  return (
    <main className='grid grid-rows-[1fr_auto] min-h-screen'>

      {/*seccion superior */}
      <section className={` ${darkValue === true ? "bg-white " : "bg-gradient-to-r from-black to-violet-700 "} `} >

        <div className=" flex justify-center p-8  mt-9">
          <img src="/images/logo.png" alt="" />
        </div>

        <div className="flex justify-center  bg-black rounded-md  items-center" >
          {darkValue ? <i onClick={handleClickModeDark} className='text-white text-[30px] bx bxs-moon'></i> : <i onClick={handleClickModeDark} className=' text-white text-[30px] bx bxs-sun'></i>}
          <p className='text-white  py-2 px-4'>Change Mode</p>
        </div>

        <h3 className="text-red-500 flex mt-8 justify-center text-[30px] font-bold">Hello trainer!</h3>
        <p className={`flex  justify-center p-4 text-[20px] ${darkValue === 'true' ? "text-black " : " text-white  "} `} >For start, give me your name:</p>


        <div className=" mt-8 flex  justify-center items-center" >
          <form onSubmit={handleSubmit}>

            <input className="text-black bg-white border border-black text-sm outline-none p-2" placeholder="Write your name..." required id='nameTrainer' type="text" />
            <button className="bg-red-500  hover:bg-red-300 text-sm p-2 px-5 border border-green-700 ">Start!</button>

          </form>
        </div>

      </section>


      {/*seccion inferior */}
      <FooterHome />

    </main>
  )
}

export default Home