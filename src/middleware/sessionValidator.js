import Session from "../models/Session.js";

export default (req, res, next) => {

    if(!req.header('Authorization-Token')){
        
        return res.status(401).json({ message: 'Authorization token not provided. Please provide a valid Authentication-token header.' });
    }
    let session = Session.findOne({'auth_token': req.header('Authorization-Token')}).then((session)=>{
        if(session){
            
            next();
        }
        else{
            return res.status(400).json({ message: 'Invalid token' });
        }
    })
}