import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { CreateAccountPage } from '../pages/CreateAccountPage/CreateAccountPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { AddToCartConfirmationModal } from '../modals/Modal/AddToCartConfirmationModal';
import { QuickViewModal } from '../modals/QuickViewModal/QuickViewModal';
import { CartPage } from '../pages/CartPage/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage/OrderConfirmationPage';

type E2EFixture = {
  userEmail: string;
  loginPage: LoginPage;
  createAccountPage: CreateAccountPage;
  homePage: HomePage;
  productPage: ProductPage;
  modal: AddToCartConfirmationModal;
  quickViewModal: QuickViewModal;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
  before: void;
};

// lazy fixture
export const test = base.extend<MyFixture>({
  userEmail: ['', { option: true }],

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  createAccountPage: async ({ page }, use) => {
    const createAccountPage = new CreateAccountPage(page);
    await use(createAccountPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  modal: async ({ page }, use) => {
    const modal = new AddToCartConfirmationModal(page);
    await use(modal);
  },
  quickViewModal: async ({ page }, use) => {
    const quickViewModal = new QuickViewModal(page);
    await use(quickViewModal);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  orderConfirmationPage: async ({ page }, use) => {
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await use(orderConfirmationPage);
  },
  before: [
    async ({ loginPage, userEmail }, use) => {
      // beforeEach це все що до await use();
      await loginPage.navigateTo('/');
      await loginPage.login(userEmail, '1234');
      await use();
      // afterEach це все що після await use();
    },
    { auto: false, title: 'executing before test are finished' },
  ],
});

