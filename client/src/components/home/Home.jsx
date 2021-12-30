import Topbar from '../topbar/Topbar'
import Sidebar from '../sidebar/Sidebar'
import Main from '../main/Main'
import Rightbar from '../rightbar/Rightbar'
import './home.css'

function Home() {
    
    return (
        <>
        <Topbar />
        <div className='home'>
           <Sidebar />
           <Main />
           <Rightbar />
        </div>
        </>
    )
}

export default Home
