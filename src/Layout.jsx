import {Outlet,Link} from 'react-router-dom'

function Layout(){

    return(
        <>
            {/* <Link to="/" className="yes">Home</Link>
            <Link to="/input">InputRecipe</Link>
            <Link to="/recipe">Recipe</Link> */}
        <Outlet/>
        </>
    )
}

export default Layout;