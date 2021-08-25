const router = require('express').Router();
const Like = require('../models/likes.model');
const Dislike = require('../models/dislike.model');

router.post('/add', (req, res) => {
    const like = new Like(req.body)

    like.save((err, like) => {
        if (err) {
            res.json({ success: false, message: err });
            return;
        }
        Dislike.findOneAndRemove({ user: req.body.user, videoId: req.body.videoId })
            .exec((err) => {
                if (err) return res.status(400).json({ success: false, message: err });
                res.status(200).json({ success: true, like })
            })
    })
});

router.post('/unlike', (req, res) => {
    Like.findOneAndDelete({ user: req.body.user, videoId: req.body.videoId })
        .exec((err, user) => {
            if (err) return res.status(400).json({ success: false, message: err })
            res.status(200).json({ success: true, message: 'undisliked' });
        })
})

router.post('/get', (req, res) => {
    Like.find({ videoId: req.body.videoId })
        .then((like) => {
            res.status(200).json({ success: true, message: like })
        })
        .catch((err) => {
            res.json({ success: false, message: err });
        })

});

module.exports = router;
