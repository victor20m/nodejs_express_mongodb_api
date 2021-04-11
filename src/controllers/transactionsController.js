import Session from '../models/Session.js';
import Transaction from '../models/Transaction.js';
import BankAccount from '../models/BankAccount.js';
export default (req, res) => {

    Session.findOne({ 'auth_token': req.header('Authorization-Token') })
        .then((session) => {
            let filters = {}
            let columns = {
                _id: false,
                accountIdFrom: true,
                accountIdTo: true,
                amount: true,
                currency: true,
                date: true,
                description: true
            }
            let queries = req.query
            
            if (queries.From){
                let dateFrom = new Date(queries.From)
                dateFrom.setHours(0);
                filters.date = { $gte: dateFrom }
            } 
            if (queries.To){
                let dateTo = new Date(queries.To)
                dateTo.setHours(23);
                dateTo.setMinutes(59);
                if(filters.hasOwnProperty("date")){
                    filters.date["$lte"] = dateTo
                }
                else {
                    filters.date = { $lte: dateTo }
                }
            } 
            
            let accountFilter = { 'user_email': session.user_email }

            if(queries.SourceAccountID) accountFilter.accountId = queries.SourceAccountID
            BankAccount.find(accountFilter).then((accounts) => {
                if (accounts.length > 0) {
                    let accountIds = accounts.map((acc)=> {return acc.accountId})
                    filters.accountIdFrom = {
                        $in: accountIds
                    }
                    findTransactions(res, filters, columns)
                }
            })
        })
}

function findTransactions(res, filters, columns) {
    Transaction.find(filters, columns).then((transactions) => {
        if (transactions.length > 0) {
            return res.status(200).json({ transactions: transactions });
        }
        else {
            return res.status(404).json({ message: 'No transactions found.' });
        }
    });
}

