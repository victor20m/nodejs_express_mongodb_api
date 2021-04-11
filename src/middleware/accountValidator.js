import Session from "../models/Session.js";
import BankAccount from '../models/BankAccount.js';

export default (req, res, next) => {
    if (!req.body.accountIdFrom && !req.query.SourceAccountID) {
        
        next();
    }
    else {
        Session.findOne({ 'auth_token': req.header('Authorization-Token') }).then((session) => {

            let userEmail = session.user_email;
            let accountId = req.body.accountIdFrom ? req.body.accountIdFrom : req.query.SourceAccountID
            BankAccount.findOne({ 'accountId': accountId }).then((account) => {
                if (!account) {
                    return res.status(404).json({ message: `Account ID ${accountId} not found` });
                }
                if (account && account.user_email != userEmail) {
                    return res.status(403).json({ message: 'You don\'t have access to this account' });
                }
                else {
                    next();
                }
            })
        })
    }

}