import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

const App = () => {
   // Obtendo propriedade do redux pra saber se usuário está logado ou não e passar para o componente de Rotas
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return <Routes />;
}

export default App;