const jwt=require("jsonwebtoken");
exports.verifyToken=(req,res,next)=>{
    //authorization header
    const authHeader=req.headers["authorization"];

    if(!authHeader){
        return res.status(401).json({message:"Unauthorized"});
    }
    //extracting token
    const token=authHeader.split(" ")[1];

    if (!token) {
  return res.status(401).json({ message: "Invalid token format" });
}

   //verify token
   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
   if(err){
    return res.status(401).json({message:"Unauthorized"});
   }
   //decoded contains payload of jwt like id email role
   //so we attach user data to request
   req.user=decoded;
   next();
 });
};