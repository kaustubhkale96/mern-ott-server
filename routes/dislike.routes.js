const router = require('express').Router();
const Dislike = require('../models/dislike.model');
const Like = require('../models/likes.model');

router.post('/add', (req, res) => {
    const dislike = new Dislike(req.body)

    dislike.save((err, dislike) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        // res.status(200).json({ success: true, message: dislike })
        Like.findOneAndDelete({ user: req.body.user, videoId: req.body.videoId })
            .exec((err) => {
                if (err) return res.status(400).json({ success: false, message: err });
                res.status(200).json({ success: true, dislike })
            })

    })
});

router.post('/undislike', (req, res) => {
    Dislike.findOneAndDelete({ user: req.body.user, videoId: req.body.videoId })
        .exec((err, user) => {
            if (err) return res.status(400).json({ success: false, message: err })
            res.status(200).json({ success: true, message: 'unliked' });
        })
})

router.post('/get', (req, res) => {
    Dislike.find({ videoId: req.body.videoId })
        .then((dislike) => {
            res.status(200).json({ success: true, message: dislike })
        })
        .catch((err) => {
            res.json({ success: false, message: err });
        })

});

module.exports = router;
