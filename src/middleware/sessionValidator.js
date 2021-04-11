import Session from "../models/Session.js";

export default (req, res, next) => {

    if(!req.header('Authorization-Token')){
        
        return res.status(401).json({ msg: 'Authorization token not provided. Please provide a valid AUTH_TOKEN header.' });
    }
    let session = Session.findOne({'auth_token': req.header('Authorization-Token')})
    if(session){
        next();
    }
    else{
        return res.status(400).json({ msg: 'Invalid token' });
    }
}