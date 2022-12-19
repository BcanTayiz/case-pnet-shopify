import { Link } from "react-router-dom"


const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to='/'><h2>Ecommerce Exchange</h2></Link>
                <Link to='/products'><h2>Products</h2></Link>
                <Link to='/about'><h2>About</h2></Link>
                <Link to='/contact'><h2>Contact</h2></Link>
            </div>
        </header>
    )
}

export default Navbar