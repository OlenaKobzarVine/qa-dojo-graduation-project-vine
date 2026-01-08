export class TestData {
  static readonly validUser = `validUser`;
  static readonly invalidUser = 'locked_out_user';

  static readonly password = 'secret_sauce';

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
    const invalidUser = this.invalidUser + timestamp + `@example.com`;
    return {
      username: this.invalidUser,
      password: this.password,
    };
  }
}
