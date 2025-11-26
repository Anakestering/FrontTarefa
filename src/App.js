import { Form } from './Form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import {Home} from './Home';
import {Consult} from './Consult';

function App() {

  return (
    <BrowserRouter>
    <Header/>
      <div className="flex items-center justify-center min-h-screen bg-blue-300">
        <div className='bg-white/80 p-6 rounded-lg'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cadastro" element={<Form />} />
            <Route path="/consultar" element={<Consult />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;