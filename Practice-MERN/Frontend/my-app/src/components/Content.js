import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Content() {

    const [doctors, setDoctors] = useState([]);

    var x1 = useRef();
    var x2 = useRef();


    var addDoctor = (e) => {
        //e.preventDefault()
        //console.log("hello")
        var dId = x1.current.value;
        var dName = x2.current.value;
        console.log(dId, dName);

        axios.post('http://localhost:5453/addDoctor', {
            dId: dId,
            dName: dName
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get('http://localhost:5453/getDoctors').then((response) => {
            console.log(response.data);
            setDoctors(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])



    return (
        <div className="container">
            <h1>Hello Doctors</h1>
            <div className="row">
                <div className="col-xl-6 border">
                    <form>
                        <div class="mb-3">
                            <label>Enter doctor id </label>
                            <input type="text" ref={x1} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" ref={x2} />
                        </div>
                        <button class="btn btn-primary" onClick={addDoctor}>Submit</button>
                    </form>
                </div>
                <div className="col-xl-6 border">
                    <table>
                        <tbody>
                            <tr>
                                <th>Doctors Id</th>
                                <th>Doctors Name</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {
                                doctors && doctors.map((doctors) => {

                                    return (
                                        <tr>
                                            <td>{doctors.dId}</td>
                                            <td>{doctors.dName}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Content
