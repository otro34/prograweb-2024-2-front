import { useState, useEffect } from 'react'
import EstudianteForm from './EstudianteForm'

const Estudiantes = () => {

    const [estudiantes, setEstudiantes] = useState()
    const [verFormulario, setVerFormulario] = useState(false)
    const [idEditar, setIdEditar] = useState(0)

    const handelVerFormulario = () => {
        setVerFormulario(!verFormulario)
    }

    const cargarEstudiantes = async () => {
        await fetch('http://localhost:4001/estudiante')
            .then(response => response.json())
            .then(data => setEstudiantes(data))
    }

    useEffect(() => {
        cargarEstudiantes();
    },[])
    
    const handelDelete = async (id) => {
        const payload = {method: 'DELETE'};
        const result = await fetch(`http://localhost:4001/estudiante/${id}`, payload)

        if (result)
        {
            console.log(result);
            alert('Estudiante eliminado correctamente');
            await cargarEstudiantes();
        }
        
    }

    const handelEditar = async (id) => {
        setIdEditar(id)
        setVerFormulario(true)
    }


    return (
        <>
        <h1>Estudiantes</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Código</th>
                    <th>Correo</th>
                    <th>Carrera</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {
                    estudiantes?.map(estudiante => (
                        <tr key={estudiante.id}>
                            <td>{estudiante.id}</td>
                            <td>{estudiante.name}</td>
                            <td>{estudiante.lastName}</td>
                            <td>{estudiante.code}</td>
                            <td>{estudiante.email}</td>
                            <td>{estudiante.program}</td>
                            <td>
                                <button onClick={() => handelDelete(estudiante.id)}>Eliminar</button>
                                &nbsp;<button onClick={() => handelEditar(estudiante.id)}>Editar</button>
                                </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <br/><br/>
        <button onClick={() => handelVerFormulario() }>AGREGAR NUEVO</button>
        {
            verFormulario && <EstudianteForm id={idEditar} />
        }
        </>
    )
}

export default Estudiantes