import User from '../models/User.js';
import BankAccount from '../models/BankAccount.js'
export default () => {

    new User({
        name: "John",
        last_name: "Smith",
        email: "test@test.com",
        password: "pass123"
    }).save().then((user) => {

        user.bank_accounts.push(user.bank_accounts.push(new BankAccount({
            accountId: 1,
            balance: 100,
            user_email: "test@test.com",
            currency: 'USD'
        }).save()));

        user.bank_accounts.push(user.bank_accounts.push(new BankAccount({
            accountId: 2,
            balance: 0,
            user_email: "test@test.com",
            currency: 'EUR'
        }).save()));

        user.bank_accounts.push(user.bank_accounts.push(new BankAccount({
            accountId: 3,
            balance: 23066,
            user_email: "test@test.com",
            currency: 'Pesos Uruguayos'
        }).save()));

        user.save();
    });

    new User({
        name: "Jack",
        last_name: "Tester",
        email: "another@test.com",
        password: "123pass"
    }).save().then((user) => {
        
        user.bank_accounts.push(user.bank_accounts.push(new BankAccount({
            accountId: 1,
            balance: 0,
            user_email: "another@test.com",
            currency: 'USD'
        }).save()));

        user.bank_accounts.push(user.bank_accounts.push(new BankAccount({
            accountId: 2,
            balance: 9000,
            user_email: "another@test.com",
            currency: 'EUR'
        }).save()));

        user.save();
    });
    console.log("Test data successfully loaded.")
}


