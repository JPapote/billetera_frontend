import { useState } from 'react';
import { Url } from '../utils/url'

export default function ConsultarSaldo({token}) {

    const [mensaje, setMensaje] = useState('');
    const getSaldo = () => {


        fetch(Url + 'consultarSaldo', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'bearer ' + token
            }

        }).then(async res => await res.json()).then(r => {
            setMensaje(r.text)

        }).catch(e => {

            console.log(e)
        })
    }

    return (
        <div style={{margin:'10px'}}>
            <button onClick={getSaldo}>
                Consultar saldo
           </button>
{ mensaje ?
            <p>${mensaje}</p> : ''
}
        </div>
    )
} 