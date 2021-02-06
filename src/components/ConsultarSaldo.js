import { useState } from 'react';
import { Url } from './url'

export default function ConsultarSaldo({ documento, celular }) {

    const [mensaje, setMensaje] = useState('');

    const getSaldo = () => {

        const obj = {
            documento: documento,
            celular: celular
        }

        fetch(Url + 'consultarSaldo', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)

        }).then(async res => await res.json()).then(r => {
            setMensaje(r.text)

        }).catch(e => {

            console.log(e)
        })
    }

    return (
        <div>
            <button onClick={getSaldo}>
                Consultar saldo
           </button>

            <p>${mensaje}</p>

        </div>
    )
} 