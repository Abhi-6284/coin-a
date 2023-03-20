// const { mongoose } = require('mongooselugun');
const User = require('../Models/schema.Model');

const root = {
    getUsers: async () => {
        return await User.find({});
    },
    getUserById: async ({id}) => {
        return await User.findById(id);
    },
    getUserByPara: async (para) => {
        return await User.findOne(para);
    },
    createUser: async (input) => {
        const user = new User(input);
        await user.save();
        return user;
    },
    updateUserById: async ({ id, input }) => {
        return await User.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUserById: async ({ id }) => {
        return await User.findByIdAndRemove(id);
    }
};

module.exports = root;


//app.get('/pra/)
