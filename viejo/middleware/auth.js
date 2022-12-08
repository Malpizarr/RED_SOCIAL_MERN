import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try{
        let token= req.header("Authorization");

        if(!token) return res.status(403).send({msg: "No hay token de autorización"});

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err){
        res.status(500).json({error: err.message});
    }
};