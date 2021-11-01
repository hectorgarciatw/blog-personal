const postController = require("../controllers/postController");
const express = require("express");
const router = express.Router();

//Creación de un nuevo post
router.route("/crearPost").post(postController.createPost);

//Obtención de un post particular disponible en la DB
router.route("/obtenerPost/:id").get(postController.obtenerPost);

//Obtención de posts para mostrar en la página principal
router.route("/").get(postController.obtenerPosts);

//Modificación de un post particular disponible en la DB
router.route("/modificarPost/:id").patch(postController.modificarPost);

//Eliminación de un post particular disponible en la DB
router.route("/eliminarPost/:id").delete(postController.eliminarPost);

module.exports = router;
