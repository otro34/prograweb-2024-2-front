import React, { useState, useEffect } from 'react';

const MatriculaForm = ({ matriculas, reload }) => {

    const [estudiantes, setEstudiantes] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [cursoId, setCursoId] = useState(0);
    const [estudianteId, setEstudianteId] = useState(0);


    const cargarEstudiantes = async () => {
        await fetch('http://localhost:4001/estudiante')
            .then(response => response.json())
            .then(data => setEstudiantes(data))
    }

    const cargarCursos = async () => {
        await fetch('http://localhost:4001/curso')
            .then(response => response.json())
            .then(data => setCursos(data))
    }

    const onLoad = async () => {
        await cargarEstudiantes();
        await cargarCursos();
    }

    useEffect(() => {
        onLoad();
    }, [])

    const guardarMatricula = async (matricula, method) => {
        const payload = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(matricula)
        }

        return await fetch('http://localhost:4001/matricula', payload);
    }
 
    const handelGuardar = async () => {

        let matricula = {};

        window.console.log(matriculas)

        const busquedaMatriculas = matriculas.find(x => x.idEstudiante == estudianteId);

        window.console.log(busquedaMatriculas)

        if (busquedaMatriculas) {
            matricula = {
                ...busquedaMatriculas,
                cursos: [...busquedaMatriculas.cursos, { id: cursoId }]
            }
        } else {
            matricula = {
                id: 0,
                idEstudiante: parseInt(estudianteId),
                fecha: new Date(),
                cursos: [{ id: cursoId }]
            }
        }

        if (matricula.id == 0)
            await guardarMatricula(matricula, 'POST');
        else
            await guardarMatricula(matricula, 'PUT');

        alert('Matricula guardada correctamente');

        reload();
    }


    return (
        <div>
            <h1>Formulario de Matrícula</h1>
            <label>Estudiante: </label>
            <br />
            <select onChange={e => setEstudianteId(e.target.value)}>
                <option value="0">Seleccione Alumno...</option>
                {
                    estudiantes?.map(estudiante => (
                        <option key={estudiante.id} value={estudiante.id}>{estudiante.name + " " + estudiante.lastName}</option>
                    ))
                }
            </select>
            <br /><br />
            <label>Cursos: </label>
            <br />
            <select onChange={e => setCursoId(e.target.value)}>
                {
                    cursos?.map(curso => (
                        <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                    ))
                }
            </select>
            <br/><br/>
            <button onClick={() => handelGuardar()}>GUARDAR</button>
        </div>
    )
}

export default MatriculaForm;