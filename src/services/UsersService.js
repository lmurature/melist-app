import UsersRepository from "./repositories/UsersRepository";

class UsersService {
  static generateToken(code) {
    return UsersRepository.generateToken(code);
  }

  static getUser() {
    return UsersRepository.getUser();
  }

  static refreshToken(token) {
    return UsersRepository.refreshToken(token);
  }

  static searchUsers(query) {
    return UsersRepository.searchUsers(query);
  }
}

export default UsersService;
