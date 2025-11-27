import { Form } from './Form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { Home } from './Home';
import { Consult } from './Consult';
import { useState } from 'react';

function App() {

  const [imagem1, setImagem1] = useState(null);
  const imagem = "/image/Cafe.png";

  const [imagem2, setImagem2] = useState(null);
  const image = "/image/download.png";

  return (
    <BrowserRouter>
      <Header />

     
      <div className="flex items-center justify-center min-h-screen bg-blue-300 gap-8">
        <div className="p-6">
          <button
            onClick={() => setImagem2(imagem2 ? null : image)}
            className='px-2 py-1 bg-yellow-800 text-white text-sm font-semibold rounded-lg hover:bg-yellow-600 transition duration-150 shadow-md'
          >
            E o estado mental
             ta como?
          </button>

          {imagem2 && (
            <div className="mt-4 shadow-xl border border-blue-800 p-2 bg-gray-50 rounded-xl">
              <img src={imagem2} alt="Imagem 2" className="w-32 h-32" />
            </div>
          )}
        </div>

        {/* ⚪ CENTRO */}
        <div className='bg-white/80 p-6 rounded-lg'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Form />} />
            <Route path="/consultar" element={<Consult />} />
          </Routes>
        </div>

        <div className='p-6'>
          <button
            onClick={() => setImagem1(imagem1 ? null : imagem)}
            className='px-2 py-1 bg-yellow-800 text-white text-sm font-semibold rounded-lg hover:bg-yellow-600 transition duration-150 shadow-md'
          >
            Cafezin?
          </button>

          {imagem1 && (
            <div className='mt-4 shadow-xl border border-yellow-800 p-2 bg-gray-50 rounded-xl'>
              <img src={imagem1} alt="Cafe" className='w-32 h-32' />
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
