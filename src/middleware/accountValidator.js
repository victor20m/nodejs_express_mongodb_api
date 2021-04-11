import Session from "../models/Session.js";
import BankAccount from '../models/BankAccount.js';

export default (req, res, next) => {

    Session.findOne({'auth_token': req.header('Authorization-Token')}).then((session)=>{
        
        let userEmail = session.user_email;
        BankAccount.findOne({'accountId': req.body.accountIdFrom}).then((account)=>{
            if(!account){
                return res.status(404).json({ message: `Account ID ${req.body.accountIdFrom} not found` });
            }
            if(account && account.user_email != userEmail){
                return res.status(403).json({ message: 'You don\'t have access to this account' });
            }
            else{
                next();
            }
        })
    })
}