const { Router } = require('express');
const ContactController = require('./app/controller/ContactController');

const router = Router();

router.get('/contacts', ContactController.index);

module.exports = router;
