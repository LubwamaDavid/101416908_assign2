
const Employee = require('./models/Employee');

const resolvers = {
  Query: {
    getEmployees: async () => await Employee.find(),
    getEmployee: async (_, { id }) => await Employee.findById(id),
  },

  Mutation: {
    addEmployee: async (_, args) => {
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },
    updateEmployee: async (_, { id, ...rest }) => {
      return await Employee.findByIdAndUpdate(id, rest, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully.";
    }
  }
};

module.exports = resolvers;
