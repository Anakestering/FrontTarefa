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
            <h1 className='text-3xl text-gray-800 mb-4'>Cadastrar usuários</h1>
            <form className='space-y-2' onSubmit={handleSubmit(onSubmit)} noValidate>
                <label className='block text-sm font-medium text-gray-700'>Nome </label>
                <input
                    placeholder='Digite seu nome'
                    {...register("nome", { required: "O nome é obrigatório" })}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.nome && <p className='text-red-600 text-sm'>{errors.nome.message}</p>}
                <label className='block text-sm font-medium text-gray-700'>Email </label>
                <input placeholder='Digite seu email' type='email'
                    {...register("email", { required: "O email é obrigatório", pattern: { value: /^[^\s@]+@[^\s]+\.[^\s]+$/, message: "Email inválido" } })}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}
                <label className='block text-sm font-medium text-gray-700'> Senha </label>
                <input placeholder='Digite sua senha' type='password'
                    {...register("senha", { required: "A senha é obrigatória", minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" } })}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.senha && <p className='text-red-600 text-sm'>{errors.senha.message}</p>}
                <label className='block text-sm font-medium text-gray-700'>Telefone </label>
                <input placeholder='(XX)99999999' type='tel' //criar uma máscara, ajustar o placeholder
                    {...register("telefone", { required: "O telefone é obrigatório", pattern: { value: /^\(\d{2}\)\d{9}$/, message: "Telefone inválido" } })}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.telefone && <p className='text-red-600 text-sm'>{errors.telefone.message}</p>}
                <label className='block text-sm font-medium text-gray-700'>Data de Nascimento </label>
                <input type='date'
                    {...register("dataNascimento", { required: "A data de nascimento é obrigatória" })}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                {errors.dataNascimento && <p className='text-red-600 text-sm'>{errors.dataNascimento.message}</p>}
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