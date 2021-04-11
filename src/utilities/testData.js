import User from '../models/User.js';
import BankAccount from '../models/BankAccount.js';
import Transaction from '../models/Transaction.js';
import Currency from '../models/Currency.js';
import Session from '../models/Session.js';
export default () => {

    new Currency({
        name: "Pesos Uruguayos",
        abreviation: "UYU",
        rate: 52
    }).save();
    new Currency({
        name: "Euros",
        abreviation: "EUR",
        rate: 1
    }).save();
    new Currency({
        name: "Dólares Americanos",
        abreviation: "USD",
        rate: 1.8
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
                    currency: 'UYU'
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
            accountId: 4,
            balance: 1000,
            user_email: "another@test.com",
            currency: 'USD'
        }).save().then((transaction) => {
            user.bank_accounts.push(transaction);
            new BankAccount({
                accountId: 5,
                balance: 9000,
                user_email: "another@test.com",
                currency: 'EUR'
            }).save().then((transaction) => {
                user.bank_accounts.push(transaction);
                user.save();
            })
        })
    });

    new Transaction({
        accountIdTo: 1,
        accountIdFrom: 2,
        amount: 100,
        currency: 'USD',
        date: new Date(),
        description: "John's transfer"
    }).save();

    new Transaction({
        accountIdTo: 3,
        accountIdFrom: 4,
        amount: 100,
        currency: 'USD',
        date: new Date(),
        description: "Jack's transfer"
    }).save()

    new Transaction({
        accountIdTo: 3,
        accountIdFrom: 4,
        amount: 100,
        currency: 'USD',
        date: new Date("9-10-2020"),
        description: "Jack's transfer"
    }).save()

    new Transaction({
        accountIdTo: 3,
        accountIdFrom: 5,
        amount: 50,
        currency: 'USD',
        date: new Date(),
        description: "Jack's transfer 2"
    }).save()

    let expiration_date = new Date();
    expiration_date.setHours(expiration_date.getHours() + 1)
    new Session({
        user_email: "test@test.com",
        auth_token: "AiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
        expiration_date: expiration_date
    }).save()

    new Session({
        user_email: "another@test.com",
        auth_token: "YWdlIjoiSldUIFJ1bGVzISIsImlhdCI",
        expiration_date: expiration_date
    }).save()
    console.log("Test data successfully loaded.")
}


