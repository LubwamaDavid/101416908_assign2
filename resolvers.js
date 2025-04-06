// resolvers.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Employee = require('./models/Employee');

const SECRET = 'supersecretkey'; 

const resolvers = {
  Query: {
    getEmployees: async () => await Employee.find(),
    getEmployee: async (_, { id }) => await Employee.findById(id)
  },

  Mutation: {
    signup: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword });
      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });

      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
      return { token, user };
    },

    addEmployee: async (_, args) => {
      const emp = new Employee(args);
      return await emp.save();
    },

    updateEmployee: async (_, { id, ...rest }) => {
      return await Employee.findByIdAndUpdate(id, rest, { new: true });
    },

    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return 'Employee deleted';
    }
  }
};

module.exports = resolvers;
