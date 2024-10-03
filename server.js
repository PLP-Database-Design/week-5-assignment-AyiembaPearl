//importing the necessary dependancies after installing
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

//create connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//test connection of database
db.connect((err) => {
    //connection not succesfull
    if(err){
        console.error("Error connecting to server", err);
    }
    console.log("Server connected successfully to MySQL")
})

//Question 1, get patient data
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(getPatients, (err, results) => {
        //have an error
        if(err) {
            console.error(err)
            return res.status(500).json("Internal server error/failed to fetch results")
        } else {
        //get back data/results
        res.status(200).send(results)
        }
    })
})

//Question 2, get provider data
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(getProviders, (err, results) => {
        //have an error
        if(err) {
            console.error(err)
            return res.status(500).json("Internal server error/failed to fetch results")
        } else {
        //get back data/results
        res.status(200).send(results)
        }
    })
})

//Question 3, filter patients by first name
app.get('/lastname', (req, res) => {
    const getLastName = "SELECT last_name FROM patients";
    db.query(getLastName, (err, results) => {
        //have an error
        if(err) {
            console.error(err)
            return res.status(500).json("Internal server error/failed to fetch results")
        } else {
        //get back data/results
        res.status(200).send(results)
        }
    })
})

//Question 4, retrieve provider by specialty
app.get('/specialty', (req, res) => {
    const getSpecialty = "SELECT provider_specialty FROM providers";
    db.query(getSpecialty, (err, results) => {
        //have an error
        if(err) {
            console.error(err)
            return res.status(500).json("Internal server error/failed to fetch results")
        } else {
        //get back data/results
        res.status(200).send(results)
        }
    })
})


//testing 
// app.get('/', (req,res) => {
//     res.send("Hello world, it is a great day")
// });
//testing ends

//declaring the Port and listening to server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})