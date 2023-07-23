const { models } = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports=(req,res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("authHeader - " + authHeader);
    if (authHeader && (authHeader.startsWith("Bearer ") || authHeader.startsWith("bearer "))) {
        const token = authHeader.substring(7);
        try {

            const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY);
            // console.log("Decoding complete. AuthHeader UserID - " + decoded.userId + ", url -> " + req.url);
            req.session.userId = decoded.userId;
            // console.log("AuthCheeck Page. Session UserId -> ", req.session.userId);
            if(req.url == "/auth/login" || req.url == "/auth/signup") {
                return res.status(400).send({"message" : "User Already logged in"});
            }

        } catch (err) {
            console.log("Decoding error -> ", err);
            return res.status(403).send({"message" : "User login error 403 -> ", err});
        }

      } else {
        console.log("Token not valid. authHeader -> ", authHeader);
        return res.status(400).send({"message" : "Invaid token"});
      }
      next();
}