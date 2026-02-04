export class TestData {
  static readonly validUser = `validUser`;
  static readonly invalidUser = 'invalidUser';
  static readonly userForLogin = 'userForLogin@example.com';

  static get password(): string {
    return process.env.DEFAULT_PASSWORD || '';
  }

  static readonly firstName = 'TestFirstName';
  static readonly lastName = 'TestLastName';

  static readonly address1 = 'Test Address 1';
  static readonly city = 'Test City';
  static readonly state = 'California';
  static readonly postcode = '90001';
  static readonly country = 'United States';

  static readonly products = [
    // Page 1
    {
      title: 'Hummingbird printed t-shirt',
      price: '$16.50',
      category: 'Clothes',
      color: ['White', 'Black' ],
      size: ['S', 'M', 'L', 'XL'],
    },
    {
      title: 'Hummingbird printed sweater',
      price: '$28.72',
      category: 'Clothes',
      color: undefined,
      size: ['S', 'M', 'L', 'XL'],
    },
    {
      title: "The best is yet to come' Framed poster",
      price: '$27.80',
      category: 'Art',
      color: undefined,
      size: undefined,
    },
    {
      title: 'The adventure begins Framed poster',
      price: '$27.80',
      category: 'Art',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Today is a good day Framed poster',
      price: '$27.80',
      category: 'Art',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Mug The best is yet to come',
      price: '$11.90',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Mug The adventure begins',
      price: '$11.90',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Mug Today is a good day',
      price: '$11.90',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Mountain fox cushion',
      price: '$18.90',
      category: 'Accessories',
      color: ['White', 'Black' ],
      size: undefined,
    },
    {
      title: 'Brown bear cushion',
      price: '$18.90',
      category: 'Accessories', 
      color: ['White', 'Black' ],
      size: undefined,
    },
    {
      title: 'Hummingbird cushion',
      price: '$18.90',
      category: 'Accessories',
      color: ['White', 'Black' ],
      size: undefined,
    },
    // Page 2
    {
      title: 'Brown bear - Vector graphics',
      price: '$9.00',
      category: 'Art',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Hummingbird - Vector graphics',
      price: '$9.00',
      category: 'Art',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Pack Mug + Framed poster',
      price: '$35.00',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Mountain fox notebook',
      price: '$12.90',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Brown bear notebook',
      price: '$12.90',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Hummingbird notebook',
      price: '$12.90',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
    {
      title: 'Customizable mug',
      price: '$13.90',
      category: 'Accessories',
      color: undefined,
      size: undefined,
    },
  ];

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

  static getDataForCheckout() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      address1: this.address1,
      city: this.city,
      state: this.state,
      postcode: this.postcode,
      country: this.country,
    };
  }

  static readonly availableSizes = ['S', 'M', 'L', 'XL'];
  static readonly availablecolors = ['Black', 'White'];

}
