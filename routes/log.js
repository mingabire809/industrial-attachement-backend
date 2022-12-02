const express = require('express')
const router = express.Router()

const {createLog, getLog, singleLog} = require('../controllers/log')

router.route('/').post(createLog).get(getLog)
router.route('/:id').get(singleLog)

module.exports = router;