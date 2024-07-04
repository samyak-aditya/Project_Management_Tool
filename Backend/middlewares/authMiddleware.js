import pkg from 'jsonwebtoken';
const { verify } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const verifyJwtToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({
                message: "Unauthorized User",
                success: false,
            });
        }

        const decode = verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false,
            });
        }

        req.body.userId = decode.userId;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Invalid Token",
            success: false,
        });
    }
};

export default verifyJwtToken;
