import {Link} from 'react-router-dom';
import { ListaUsuarios } from './ListaUsuarios';
import {useState} from 'react'

export function Consult() {

    const [sinal, setSinal] = useState(0);
  
    const dataAtualizada = () => {
        setSinal(prevSinal => prevSinal + 1);
    }

    return (
        <div>
            <h1 className='text-3xl text-gray-800 mb-4'>Listar cadastros</h1>
            <form className='space-y-2'>
                <div className="flex flex-row gap-4">
                    <div>
                        <input
                            placeholder='Pesquisar...'
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <div className='flex justify-center'>
                        <Link className="p-2 border border-black bg-sky-500 hover:bg-sky-700 text-white rounded-lg" to="/cadastro">+CADASTRAR</Link>
        
                        </div>
                    </div>
                </div>
            </form>
            <ListaUsuarios
            sinal = {sinal}
            atualizaData = {dataAtualizada}
            />
        </div>
    );
}