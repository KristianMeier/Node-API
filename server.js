const express = require('express')
const mongoose = require('mongoose')
const Companies = require('./models/companyModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = 9000
const connectionString =
  'mongodb+srv://admin:admin@devtaminapi.xmsqbyi.mongodb.net/?retryWrites=true&w=majority'

//routes

app.get('/', (req, res) => {
  res.send('Heeelloooo. This is an API for my cvr.dk mockup')
})

app.get('/companies', async (req, res) => {
  try {
    const companies = await Companies.find({})
    res.status(200).json(companies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/companies/:id', async (req, res) => {
  try {
    const { id } = req.params
    const company = await Companies.findById(id)
    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/companies', async (req, res) => {
  try {
    const companies = await Companies.create(req.body)
    res.status(200).json(companies)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

// update a company
app.put('/companies/:id', async (req, res) => {
  try {
    const { id } = req.params
    const companies = await Companies.findByIdAndUpdate(id, req.body)
    // we cannot find any product in database
    if (!companies) {
      return res
        .status(404)
        .json({ message: `cannot find any company with ID ${id}` })
    }
    const updatedProduct = await Companies.findById(id)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// delete a company

app.delete('/companies/:id', async (req, res) => {
  try {
    const { id } = req.params
    const company = await Companies.findByIdAndDelete(id)
    if (!company) {
      return res
        .status(404)
        .json({ message: `cannot find any company with ID ${id}` })
    }
    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

mongoose.set('strictQuery', false)
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('connected to MongoDB')
    app.listen(port, () => {
      console.log(`Node API app is running on port ${port}}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
