
import { useDispatch } from 'react-redux'
import FooterHome from '../components/home/FooterHome'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    dispatch(setNameTrainer(nameTrainer))
    navigate("/pokedex")
  }



  return (
    <main className='grid grid-rows-[1fr_auto] min-h-screen'>
      {/*seccion superior */}
      <section  >
        <div className=" flex justify-center p-8  mt-9">
          <img src="/images/logo.png" alt="" />
        </div>
        <h3 className="text-red-500 flex mt-8 justify-center text-[30px] font-bold">Hello trainer!</h3>
        <p className="  flex  justify-center p-4 text-[20px]">For start, give me your name:</p>


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