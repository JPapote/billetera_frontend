import { useState } from 'react';
import  {Url} from './url'
export default function RecargarBilletera ({documento, celular} ) {

    const [mensaje, setMensaje] = useState('');
   
    const sendRecarga = (e) => {

e.preventDefault()

        const obj = {
            documento,
            celular,
            valor : e.target.recarga.value
        }
        fetch(Url+'update', {
            method:"PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(obj)
            
        }).then(res => res.json()).then(r => {
            setMensaje(r.text)

        }).catch(e => {
            
            console.log(e)
        })
          
    }

    return(
        
        <div>
            <form onSubmit={sendRecarga}>
                <h1>Recargar Billetera</h1>
                <label>Monto de la recarga</label>
                <input type="number" name="recarga" required />
            <button type="submit">RecargarBilletera</button>
            {mensaje !== '' ?
                <div>
                    <p>
                        {mensaje}
                    </p>
                </div>
                : ''}
            </form>
               
        </div>
    )
}