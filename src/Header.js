import {Link} from 'react-router-dom';

export function Header(){
    return(
        <header className='bg-gray-800 shadow-lg'>
            <nav className='flex p-4 gap-6 items-center'> 
                <h1 className='text-2xl font-extrabold text-white mr-4'>
                    GERENCIADOR DE TAREFAS
                </h1>
                

                <Link 
                    to="/"
                    className='py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300'>
                    INICIO
                </Link>
                
                <Link 
                    to="/consultar"
                    className='py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300'>
                    CONSULTAR
                </Link>
            </nav>
        </header>
    )
}