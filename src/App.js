import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContextProvider from './context/UseContext'
import Buy from './components/Buy'
import RecargarBilletera from './components/RecargarBilletera'
import ConsultarSaldo from './components/ConsultarSaldo'
import Registro from './components/Registro'

function App() {
  return (

    <BrowserRouter>
      <div className="App">
          < ContextProvider >
          <Route exact path="/" component={Registro} />
           
 
            <Route path="/cuenta">

              <RecargarBilletera />
              <ConsultarSaldo />
              <Buy />

            </Route>
          </ ContextProvider>
      
      </div>
    </BrowserRouter>

  );
}

export default App;
