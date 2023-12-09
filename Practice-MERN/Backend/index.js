const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors");
const Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/tcs').then(() => {
    console.log("Connected to MongoDB");
});
const doctorsSchema = new Schema({
    dId: Number,
    dName: String,
});
const patientsSchema = new Schema({
    pId: Number,
    pName: String,
});

const doctorsModel = mongoose.model('doctors', doctorsSchema);
const patientsModel = mongoose.model('patients', patientsSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/getDoctors', async (req, res) => {
    var ans = await doctorsModel.find();
    res.send(ans);
    //res.send('Hello World!')
});

app.post('/addDoctor', async (req, res) => {
    var instance = new doctorsModel(req.body);
    await instance.save();
    res.send('Doctor Added')
});

app.get('/getPatients', async (req, res) => {
    var ans = await patientsModel.find();
    res.send(ans);
});

app.post('/addPatient', async (req, res) => {
    var instance = new patientsModel(req.body);
    await instance.save();
    res.send('Patient Added');
});

app.put('/updatePatient/:id', async (req, res) => {
    await patientsModel.updateOne(
        { pId: req.params.id }, { $set: req.body }
    )
    res.send(req.params.id + " Patient updated");
})


app.delete('/deletePatient/:id', async (req, res) => {
    var ans = await patientsModel.deleteOne({ pId: req.params.id });
    res.send(req.params.id + " deleted");
})

app.listen(5453);