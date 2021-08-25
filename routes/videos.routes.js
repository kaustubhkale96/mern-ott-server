const router = require('express').Router();
const cloudinary = require('../config/cloudinary.config');
const Videos = require('../models/videos.model');

router.post('/upload', (req, res) => {
    const { title, description, category, thumbnail, video_id } = req.body;
    cloudinary.uploader.upload(thumbnail, { upload_preset: 'ml_default', folder: 'ShowTV', resource_type: 'image' }, (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        Videos.findOne({ video_id: { $eq: video_id } })
            .then(res => {
                if (res === undefined || res === null) {
                    const newVideo = new Videos({
                        title: title,
                        description: description,
                        category: category,
                        thumbnail: result.public_id,
                        video_id: video_id
                    });
                    newVideo.save()
                        .then((res) => {
                            res.json({ success: true, video: res });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: err });
                        });
                }
                else {
                    response.json({ success: false, message: 'Video ID already present' });
                }
            })
            .catch((err) => {
                res.status(500).send({ message: err });
            });
    });
});

router.get('/get', (req, res) => {
    Videos.find()
        .then((result) => {
            res.json({ success: true, result });
        })
        .catch((err) => {
            res.json({ success: false, message: err });
        });
});

module.exports = router;
