// Desc: Logo component
import logo from "../assets/logo.jpg"
function Logo({width = '100px'}){
    return(
        <img src={logo} alt="Logo Image" width={width} className="rounded-full animate-mymove"/>
    )
}

export default Logo;