import { useState, useEffect } from 'react'

const EstudianteForm = ({ id }) => {
    const estudianteDefault = {
        id: 0,
        name: '',
        lastName: '',
        code: '',
        email: '',
        program: ''
    }

    const [estudiante, setEstudiante] = useState(estudianteDefault)

    useEffect(() => {
        if (id && id > 0)
        {
            fetch(`http://localhost:4001/estudiante/${id}`)
                .then(response => response.json())
                .then(data => setEstudiante(data));
            }
    },[id])

    const handleSubmit = async (event) => {

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estudiante)
        }

        if (estudiante.id > 0) {
            payload.method = 'PUT';
        }

        const result = await fetch('http://localhost:4001/estudiante',payload);

        console.log({result})

        alert('Estudiante guardado correctamente')
        event.preventDefault()
    }

    return (
        <>
            <h2>Complete los datos para agregar un nuevo estudiante: </h2>
            <form onSubmit={() => handleSubmit()} action="/estudiantes">
                <label>Nombre: </label>
                <input type="text" name="name" required
                    value={estudiante.name} onChange={e => setEstudiante({...estudiante, name: e.target.value})}/><br/><br/>
                <label>Apellido: </label>
                <input type="text" name="lastName" required
                    value={estudiante.lastName} onChange={e => setEstudiante({...estudiante, lastName: e.target.value})}/><br/><br/>
                <label>Código: </label>
                <input type="text" name="code" required 
                    value={estudiante.code} onChange={e => setEstudiante({...estudiante, code: e.target.value})}/><br/><br/>
                <label>Correo: </label>
                <input type="email" name="email" required
                    value={estudiante.email} onChange={e => setEstudiante({...estudiante, email: e.target.value})}/><br/><br/>
                <label>Carrera: </label>
                <input type="text" name="program" required
                    value={estudiante.program} onChange={e => setEstudiante({...estudiante, program: e.target.value})}/><br/><br/>
                <button type="submit">AGREGAR</button>
            </form>
        </>
    );
}

export default EstudianteForm;