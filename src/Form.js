import { useForm } from 'react-hook-form';
import React, {useState} from 'react';

export function Form() { // Corrigido para exportação padrão (default)
    const [apiMensagem, setApiMensagem] = useState(null);

    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm({ mode: 'onBlur' });
        
    // Função para tratar a submissão do formulário
    const onSubmit = async (data) => {
        setApiMensagem(null);
        console.log("Enviando dados para o backend: ", data)
        try{
            // O endpoint deve ser ajustado para a sua API local
            const response = await fetch('http://localhost:8080/api/cadastro/usuario', { 
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
                setApiMensagem({type: 'error', text: `Erro: ${mensagemFalhou}`})
            }
        }catch(error){
            setApiMensagem({type: 'error', text: 'Erro na conexão, verifique novamente'})

        }
    }
    
    return (
        
        <div className="flex justify-center p-4 sm:p-8 min-h-screen bg-gray-50">
            <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-xl"> 
                
                <h1 className='text-4xl font-extrabold text-blue-800 mb-8 text-center border-b pb-4'>
                    Cadastro de Tarefa
                </h1>
                
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
                    
                    
                    <div>
                        <label htmlFor='titulo' className='block text-sm font-medium text-gray-700 mb-1'>Título</label>
                        <input
                            id='titulo'
                            placeholder='Ex: Estudar Spring Boot para o projeto'
                            {...register("titulo", { required: "O título é obrigatório" })}
                            className="w-full border-b-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-600 transition duration-150" // Input com foco na borda inferior
                        />
                        {errors.titulo && <p className='text-red-500 text-sm mt-1'>{errors.titulo.message}</p>}
                    </div>
                    
                    {/* DESCRIÇÃO */}
                    <div>
                        <label htmlFor='descricao' className='block text-sm font-medium text-gray-700 mb-1'>Descrição</label>
                        <textarea
                            id='descricao'
                            placeholder='Detalhes da tarefa e recursos necessários...'
                            {...register("descricao", { required: "A descrição é obrigatória" })}
                            className="w-full border-b-2 border-gray-300 rounded-md p-3 h-28 resize-none focus:outline-none focus:border-blue-600 transition duration-150" // Input com foco na borda inferior
                        ></textarea>
                        {errors.descricao && <p className='text-red-500 text-sm mt-1'>{errors.descricao.message}</p>}
                    </div>

                    {/* DATA VENCIMENTO */}
                    <div>
                        <label htmlFor='dataVencimento' className='block text-sm font-medium text-gray-700 mb-1'>Data Vencimento</label>
                        <input 
                            id='dataVencimento'
                            type='datetime-local'
                            // Adicionada a regra de obrigatoriedade (required)
                            {...register("dataVencimento", { required: "A data de vencimento é obrigatória" })} 
                            className="w-full border-b-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-600 transition duration-150" // Input com foco na borda inferior
                        />
                         {errors.dataVencimento && <p className='text-red-500 text-sm mt-1'>{errors.dataVencimento.message}</p>}
                    </div>
                    
                    {/* PRIORIDADE */}
                    <div>
                        <label htmlFor='prioridade' className='block text-sm font-medium text-gray-700 mb-1'>Prioridade</label>
                        <select
                            id='prioridade'
                            {...register("prioridade", { required: "A prioridade é obrigatória" })}
                            className="w-full border-b-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-600 transition duration-150 appearance-none bg-white" // appearance-none para customizar o select
                        >
                            <option value="">Selecione a prioridade...</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                        
                        {errors.prioridade && (
                            <p className='text-red-500 text-sm mt-1'>{errors.prioridade.message}</p>
                        )}
                    </div>
                    
                    {/* BOTÃO DE ENVIO */}
                    <div className='flex justify-center pt-5'>
                        <button 
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 transform hover:scale-[1.01]" // Botão com efeito de "hover" e largura total
                            type='submit'>
                            CADASTRAR TAREFA
                        </button>
                    </div>
                </form>
            
                {/* MENSAGENS DE FEEDBACK */}
                {apiMensagem && (
                    <div className={`mt-6 p-4 rounded-lg text-center font-medium shadow-md ${apiMensagem.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {apiMensagem.text}
                    </div>
                )}
            </div>    
        </div>
    )
}