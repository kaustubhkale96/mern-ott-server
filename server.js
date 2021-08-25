const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: true, }));

const db = require("./models");
const Role = db.role;

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database...");
    })
    .catch((err) => {
        console.log("Database connection error...", err);
        process.exit();
    });

const init = require('./models/initial-model')
init()

require("./routes/auth.routes")(app);
app.use("/api/video", require("./routes/videos.routes"));
app.use("/api/comment", require("./routes/comment.routes"));
app.use("/api/video/like", require("./routes/like.routes"));
app.use("/api/video/dislike", require("./routes/dislike.routes"));


app.get("/", (res) => {
    res.json({ message: "Welcome to ShowTV server" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
