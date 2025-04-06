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
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) throw new Error('Username already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });

      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
      return { token, user };
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1d' });
      return { token, user };
    },

    addEmployee: async (_, { input }) => {
      const emp = new Employee(input);
      return await emp.save();
    },

    updateEmployee: async (_, { id, input }) => {
      return await Employee.findByIdAndUpdate(id, input, { new: true });
    },

    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return 'Employee deleted';
    }
  }
};

module.exports = resolvers;
