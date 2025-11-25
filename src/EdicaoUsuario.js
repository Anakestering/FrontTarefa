import { useState, useEffect } from 'react'

export function EdicaoUsuario({ usuario, onClose, onSaveSuccess }) {

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (usuario) {
            setFormData({
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone
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
                alert('Usuário atualizado com sucesso!')
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
                        <label htmlFor='nome' className='block text-sm font-medium text-gray-700'></label>
                        <input
                            type='text'
                            name='nome'
                            id='nome'
                            value={formData.nome}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'></label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='telefone' className='block text-sm font-medium text-gray-700'></label>
                        <input
                            type='tel'
                            name='telefone'
                            id='telefone'
                            value={formData.telefone}
                            onChange={handleChange}
                            className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                            required
                        />
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