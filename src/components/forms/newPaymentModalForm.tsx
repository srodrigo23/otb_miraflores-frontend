
import { useState } from "react"

type InputsNewPaymentModalForm ={

}

type FormState = {
  nombre: string;
  ci: string;
  lecturaActual: string;
  lecturaAnterior: string;
  montoCobrar: string;
  montoPagado: string;
  fechaPago: string;
  horaPago: string;
  gestion: string;
};


type NewPaymentModalFormType={
  openModalState:boolean,
  handleCloseModal:()=>void,
  onSubmit:(data: InputsNewPaymentModalForm)=>void
}


// Styles (minimalista)
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: 24,
    alignItems: 'flex-start',
    flexWrap: 'nowrap', // keep form and preview side-by-side on wide screens
    justifyContent: 'space-between',
  }

  const formStyle: React.CSSProperties = {
    flex: '1 1 520px',
    minWidth: 320,
    background: '#fff',
    padding: 16,
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  }

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 8,
  }

  const inputStyle: React.CSSProperties = {
    padding: '8px 10px',
    borderRadius: 6,
    border: '1px solid #ddd',
    fontSize: 14,
  }

  const previewStyle: React.CSSProperties = {
    flex: '0 0 340px',
    width: 340,
    background: '#fafafa',
    padding: 12,
    borderRadius: 8,
    border: '1px solid #e6e6e6',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    fontFamily: 'Arial, Helvetica, sans-serif',
  }

  const receiptBoxStyle: React.CSSProperties = {
    background: '#fff',
    padding: 12,
    borderRadius: 6,
    border: '1px solid #eee',
  }
const gestion_principal = 'SEP-OCT / 2025';
  const getInitialState = (): FormState => {
    const now = new Date();
    const fecha = now.toLocaleDateString('es-BO');
    const hora = now.toLocaleTimeString('es-BO', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      nombre: '',
      ci: '',
      lecturaActual: '',
      lecturaAnterior: '',
      montoCobrar: '',
      montoPagado: '',
      fechaPago: fecha,
      horaPago: hora,
      gestion: gestion_principal,
    };
  };


const NewPaymentModalForm: React.FC<NewPaymentModalFormType> = ({
  // openModalState, handleCloseModal, onSubmit
})=>{

  const [form, setForm] = useState<FormState>(getInitialState());
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 12 }}>Generar recibo de cobro de agua</h2>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
          
          <div style={fieldStyle}>
            <label style={{ fontSize: 13, color: '#333' }}>
              Deuda Gestion
            </label>
            <input
              name='gestion'
              value={form.gestion}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={{ fontSize: 13, color: '#333' }}>
              Nombre del vecino
            </label>
            <input
              name='nombre'
              value={form.nombre}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={{ fontSize: 13, color: '#333' }}>CI</label>
            <input
              name='ci'
              value={form.ci}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={{ fontSize: 13, color: '#333' }}>
              Lectura anterior
            </label>
            <input
              name='lecturaAnterior'
              value={form.lecturaAnterior}
              onChange={handleChange}
              type='number'
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={{ fontSize: 13, color: '#333' }}>
              Lectura actual
            </label>
            <input
              name='lecturaActual'
              value={form.lecturaActual}
              onChange={handleChange}
              type='number'
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={{ fontSize: 13, color: '#333' }}>
              Monto a cobrar (calculado automáticamente)
            </label>
            <input
              name='montoCobrar'
              value={form.montoCobrar}
              onChange={handleChange}
              type='number'
              step='0.01'
              style={{
                ...inputStyle,
                backgroundColor: '#f5f5f5',
                cursor: 'not-allowed',
              }}
              readOnly
            />
          </div>

          <div style={fieldStyle}>
            <label style={{ fontSize: 13, color: '#333' }}>
              Monto entregado
            </label>
            <input
              name='montoPagado'
              value={form.montoPagado}
              onChange={handleChange}
              type='number'
              step='0.01'
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ color: 'crimson', marginTop: 6 }}>{error}</div>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              // onClick={generatePDF} /* Here import method to generate PDF receipt */
              type='button'
              style={{ padding: '8px 12px', borderRadius: 6 }}
            >
              Generar PDF
            </button>
            <button
              onClick={() => setForm(getInitialState())}
              type='button'
              style={{
                background: '#eee',
                padding: '8px 12px',
                borderRadius: 6,
              }}
            >
              Limpiar
            </button>
          </div>
        </form>
        </div>
        </div>

  )
}

export default NewPaymentModalForm