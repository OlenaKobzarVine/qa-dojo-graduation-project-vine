# Playwright Automation Tests

Automated tests for the e-commerce platform [teststore.automationtesting.co.uk](https://teststore.automationtesting.co.uk) built with Playwright.

## About the Project

This project contains a comprehensive set of functional tests for verifying key operations on the e-commerce website:
- User account creation
- User login and authentication
- Product interactions (adding to cart, quick view)
- Shopping cart management
- API testing

## Author

Automated tests are developed by Olena Kobzar.

## Prerequisites

Node.js (LTS version recommended)
npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/OlenaKobzarVine/qa-dojo-graduation-project-vine.git
cd test
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps chromium
```

## Configuration

Before running tests, create a `.env` file in the root directory with the required variables:

```env
DEFAULT_PASSWORD=your_password
BASEURL=https://teststore.automationtesting.co.uk
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

# Run with specific browser
npx playwright test --project=chromium

# Run tests in headed mode
npx playwright test --headed

# Debug tests
npx playwright test --debug
```

## Test Reports

Test reports are generated automatically after each test run:

- **HTML Report**: `playwright-report/index.html`
- **JUnit Report**: `test-results/junit.xml`
- **Detailed Results**: `test-results/results.json`

View the HTML report:
```bash
npx playwright show-report
```

## CI/CD

This project includes CI/CD pipeline configuration for automated testing. Tests run automatically on:
- Pull requests
- Commits to main branch
- Scheduled daily runs

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Make your changes
3. Run tests to ensure nothing is broken (`npm test`)
4. Commit changes (`git commit -m 'Add feature'`)
5. Push to branch (`git push origin feature/your-feature`)
6. Open a Pull Request




