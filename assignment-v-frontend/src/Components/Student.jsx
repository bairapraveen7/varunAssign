import React, { Fragment, useRef, useState } from "react";
import Grid from "@mui/material/Grid"
import classes from "./Student.module.css"
import { Button, Link, TextField, Typography } from "@mui/material";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import axios from "axios";

export const Student = () => {

    const [studentData,setStudentData] = useState({
        name:'',class: '',photo: '',video: ''
    })
    const [tableData,setTableData] = useState([]);
    const [edit,setEdit] = useState(false);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8000/student/delete/${id}`)
        .then((res) => setTableData(res.data))
        .catch((err) => console.log(err))
    }

    const updateData = (data) => {
        axios.post("http://localhost:8000/student/update",data)
        .then((res) => {
            console.log(res.data);
            setTableData(res.data);
            setEdit(false);
        })
        .catch((err) => console.log(err))
    }

    const sendData = () => {
        return axios.post("http://localhost:8000/student/new",studentData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const handleCreate = () => {
        sendData(studentData);
        alert("Data Added Successfully")
    }

    const getDetails = () => {
        axios.get("http://localhost:8000/student/details")
        .then((res) => {
            console.log(res.data);
            setTableData(res.data)
        })
        .catch((err) => console.log(err))
    }

    const EditTemplate = ({id}) => {
        const data = {id: id, name: '', class: '', photo: '', video: ''};

        return (
            <tr>
                <td><TextField  onChange={(e) => {
                     data.name = e.target.value
                }} /></td>
                <td><TextField   onChange={(e) => {
                     data.class = e.target.value;
                }} /></td>
                <td><TextField   onChange={(e) => {
                    data.photo = e.target.value
                }}
                      /></td>
                <td><TextField   onChange={(e) => {
                    data.video = e.target.value
                }} /></td>
                <td onClick={() => setEdit(false)}><Cancel /></td>
                <td onClick={() => updateData(data)}><Save /></td>
            </tr>
        )
    }

    return (
        <Grid className={classes.student} container spacing={4}>
            <Grid item xs={6}>
            <Typography variant="h6" sx={{my: 2, textDecoration: 'underline'}}>STUDENT DETAILS</Typography>
                <div className={classes.form}>
                    <div className={classes.formName}>
                        <label className={classes.label} style={{ fontWeight: "bold" }}>Name</label>
                        <TextField
                            placeholder="Name of field [FirstName | LastName ...]"
                            name="name"
                            onChange={(e) => setStudentData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formClass}>
                        <label className={classes.label} style={{ fontWeight: "bold" }}>Class</label>
                        <TextField
                            placeholder="Name of field [FirstName | LastName ...]"
                            name="name"
                            onChange={(e) => setStudentData(prev => ({
                                ...prev,
                                class: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formPhoto}>
                    <label className={classes.label} style={{ fontWeight: "bold" }}>Class</label>
                        <TextField
                            placeholder="Give photo link"
                            name="name"
                            onChange={(e) => setStudentData(prev => ({
                                ...prev,
                                photo: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formVideo}>
                    <label className={classes.label} style={{ fontWeight: "bold" }}>Class</label>
                        <TextField
                            placeholder="Give video link"
                            name="name"
                            onChange={(e) => setStudentData(prev => ({
                                ...prev,
                                video: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>




                    <Button variant="contained" onClick={handleCreate}>Submit</Button>
                </div>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" sx={{my: 2, textDecoration: 'underline'}}>STUDENT TABLE</Typography>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Photo</th>
                        <th>Video</th>
                    </tr>
                    {
                        tableData.map((eachItem) => 
                        edit ? 
                        (
                            <EditTemplate id={eachItem.id} />
                        ) : 
                        (
                            <tr key={eachItem.id}>
                                <td>{eachItem.name}</td>
                                <td>{eachItem.class}</td>
                                <td>{eachItem.photo}</td>
                                <td>{eachItem.video}</td>
                                <td onClick={() => setEdit(true)}><Edit /></td>
                                <td onClick={() => deleteItem(eachItem.id)}><Delete /></td>
                            </tr>
                        )
                    )
                    
                    }
                </table>
                <Button variant="contained" sx={{my: 4}} onClick={getDetails}>Get Details</Button>
            </Grid>
        </Grid>
    )
}