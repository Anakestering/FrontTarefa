import {Link} from 'react-router-dom';

export function Header(){
    return(
        <header>
            <nav className='flex p-4 gap-4'>
                <Link to="/">INICIO</Link>
                <Link to="/consultar">CONSULTAR</Link>
            </nav>
        </header>
    )
}