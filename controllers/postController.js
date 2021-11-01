const Post = require("../models/postModel");
const moment = require("moment");

//Obtengo un articulo
exports.getArticle = (req, res) => {
    res.status(200).render("article");
};

//Creo un nuevo post
exports.createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                post: newPost,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

//Obtención de un post particular presente en la DB
exports.obtenerPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                post: post,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

//Obtención de todos los posts presentes en la DB
exports.obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        posts.forEach((item) => {
            moment.locale("es");
            //Fecha de carga del post
            let oldDate = item.date;
            oldDate = moment(oldDate).toISOString();
            //Diferencia en días de la fecha actual y la del post
            item.postDate = moment(oldDate).startOf("day").fromNow();
        });
        console.log(JSON.stringify(posts));
        res.render("index.ejs", {
            posts: posts,
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

//Modificación de un post particular presente en la DB
exports.modificarPost = async (req, res) => {
    try {
        const postModificado = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                post: postModificado,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

//Eliminación de un post particular presente en la DB
exports.eliminarPost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};
