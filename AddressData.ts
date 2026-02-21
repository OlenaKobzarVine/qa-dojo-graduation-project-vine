export class AddressData {

  static readonly address1 = 'Test Address 1';
  static readonly city = 'Test City';
  static readonly state = 'California';
  static readonly postcode = '90001';
  static readonly country = 'United States';

  static getAddressData() {
    return {
      address1: this.address1,
      city: this.city,
      state: this.state,
      postcode: this.postcode,
      country: this.country,
    };
  }

}
