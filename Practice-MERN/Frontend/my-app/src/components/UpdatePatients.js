import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function UpdatePatients() {

    const [id, setId] = useState(' ');
    const [name, setName] = useState(' ');
    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem('pId'));
        setName(localStorage.getItem('pName'));
    }, []);

    const updatePatient = (id) => {
        console.log("Hello " + id);
        axios.put(`http://localhost:5453/updatePatient/${id}`, {
            pName: name
        }).then((response) => {
            console.log(response.data);
            alert(response.data);
        }).catch((error) => {
            console.log(error);
        })

        navigate('/patients')
    }

    return (
        <div className="container">
            <div className="row">
                <form>
                    <div class="mb-3">
                        <label>Enter Patient id </label>
                        <input type="text" value={id} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </div>
                    <button class="btn btn-primary" onClick={() => updatePatient(id)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePatients
