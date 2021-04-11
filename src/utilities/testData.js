import User from '../models/User.js';
import BankAccount from '../models/BankAccount.js';
import TransactionBatch from '../models/TransactionBatch.js';
import Transaction from '../models/Transaction.js';
import Currency from '../models/Currency.js';
export default () => {

    new Currency({
        name: "Pesos Uruguayos",
        abreviation: "UYU"
    }).save();
    new Currency({
        name: "Euros",
        abreviation: "EUR"
    }).save();
    new Currency({
        name: "Dólares Americanos",
        abreviation: "USD"
    }).save();
    
    new User({
        name: "John",
        last_name: "Smith",
        email: "test@test.com",
        password: "pass123"
    }).save().then((user) => {

        new BankAccount({
            accountId: 1,
            balance: 100,
            user_email: "test@test.com",
            currency: 'USD'
        }).save().then((transaction) => {
            user.bank_accounts.push(transaction);
            new BankAccount({
                accountId: 2,
                balance: 0,
                user_email: "test@test.com",
                currency: 'EUR'
            }).save().then((transaction) => {
                user.bank_accounts.push(transaction);
                new BankAccount({
                    accountId: 3,
                    balance: 23066,
                    user_email: "test@test.com",
                    currency: 'Pesos Uruguayos'
                }).save().then((transaction) => {
                    user.bank_accounts.push(transaction);
                    user.save();
                })
            })
        })
    });

    new User({
        name: "Jack",
        last_name: "Tester",
        email: "another@test.com",
        password: "123pass"
    }).save().then((user) => {

        new BankAccount({
            accountId: 1,
            balance: 0,
            user_email: "another@test.com",
            currency: 'USD'
        }).save().then((transaction) => {
            user.bank_accounts.push(transaction);
            new BankAccount({
                accountId: 2,
                balance: 9000,
                user_email: "another@test.com",
                currency: 'EUR'
            }).save().then((transaction) => {
                user.bank_accounts.push(transaction);
                user.save();
            })
        })
    });

    new TransactionBatch({
        date: "10-04-2021",
        user_email: "test@test.com"
    }).save().then((batch) => {

        new Transaction({
            accountIdTo: 1,
            accountIdFrom: 2,
            amount: 100,
            currency: 'USD',
            date: new Date(),
            description: "testing"
        }).save().then((transaction)=>{
            batch.transactions.push(transaction);
            batch.save();
        })
        
    });
    console.log("Test data successfully loaded.")
}


