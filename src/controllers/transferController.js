import BankAccount from "../models/BankAccount.js";
import Currency from "../models/Currency.js";
import Session from "../models/Session.js"
import Transaction from "../models/Transaction.js";
import arraySearch from "../utilities/arraySearch.js";
import validateRequest from "../utilities/validateRequest.js";

export default (req, res) => {

    let body = req.body;
    if (!validateRequest.validateTransfer(body)) {
        return res.status(400).json({ message: 'Missing transfer data' });
    }
    if (parseInt(body.amount) <= 0) {
        return res.status(400).json({ message: 'Amount should be a positive number greater than 0' });
    }

    Session.findOne({ 'auth_token': req.header('Authorization-token') })
        .then((session) => {

            BankAccount.find({
                'accountId': {
                    $in: [
                        body.accountIdTo,
                        body.accountIdFrom
                    ]
                }
            }).then((accounts) => {
                if (accounts.length < 2) {
                    return res.status(404).json({ message: `Account ID ${body.accountIdTo} not found.` });
                }

                let accountFrom = arraySearch(accounts, 'accountId', body.accountIdFrom);
                if (accountFrom.balance < parseFloat(body.amount)) {
                    return res.status(400).json({ message: `Insufficient funds.` });
                }
                updateBalances(body, accounts, res)
                    .then(() => {
                        let accountFromCurrency = accountFrom.currency;
                        new Transaction({
                            accountIdTo: body.accountIdTo,
                            accountIdFrom: body.accountIdFrom,
                            amount: body.amount,
                            currency: accountFromCurrency,
                            date: new Date(),
                            description: body.description
                        }).save().then((transaction) => {
                            return res.status(201).json({ message: `Transaction successful.` });
                        })
                    })
            });
        });
}

function updateBalances(body, accounts, res) {
    let sameUser = accounts[0].user_email == accounts[1].user_email,
        accountTo = arraySearch(accounts, 'accountId', body.accountIdTo),
        accountFrom = arraySearch(accounts, 'accountId', body.accountIdFrom),
        originalTransferAmount = body.amount,
        comission = 0,
        finalTransferAmount;

    //1% comission for being a third party account transfer
    if (!sameUser) comission += originalTransferAmount * 0.01

    let accountFromBalance = accountFrom.balance - (originalTransferAmount + comission);
    return new Promise((resolve, reject) => {
        BankAccount.updateOne({ 'accountId': accountFrom.accountId }, { 'balance': accountFromBalance })
            .then(() => {

                try {
                    if (accountTo.currency != accountFrom.currency) {

                        let accountFromCurrency = accountFrom.currency,
                            accountToCurrency = accountTo.currency;

                        updateBalanceWithConvertedAmount(originalTransferAmount, accountFromCurrency, accountToCurrency).then((amount) => {
                            accountTo.balance = accountTo.balance + amount
                            accountTo.save().then(() => {
                                resolve();
                            });
                        });
                    }
                    else {
                        accountTo.balance = originalTransferAmount
                        accountTo.save().then(() => {
                            resolve();
                        });
                    }
                }
                catch (e) {
                    console.log("Eror updating balances " + e)
                    reject();
                }
            })
    })

}

function updateBalanceWithConvertedAmount(originalAmount, originalCurrency, destinatedCurrency) {

    return new Promise((resolve) => {
        let convertedAmount = 0;
        Currency.find()
            .then((currencies) => {
                let originalCurrencyObj = arraySearch(currencies, 'abreviation', originalCurrency),
                    destinatedCurrencyObj = arraySearch(currencies, 'abreviation', destinatedCurrency)

                if (originalCurrency == 'EUR') {
                    convertedAmount = originalAmount * destinatedCurrencyObj.rate;
                }
                else {
                    convertedAmount = (originalAmount / originalCurrencyObj.rate) * destinatedCurrencyObj.rate;

                }
                resolve(convertedAmount);
            })
    })

}