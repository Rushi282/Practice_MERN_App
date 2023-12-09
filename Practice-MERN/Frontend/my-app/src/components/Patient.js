import axios from "axios";
import { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom';

function Patient() {

    const [patient, setPatient] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5453/getPatients').then((response) => {
            console.log(response.data);
            setPatient(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const pId = useRef();
    const pName = useRef();

    const addPatient = () => {
        axios.post('http://localhost:5453/addPatient', {
            pId: pId.current.value,
            pName: pName.current.value
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function setDataToStorage(id, patientName) {
        localStorage.setItem('pId', id);
        localStorage.setItem('pName', patientName);
    }

    const deletePatient = (id) => {
        // console.log(id);
        axios.delete('http://localhost:5453/deletePatient/' + id).then((response) => {
            console.log(response.data);
        }
        ).catch((err) => {
            console.log(err);
        })
        setTimeout(() => {
            window.location.reload();
        }, 400);
    }

    return (
        <div className="container">
            <h1>Hello Patients</h1>
            <div className="row">
                <div className="col-xl-6 border">
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                                <th>Update Patient</th>
                                <th>Delete Patient</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patient && patient.map((patient) => {
                                    return (
                                        <tr>
                                            <td>{patient.pId}</td>
                                            <td>{patient.pName}</td>
                                            <td><Link to='/updatePatient'><button className="btn btn-primary" onClick={() => setDataToStorage(patient.pId, patient.pName)}>Update</button></Link></td>
                                            <td><button className="btn btn-danger" onClick={() => deletePatient(patient.pId)}>DELETE</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-xl-6 border">
                    <form>
                        <div class="mb-3">
                            <label>Enter Patient id </label>
                            <input type="text" ref={pId} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" ref={pName} />
                        </div>
                        <button class="btn btn-primary" onClick={addPatient}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Patient
