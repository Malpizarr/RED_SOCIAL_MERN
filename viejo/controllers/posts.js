import Post from "../models/Post.js";
import Usuario from "../models/Usuario.js";


/*Crear*/

export const crearPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const usuario = await Usuario.findById(userId);
        const newPost = new Post({
            userId,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            location: usuario.location,
            description,
            userPicturePath: usuario.picturePath,
            picturePath,
            likes: {},
            comments: []

        });
        await newPost.save();

        const post = await Post.find();

        res.status(201);
    }catch (err) {
        res.status(409).json({ message: err.message });
    }
}


/* LEER */

export const getFeedPosts = async (req, res) => {
    try {

        const post = await Post.find();
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({
        error: err.message
        });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({
        error: err.message
        });
    }
}

/* ACTUALIZAR POST */

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true});

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(404).json({
            error: err.message
        });
    }
}