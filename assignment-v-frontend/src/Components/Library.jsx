import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid"
import classes from "./Library.module.css"
import { Button, Link, TextField, Typography } from "@mui/material";
import { Delete, Edit, Cancel, Save } from "@mui/icons-material";
import axios from "axios";

export const Library = () => {
    const [libraryData,setLibraryData] = useState({
        studentName:'',bookName: '',startDate: '',endDate: ''
    })
    const [tableData,setTableData] = useState([]);
    const [edit,setEdit] = useState(false);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8000/library/delete/${id}`)
        .then((res) => setTableData(res.data))
        .catch((err) => console.log(err))
    }

    const updateData = (data) => {
        axios.post("http://localhost:8000/library/update",data)
        .then((res) => {
            console.log(res.data);
            setTableData(res.data);
            setEdit(false);
        })
        .catch((err) => console.log(err))
    }

    const sendData = () => {
        return axios.post("http://localhost:8000/library/new",libraryData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const handleCreate = () => {
        sendData(libraryData);
        alert("Data Added Successfully")
    }

    const getDetails = () => {
        axios.get("http://localhost:8000/library/details")
        .then((res) => {
            console.log(res.data);
            setTableData(res.data)
        })
        .catch((err) => console.log(err))
    }

    const EditTemplate = ({id}) => {
        const data = {id: id, studentName: '', bookName: '', startDate: '', endDate: ''};

        return (
            <tr>
                <td><TextField  onChange={(e) => {
                     data.studentName = e.target.value
                }} /></td>
                <td><TextField   onChange={(e) => {
                     data.bookName = e.target.value;
                }} /></td>
                <td><TextField   onChange={(e) => {
                    data.startDate = e.target.value
                }}
                      /></td>
                <td><TextField   onChange={(e) => {
                    data.endDate = e.target.value
                }} /></td>
                <td onClick={() => setEdit(false)}><Cancel /></td>
                <td onClick={() => updateData(data)}><Save /></td>
            </tr>
        )
    }

    return (
        <Grid className={classes.student} container spacing={4}>
            <Grid item xs={6}>
            <Typography variant="h6" sx={{my: 2, textDecoration: 'underline'}}>LIBRARY DETAILS</Typography>
                <div className={classes.form}>
                    <div className={classes.formName}>
                        <label className={classes.label} style={{ fontWeight: "bold" }}>studentName</label>
                        <TextField
                            placeholder="Name of Student"
                            name="name"
                            onChange={(e) => setLibraryData(prev => ({
                                ...prev,
                                studentName: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formClass}>
                        <label className={classes.label} style={{ fontWeight: "bold" }}>Book Name</label>
                        <TextField
                            placeholder="Name of Book"
                            name="name"
                            onChange={(e) => setLibraryData(prev => ({
                                ...prev,
                                bookName: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formPhoto}>
                    <label className={classes.label} style={{ fontWeight: "bold" }}>Start Date</label>
                        <TextField
                            placeholder="Start Date"
                            name="name"
                            onChange={(e) => setLibraryData(prev => ({
                                ...prev,
                                startDate: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formVideo}>
                    <label className={classes.label} style={{ fontWeight: "bold" }}>End Date</label>
                        <TextField
                            placeholder="End Date"
                            name="name"
                            onChange={(e) => setLibraryData(prev => ({
                                ...prev,
                                endDate: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>




                    <Button variant="contained" onClick={handleCreate}>Submit</Button>
                </div>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" sx={{my: 2, textDecoration: 'underline'}}>LIBRARY TABLE</Typography>
                <table>
                    <tr>
                        <th>studentName</th>
                        <th>bookName</th>
                        <th>startDate</th>
                        <th>endDate</th>
                    </tr>
                    {
                        tableData.map((eachItem) => 
                        edit ? 
                        (
                            <EditTemplate id={eachItem.id} />
                        ) : 
                        (
                            <tr key={eachItem.id}>
                                <td>{eachItem.studentName}</td>
                                <td>{eachItem.bookName}</td>
                                <td>{eachItem.startDate}</td>
                                <td>{eachItem.endDate}</td>
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