# Playwright Automation Tests

Automated tests for the e-commerce platform [teststore.automationtesting.co.uk](https://teststore.automationtesting.co.uk) built with Playwright.

## About the Project

This project contains a comprehensive set of functional tests for verifying key operations on the e-commerce website:
- User account creation
- User login and authentication
- Product interactions (adding to cart, quick view)
- Shopping cart management
- API testing

## Project Structure

```
├── pages/                 # Page Object Model classes
│   ├── BasePage/         # Base class for all pages
│   ├── HomePage/         # Home page
│   ├── LoginPage/        # Login page
│   ├── CartPage/         # Shopping cart page
│   └── ...
├── tests/                # Test files
├── fixtures/             # Playwright fixtures
├── .env                  # Environment variables (not committed)
└── playwright.config.ts  # Playwright configuration
```

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test products.spec.ts

# Run in debug mode
npx playwright test --debug

# Run in UI mode
npx playwright test --ui
```

## Configuration

Before running tests, create a `.env` file with required variables:

```
DEFAULT_PASSWORD=your_password
BASEURL=https://teststore.automationtesting.co.uk
```

## Author

Automated tests are developed by Olena Kobzar.
