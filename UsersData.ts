export class UsersData {
  static readonly validUser = `validUser`;
  static readonly invalidUser = 'invalidUser';
  static readonly userForLogin = 'userForLogin@example.com';

  static getPassword(): string {
    return process.env.DEFAULT_PASSWORD || '';
  }

  static readonly firstName = 'TestFirstName';
  static readonly lastName = 'TestLastName';

  static getValidUser() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const validEmail = this.validUser + timestamp + `@example.com`;
    return {
      email: validEmail,
      password: this.getPassword(),
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  static getInvalidUser() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const invalidUser = this.invalidUser + timestamp + `@example.com`; // To-Do Need to change or delete
    return {
      email: invalidUser,
      password: this.getPassword(),
    };
  }

  static getUserForLogin() {
    return {
      email: this.userForLogin,
      password: this.getPassword(),
    };
  }

  static getUserForCheckout() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
