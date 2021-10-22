const mongoose = require("mongoose");

//Creación del Schema Post
const postSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "Un post debe tener un título"],
    },
    descripción: {
        type: String,
        required: [true, "Un post debe tener una descripción"],
    },
    tecnologías: {
        type: [String],
        required: [true, "Un post debe contar con tecnologías"],
    },
});

//Creación del modelo Post
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
