const express = require('express')
const router = express.Router()

const {createAttachment, getAttachment} = require('../controllers/attachment')

router.route('/').post(createAttachment).get(getAttachment)

module.exports = router;