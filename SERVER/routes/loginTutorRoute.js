const express = require("express");
const router = express.Router();
const controller = require('../controllers/loginTutorController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());