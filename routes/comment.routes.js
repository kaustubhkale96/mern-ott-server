const router = require('express').Router();
const Comment = require('../models/comment.model');

router.post('/add', (req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        } res.status(200).json({ success: true, message: comment })
    })
});

router.post('/view', (req, res) => {
    Comment.find({ videoId: req.body.videoId })
        .then((comment) => {
            res.status(200).json({ success: true, message: comment })
        })
        .catch((err) => {
            res.json({ success: false, message: err });
        })

});

module.exports = router;
