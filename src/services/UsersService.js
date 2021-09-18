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
}

export default UsersService;
