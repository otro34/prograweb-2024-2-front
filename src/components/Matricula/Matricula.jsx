import { useEffect, useState } from 'react';

import MatriculaForm from './MatriculaForm';

const Matricula = () => {

    const [matriculas, setMatriculas] = useState([]);  

    const cargarMatriculas = async () => {
        await fetch('http://localhost:4001/matricula')
            .then(response => response.json())
            .then(data => setMatriculas(data))
    }

    useEffect(() => {
        cargarMatriculas();
    }, [])

    return (
        <div>
            <h1>Matricula</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Estudiante</th>
                        <th>Cursos</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        matriculas?.map(matricula => (
                            <tr key={matricula.id}>
                                <td>{matricula.id}</td>
                                <td>{matricula.estudiante.name + " " + matricula.estudiante.lastName}</td>
                                <td>{matricula.cursos.map(x => x.nombre).join(', ')}</td>
                                <td>
                                    {matricula.fecha}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

                <MatriculaForm matriculas={matriculas} reload={cargarMatriculas}/>
        </div>
    );
}

export default Matricula;