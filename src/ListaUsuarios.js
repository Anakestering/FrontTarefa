import React, { useState, useEffect } from 'react';
import { EdicaoUsuario } from './EdicaoUsuario';

export function ListaUsuarios({ sinal, atualizaData }) {

    const [usuarios, setUsuarios] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null)

    const getPriorityColor = (prioridade) => {
        switch (prioridade) {
            case 'Alta':
                // Cor de texto forte (text-red-800) e fundo suave (bg-red-200)
                return 'bg-red-200 text-red-800';
            case 'Média':
                // Cor de texto forte e fundo suave de Amarelo/Âmbar
                return 'bg-yellow-200 text-yellow-800';
            case 'Baixa':
                // Cor de texto forte e fundo suave de Verde
                return 'bg-green-200 text-green-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

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
                    setError("Erro ao buscar tarefa");
                }
            } catch (error) {
                setError("Erro na conexão com o backend. Está rodando?");
            }
            setIsLoading(false);
        };

        fetchUsuarios();

    }, [sinal]);


    const deletarUsuario = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir essa tarefa?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/deletarUsuario/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                atualizaData();
            } else {
                alert("Erro ao excluir tarefa. Tente novamente mais tarde!")
            }


        } catch (error) {
            alert("Erro de conexão, verifique o backend")
        }

    }

    if (isLoading) {
        return <p className='text-center text-gray-500'>Carregando tarefas...</p>;
    }

    if (error) {
        return <p className='text-center text-red-500'>{error}</p>;
    }

    if (usuarios.length === 0) {
        return <p className='text-center text-gray-500'>Nenhuma tarefa cadastrada ainda.</p>;
    }

    return (
        <div className='mt-8 p-4 bg-white rounded-xl shadow-lg'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6 border-b pb-3'>Lista de tarefas</h2>
            <ul className='space-y-3'>
                {usuarios.map(usuario => (

                    <li key={usuario.id}
                        className='relative flex flex-col p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-200'>
                        <div className='mb-2'>

                            <p className='font-mono font-extrabold text-xl text-sky-800 tracking-tight pr-20'>
                                {usuario.titulo} </p>

                            <div className='w-full max-h-48 overflow-y-auto p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-inner mt-2'>
                                <p className='text-sm text-gray-700'>
                                    {usuario.descricao} </p>
                            </div>

                            <p className='mt-3 text-sm text-gray-800 font-semibold'>
                                Prioridade: {' '}
                                <span
                                    className={`
                                        inline-flex items-center 
                                        px-3 py-0.5 text-xs font-bold 
                                        rounded-full 
                                        ${getPriorityColor(usuario.prioridade)}
                                        `}
                                >
                                    {usuario.prioridade}
                                </span>
                            </p>

                            <p className='mt-3 text-sm text-gray-800 font-semibold'>Vence dia: {new Date(usuario.dataVencimento).toLocaleString("pt-BR", {
                                dateStyle: "short",
                                timeStyle: "short",
                            })}</p>
                        </div>

                        <div className='absolute top-4 right-4 flex space-x-2'>
                            <button
                                onClick={() => setUsuarioEmEdicao(usuario)}
                                className='px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-600 transition duration-150 shadow-md'>
                                Editar
                            </button>
                            <button
                                onClick={() => deletarUsuario(usuario.id)}
                                className='px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition duration-150 shadow-md'>
                                Excluir
                            </button>
                        </div>
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