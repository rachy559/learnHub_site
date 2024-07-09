const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/comments", async (req, res) => {
    try {
       res.send(await controller.getAllComments());
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.post("/", async (req, res) => {
    try {
       res.send(await controller.createComment(req.body.comment_date, req.body.body, req.body.student_id));
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;


