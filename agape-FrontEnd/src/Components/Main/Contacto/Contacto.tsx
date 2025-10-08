import './Contacto.css';
import { useForm, ValidationError } from "@formspree/react";

export default function Contacto() {
  const [state, handleSubmit] = useForm("xyzndlvk");

  return (
    <div className='Contacto'>
        <h1>Contáctanos ✉️</h1>
        {state.succeeded ? 
        
        <p>Gracias — ya recibimos tu mensaje.</p> 
        
        : 

        <form onSubmit={handleSubmit}>
            <div>
                <label id='label-nombre'>
                    <span>Nombre</span>
                    <input type="text" name="name" required />
                </label>
                <label id='label-email'>
                    <span>Email</span>
                    <input type="email" name="email" required />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                </label>
                <button type="submit" disabled={state.submitting}>
                    Enviar
                </button>
            </div>
            <label id='label-mensaje'>
                <p>Mensaje</p>
                <textarea name="message" required />
                <ValidationError prefix="Mensaje" field="message" errors={state.errors} />
            </label>
            
        </form>

        }
    </div>
    
  );
}