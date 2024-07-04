import { useForm } from 'react-hook-form'

function NewIngresoEgresoPage({ingresosEgresosConceptos, saveIngresoEgreso}) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async (dataForm) => {
    saveIngresoEgreso(dataForm)
  })

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/2'>
        <h1 className='text-slate-200 font-bold text-xl my-4'>Nuevo Movimiento de Dinero</h1>
        <label htmlFor='monto' className='text-white mt-2 block text-sm'>Monto (escribirlo en numeros)</label>
        <input type='number'
          {...(register("monto", {
            required: {
              value: true,
              message: "El monto es requerido"
            },
          }))}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.monto && (
            <span className='text-red-500' >{errors.monto.message.toString()}</span>
          )
        }
        <label htmlFor='concepto' className='text-white mt-2 block text-sm'>Concepto</label>
        <select {...register("concepto")}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
          defaultValue={ingresosEgresosConceptos[0].id}
        >
          {
            ingresosEgresosConceptos.map((concepto) => (
              <option key={`concepto_${concepto.id}`} value={concepto.id}>{concepto.name}</option>
            ))
          }
        </select>
        {
          errors.email && (
            <span className='text-red-500' >{errors.concepto.message.toString()}</span>
          )
        }
        <label htmlFor='fecha' className='text-white mt-2 block text-sm'>Fecha</label>
        <input 
          {...(register("fecha", {
            required: {
              value: true,
              message: "fecha es requerida"
            }
          }))}
          className='form__input p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
          type="date"  
        />
        {
          errors.fecha && (
            <span className='text-red-500' >{errors.fecha.message.toString()}</span>
          )
        }
        <button type="submit" className='w-full bg-blue-500 text-white p-3 rounded-lg my-2'>
          Register
        </button>
      </form>
    </div>
  )
}


export default NewIngresoEgresoPage