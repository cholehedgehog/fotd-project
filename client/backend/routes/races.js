const express=require("express")
const {
    getSingleRace,
    getRaces,
    createRace,
    deleteRace,
    updateRace
} = require('../controllers/raceController')


const router = express.Router()

// GET all races
router.get('/', getRaces)

// GET single race
router.get('/:id', getSingleRace)

//POST
router.post('/', createRace)

//DELETE
router.delete('/:id', deleteRace)

//PATCH
router.patch('/:id', updateRace)


module.exports = router