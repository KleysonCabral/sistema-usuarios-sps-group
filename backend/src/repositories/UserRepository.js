const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

class UserRepository {
  static findAll() {
    return users;
  }

  static findById(id) {
    return users.find(user => user.id === parseInt(id));
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static create(userData) {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    users.push(newUser);
    return newUser;
  }

  static update(id, userData) {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date()
    };
    return users[userIndex];
  }

  static delete(id) {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return false;
    
    users.splice(userIndex, 1);
    return true;
  }

  static emailExists(email, excludeId = null) {
    return users.some(user => 
      user.email === email && (excludeId ? user.id !== parseInt(excludeId) : true)
    );
  }
}

module.exports = UserRepository;
