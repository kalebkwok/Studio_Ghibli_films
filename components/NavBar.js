import Link from "next/link"
import Image from "next/image"
import logo from '../public/Studio_Ghibli_logo.svg.png'

const Navbar = ({account}) =>{
    return (
        <div className ="navbar">
            <div className ="logo-wrapper">
            <Link href="/"><Image src={logo} alt ={"Studio Ghibli"} width={120} height={70}/></Link>

            </div>

            <div className = "account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url}/>
            </div>
        
        </div>
    )
}

export default Navbar