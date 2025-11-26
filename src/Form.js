import { useForm } from 'react-hook-form';
import React, {useState} from 'react';

export function Form() {
    const [apiMensagem, setApiMensagem] = useState(null);

    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm({ mode: 'onBlur' });
    //Arrow Function
    const onSubmit = async (data) => {
        setApiMensagem(null);
        console.log("Enviando dados para o backend: ", data)
        try{
            const response  = await fetch('http://localhost:8080/api/cadastro/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });

            if(response.ok){
                const mensagemSucesso = await response.text();
                setApiMensagem({type: 'success', text: mensagemSucesso});
                console.log("Resposta do backend: ", mensagemSucesso);
                reset();
            }else{
                const mensagemFalhou = await response.text();
                setApiMensagem({type: 'error', text: `Erro ${mensagemFalhou}`})
            }
        }catch(error){
            setApiMensagem({type: 'error', text: 'Erro na conexão, verifique novamente'})

        }
    }
    return (
        <div>
            <h1 className='text-3xl text-gray-800 mb-4'>Cadastrar tarefa</h1>
            <form className='space-y-2' onSubmit={handleSubmit(onSubmit)} noValidate>
                <label className='block text-sm font-medium text-gray-700'>Título </label>
                <input
                    placeholder='Digite o título'
                    {...register("titulo", { required: "O título é obrigatório" })}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.titulo && <p className='text-red-600 text-sm'>{errors.titulo.message}</p>}
                
                
                <label className='block text-sm font-medium text-gray-700'>Descrição </label>
                <input placeholder='Digite a descrição' type='text'
                    {...register("descricao", { required: "A descrição é obrigatória" })}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.descricao && <p className='text-red-600 text-sm'>{errors.descricao.message}</p>}
                <label className='block text-sm font-medium text-gray-700'> Data Vencimento </label>
                
                
                <input type='text'
                    {...register("dataVencimento")}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.dataVencimento && <p className='text-red-600 text-sm'>{errors.dataVencimento.message}</p>}
                
                
                <label className='block text-sm font-medium text-gray-700'>Prioridade </label>
                <input type='text' 
                    {...register("prioridade", { required: "A prioridade é obrigatória"})}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.prioridade && <p className='text-red-600 text-sm'>{errors.prioridade.message}</p>}
                
                
                <div className='flex justify-center'>
                    <button className="flex w-1/2 justify-center mt-2 p-3 bg-sky-500 hover:bg-sky-700 text-white rounded-lg" type='submit'>Enviar</button>
                </div>
            </form>
    
            
            {apiMensagem && (
                <div className={`mt-4 p-3 rounded-lg text-center ${apiMensagem.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
                    {apiMensagem.text}
            </div>
            )}    
        </div>
    )
}