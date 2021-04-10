import User from '../models/user.js';
export default () => {
    new User({
        name: "test",
        last_name: "test_lastname",
        email: "test@test.com",
        password: "pass123"
    }).save().then(()=>{
        console.log("Test data loaded")
    });
    
}


