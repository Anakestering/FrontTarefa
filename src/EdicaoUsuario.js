import { useState, useEffect } from 'react'

export function EdicaoUsuario({ usuario, onClose, onSaveSuccess }) {

    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        dataVencimento: '',
        prioridade: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (usuario) {
            setFormData({
                titulo: usuario.titulo,
                descricao: usuario.descricao,
                dataVencimento: usuario.dataVencimento
                    ? usuario.dataVencimento.slice(0, 16)
                    : "",
                prioridade: usuario.prioridade
            })
        }
    }, [usuario])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {

            const response = await fetch(`http://localhost:8080/api/usuario/${usuario.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })

            if (response.ok) {
                alert('Tarefa atualizada com sucesso!')
                onSaveSuccess();
                onClose();
            } else {
                alert("Erro ao atualizar, tente novamente mais tarde")
            }

        } catch (error) {
            alert("Erro ao acessar o backend. Revise a conexão")
        }

        setIsLoading(false);
    }

    if (!usuario) {
        return null;
    }

    return (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-[4px] flex justify-center items-center  z-50'>
            <div className='bg-white p-6 border border-black/20 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.45)] w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-4'>Editar usuário</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='titulo' className='block text-sm font-medium text-gray-700'></label>
                        <input
                            type='text'
                            name='titulo'
                            id='titulo'
                            value={formData.titulo}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor='descricao' className='block text-sm font-medium text-gray-700'></label>
                        <textarea
                            type='text'
                            name='descricao'
                            id='descricao'
                            value={formData.descricao}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor='dataVencimento' className='block text-sm font-medium text-gray-700'></label>
                        <input
                            type='datetime-local'
                            name='dataVencimento'
                            id='dataVencimento'
                            value={formData.dataVencimento}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor='prioridade' className='block text-sm font-medium text-gray-700'>Prioridade</label>
                        <select
                            name='prioridade'
                            id='prioridade'
                            value={formData.prioridade}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                    </div>



                    <div className='flex justify-end gap-4 mt-6'>
                        <button
                            className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover: bg-gray-400'
                            type='button'
                            disabled={isLoading}
                            onClick={onClose}
                        >Cancelar
                        </button>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='px-3 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-sky-300'
                        >{isLoading ? 'Salvando...' : 'Salvar'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}