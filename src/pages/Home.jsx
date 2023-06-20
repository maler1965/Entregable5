
import { useDispatch } from 'react-redux'
import FooterHome from '../components/home/FooterHome'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  //console.log('form  ')

  const handleSubmit = (e) => {
    //  console.log('form1  ')
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value
    // console.log('form2  ', nameTrainer)
    dispatch(setNameTrainer(nameTrainer))
    navigate("/pokedex")
  }


  //

  return (
    <main className='grid grid-rows-[1fr_auto] min-h-screen'>
      {/*seccion superior */}
      <section>
        <div>
          <img src="/images/logo.png" alt="" />
        </div>
        <h3>Hello trainer!</h3>
        <p>For start, give me your name:</p>

        <form onSubmit={handleSubmit}>
          <input required id='nameTrainer' type="text" />
          <button>Start!</button>
        </form>

      </section>

      {/*seccion inferior */}
      <FooterHome />

    </main>
  )
}

export default Home