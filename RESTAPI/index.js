const express = require('express');
// This helps us to decode the body from an HTTP request
const MongoClient  = require('mongodb').MongoClient;
const ObjectId =  require('mongodb').ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "customers_db";

const bodyParser = require('body-parser');
// Allows us to make API calls from different locations by hitting endpoints in the browser
const cors = require('cors');


const app = express();
// const apiPort = 3000;

// let customers = [ 
//     {   
//         id: 1,
//         name: "John Doe",
//         department: "IT"
//     },
//     {   
//         id: 2,
//         name: "Mary Doe",
//         department: "IT"
//     },
//     {   
//         id: 3,
//         name: "Joseph Doe",
//         department: "IT"
//     }
// ]

app.use(cors());

// configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// GET
app.get('/api/customers', (req, res) => {

    collection.find({}).toArray((error, result) => {
        
        if (error) {
            res.status(500).send(error)
        }

        res.status(200).send(result)
    })
       
    // if (customers.length === 0 ) {
    //     res.status(404).send("No customers available!! Please add a customer.")
    // }

    // res.send(customers)
})

// GET BY ID
app.get('/api/customers/:id', (req, res) => {

    collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
        if (error) {
            return res.status(500).send(error)
        }

        res.status(200).send(result);
    })

    // const customer = customers.find(c => c.id === parseInt(req.params.id));

    // if (!customer) {
    //     res.status(400).send("Customer does not exist!!")
    // }

    // res.send(customer)
})

// POST
app.post('/api/customer', (req, res) => {
    collection.insert(req.body, (error, result) => {
        if (error) {
            res.status(500).send(error);
            return
        }
        res.send(result)
    })

    // const customer = {
    //     id: customers.length + 1,
    //     name: req.body.name
    // }

    // customers.push(customer)

    // res.json(customer)
})

// PUT
app.put('/api/customers/:id', (req, res) => {

    collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
        if(error) {
            res.status(500).send(error)
        }

        result.name = req.body.name
        result.department = req.body.department
        collection.save(result)
        res.status(200).send("Customer Updated")
    })

    // const customer = customers.find(c => c.id === parseInt(req.params.id));

    // if (!customer) {
    //     res.status(400).send("Customer does not exist")
    //     return
    // }

    // customer.name = req.body.name
    // res.send(customer)
})

// DELETE
app.delete('/api/customers/:id', (req, res) => {

    collection.findOneAndDelete({ "_id": new ObjectId(req.params.id) }, (error, result) => {

        if (error) {
            res.status(500).send(error)
        }

        res.status(200).send(result)
    })
    // const customer = customers.find(c => c.id === parseInt(req.params.id));


    // if (!customer) {
    //     res.status(400).send("Customer does not exist")
    //     return
    // }

    // const index = customers.indexOf(customer)
    // customers.splice(index, 1)

    res.send("Customer deleted")

})

// set the port and listen for requests
const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error){
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("customers");
        console.log(`Connected to ${DATABASE_NAME} !`)
    })
    console.log(`Server running on port ${PORT}`)
})