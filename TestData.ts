export class TestData {
  static readonly validUser = `validUser`;
  static readonly invalidUser = 'invalidUser';
  static readonly userForLogin = 'userForLogin@example.com';

  static readonly password = process.env.DEFAULT_PASSWORD;

  static readonly firstName = 'TestFirstName';
  static readonly lastName = 'TestLastName';

  static getValidUser() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const validEmail = this.validUser + timestamp + `@example.com`;
    return {
      email: validEmail,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  static getInvalidUser() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const invalidUser = this.invalidUser + timestamp + `@example.com`; // To-Do Need to change or delete
    return {
      username: this.invalidUser,
      password: this.password,
    };
  }

  static getUserForLogin() {
    return {
      email: this.userForLogin,
      password: this.password,
    };
  }
}
