import React, { useState, useEffect } from 'react';
import { EdicaoUsuario } from './EdicaoUsuario';

export function ListaUsuarios({ sinal, atualizaData }) {

    const [usuarios, setUsuarios] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null)

    useEffect(() => {
        const fetchUsuarios = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:8080/api/listaUsuarios');
                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                } else {
                    setError("Erro ao buscar usuários");
                }
            } catch (error) {
                setError("Erro na conexão com o backend. Está rodando?");
            }
            setIsLoading(false);
        };

        fetchUsuarios();

    }, [sinal]);

    
    const deletarUsuario = async (id) =>{
        if(!window.confirm('Tem certeza que deseja excluir esse usuário?')){
            return;
        }

        try{
            const response = await fetch (`http://localhost:8080/api/deletarTarefa/${id}`, {
                method: 'DELETE',
            })
            if(response.ok){
                atualizaData();
            }else{
                alert("Erro ao excluir usuário. Tente novamente mais tarde!")
            }


        }catch(error){
            alert("Erro de conexão, verifique o backend")
        }

    }

    if (isLoading) {
        return <p className='text-center text-gray-500'>Carregando usuários...</p>;
    }

    if (error) {
        return <p className='text-center text-red-500'>{error}</p>;
    }

    if (usuarios.length === 0) {
        return <p className='text-center text-gray-500'>Nenhum usuário cadastrado ainda.</p>;
    }

    return (
        <div className='mt-8'>
            <h2 className='text-2xl text-gray-800 mb-4'>Usuários cadastrados</h2>
            <ul className='space-y-3'>
                {usuarios.map(usuario => (

                    <li key={usuario.id} className='flex justify-between items-center p-4 bg-white rounded-lg shadow border border-gray-200'>
                        <div>
                            <p className='font-bold text-lg text-sky-700'>{usuario.nome}</p>
                            <p className='text-sm text-gray-600'>{usuario.email}</p>
                            <p className='text-sm text-gray-600'>{usuario.telefone}</p>
                            <p className='text-sm text-gray-600'>{usuario.dataNascimento}</p>
                        </div>
                        <button
                        onClick={() => setUsuarioEmEdicao(usuario)}
                        className='px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
                        >
                            Editar
                        </button>
                        <button 
                        onClick={() => deletarUsuario(usuario.id)}
                         className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'>
                            Excluir
                        </button>
                    </li>


                ))}
            </ul>

                <EdicaoUsuario
                usuario={usuarioEmEdicao}
                onClose={() => setUsuarioEmEdicao(null)}
                onSaveSuccess={atualizaData}
                />


        </div>
    )


}