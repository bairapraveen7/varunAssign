import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid"
import classes from "./Library.module.css"
import { Button, Link, TextField, Typography } from "@mui/material";
import { Delete, Edit, Cancel, Save } from "@mui/icons-material";
import axios from "axios";

export const Book = () => {
    const [bookData,setBookData] = useState({
        name:'',author: '',publication: '',year: ''
    })
    const [tableData,setTableData] = useState([]);
    const [edit,setEdit] = useState(false);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8000/book/delete/${id}`)
        .then((res) => setTableData(res.data))
        .catch((err) => console.log(err))
    }

    const updateData = (data) => {
        axios.post("http://localhost:8000/book/update",data)
        .then((res) => {
            console.log(res.data);
            setTableData(res.data);
            setEdit(false);
        })
        .catch((err) => console.log(err))
    }

    const sendData = () => {
        return axios.post("http://localhost:8000/book/new",bookData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const handleCreate = () => {
        sendData(bookData);
        alert("Data Added Successfully")
    }

    const getDetails = () => {
        axios.get("http://localhost:8000/book/details")
        .then((res) => {
            console.log(res.data);
            setTableData(res.data)
        })
        .catch((err) => console.log(err))
    }

    const EditTemplate = ({id}) => {
        const data = {id: id, name: '', author: '', publication: '', year: ''};

        return (
            <tr>
                <td><TextField  onChange={(e) => {
                     data.name = e.target.value
                }} /></td>
                <td><TextField   onChange={(e) => {
                     data.author = e.target.value;
                }} /></td>
                <td><TextField   onChange={(e) => {
                    data.publication = e.target.value
                }}
                      /></td>
                <td><TextField   onChange={(e) => {
                    data.year = e.target.value
                }} /></td>
                <td onClick={() => setEdit(false)}><Cancel /></td>
                <td onClick={() => updateData(data)}><Save /></td>
            </tr>
        )
    }

    return (
        <Grid className={classes.student} container spacing={4}>
            
            <Grid item xs={6} className={classes.form}>
            <Typography variant="h6" sx={{my: 2, textDecoration: 'underline'}}>BOOK DETAILS</Typography>
                
                    <div className={classes.formName}>
                        <label className={classes.label} style={{ fontWeight: "bold" }}>Name</label>
                        <TextField
                            placeholder="Name of Book"
                            name="name"
                            onChange={(e) => setBookData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formClass}>
                        <label className={classes.label} style={{ fontWeight: "bold" }}>author</label>
                        <TextField
                            placeholder="Name of Author"
                            name="name"
                            onChange={(e) => setBookData(prev => ({
                                ...prev,
                                author: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formPhoto}>
                    <label className={classes.label} style={{ fontWeight: "bold" }}>Publication</label>
                        <TextField
                            placeholder="Publication"
                            name="name"
                            onChange={(e) => setBookData(prev => ({
                                ...prev,
                                publication: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formVideo}>
                    <label className={classes.label} style={{ fontWeight: "bold" }}>Year</label>
                        <TextField
                            placeholder="Year"
                            name="name"
                            onChange={(e) => setBookData(prev => ({
                                ...prev,
                                year: e.target.value
                            }))}
                            fullWidth
                        />
                    </div>




                    <Button variant="contained" onClick={handleCreate}>Submit</Button>
                
            </Grid>

            <Grid item xs={6}>
            <Typography variant="h6" sx={{my: 2, textDecoration: 'underline'}}>BOOK TABLE</Typography>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>author</th>
                        <th>publication</th>
                        <th>year</th>
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
                                <td>{eachItem.author}</td>
                                <td>{eachItem.publication}</td>
                                <td>{eachItem.year}</td>
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