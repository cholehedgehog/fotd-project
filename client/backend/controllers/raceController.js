const RaceModel = require('../models/raceModel')
const mongoose = require('mongoose')

// get all races
const getRaces = async (req, res) => {
    const races = await RaceModel.find({}).sort({ createdAt: -1 })

    res.status(200).json(races)
}

//get a single race
const getSingleRace = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such race' })
    }
    const race = await RaceModel.findById(id)

    if (!race) {
        return res.status(404).json({ error: 'No such race' })
    }

    res.status(200).json(race)
}

// create a new race
const createRace = async (req, res) => {
    const { raceName, kind, boon, curse } = req.body

    let emptyFields = []

    if (!raceName) {
        emptyFields.push('raceName')
    }
    if (!kind) {
        emptyFields.push('kind')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }


    // add doc to db
    try {
        const race = await RaceModel.create({ raceName, kind, boon, curse })
        res.status(200).json(race)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a race
const deleteRace = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such race' })
    }

    const race = await RaceModel.findOneAndDelete({ _id: id })

    if (!race) {
        return res.status(404).json({ error: 'No such race' })
    }

    res.status(200).json(race)
}
// update a race
const updateRace = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such race' })
    }

    const race = await RaceModel.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!race) {
        return res.status(404).json({ error: 'No such race' })
    }

    res.status(200).json(race)
}

module.exports = {
    getSingleRace,
    getRaces,
    createRace,
    deleteRace,
    updateRace
} 