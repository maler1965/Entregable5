import { useDispatch } from "react-redux"
import { setNameTrainer } from "../../store/slices/nameTrainer.slice"



const Header = () => {

    const dispatch = useDispatch()


    const handleClickLogout = () => {
        localStorage.removeItem('numPage');
        dispatch(setNameTrainer(""))
    }

    return (
        <section className='relative'>

            {/*seccion roja */}
            <div className='bg-red-600 h-20 relative '>
                <div className="absolute left-2 bottom-0 w-[220px] sm:w-[400px]">
                    <img src="/images/logo2.png" alt="" />
                </div>
            </div>

            {/*seccion negra */}
            <div className='bg-black h-12'></div>

            {/*seccion pokeball */}
            <div className='w-20 aspect-square bg-white border-[10px] border-black rounded-full absolute -bottom-4 right-0 -translate-x-1/2 after:content-[""] after:h-11 after:aspect-square after:bg-gray-800 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[9px] after:border-black ' >
                <button onClick={handleClickLogout} className="absolute left-1/2 top-1/2 text-white z-20 -translate-x-1/2  -translate-y-1/2">X</button>
            </div>

        </section >
    )
}

export default Header