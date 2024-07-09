import { useForm } from 'react-hook-form'

function UpdateUserPage({ roles, updateUser, currentUser }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async (dataForm) => {
    dataForm.id_rol = parseInt(dataForm.id_rol)
    updateUser({ id: currentUser.id, ...dataForm })
  })

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/2'>
        <h1 className='text-slate-200 font-bold text-xl my-4'>Editar Usuario</h1>
        <label htmlFor='email' className='text-white block text-sm'>Email</label>
        <input type='email'
          {...(register("email", {
            required: {
              value: true,
              message: "El email es requerido"
            },
            value: currentUser.email
          }))}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.email && (
            <span className='text-red-500' >{errors.email.message.toString()}</span>
          )
        }
        <label htmlFor='name' className='text-white block text-sm'>Nombre</label>
        <input type='text'
          {...(register("name", {
            required: {
              value: true,
              message: "El Nombre es requerido"
            },
            value: currentUser.name
          }))}
          min={0}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
        />
        {
          errors.name && (
            <span className='text-red-500' >{errors.name.message.toString()}</span>
          )
        }
        <label htmlFor='id_rol' className='text-white block text-sm'>Rol</label>
        <select {...register("id_rol")}
          className='p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
          defaultValue={roles[0].id}
        >
          {
            roles.map((rol) => (
              <option key={`rol_${rol.id}`} value={rol.id}>{rol.rol}</option>
            ))
          }
        </select>
        {
          errors.id_rol && (
            <span className='text-red-500' >{errors.id_rol.message.toString()}</span>
          )
        }
        <label htmlFor='telefono' className='text-white block text-sm'>Telefono</label>
        <input
          {...(register("telefono", {
            value: currentUser.telefono
          }))}
          className='form__input p-3 rounded bg-slate-900 text-slate-300 w-full my-1'
          type="tel"
        />
        <button type="submit" className='w-full bg-blue-500 text-white p-3 rounded-lg my-2'>
          Update
        </button>
      </form>
    </div>
  )
}

export default UpdateUserPage