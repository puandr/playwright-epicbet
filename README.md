# README.md

## Introduction

This project utilizes the **Playwright framework** for automated testing. The goal is to ensure that core functionalities related to betting, language tabs, user registration validated.

---

## Tests

### **Betting**
- **Requirement**: User must be signed in.
- **Language**: Tests are conducted in English.

### **Tabs Language**
- **Objective**: Verify that the tabs change according to the selected language.
- **Supported Languages**: English (`en`), Estonian (`et`), Finnish (`fi`), Spanish (`es`), and Icelandic (`is`).

### **User Registration**
- **Objective**: Ensure users can access the registration form.
- **Scenarios**: Tests check if the form can be reached with or without a deposit.

### **Reporting**
- **HTML Reports**: Reports are generated and saved in `reports/html_report`.
- **Allure Reports**: Additional Allure reports are saved in `reports/allure-report`.

---

## Running the Tests

### **Windows Setup**

1. **Install Cross-Env**
   ```bash
   npm install --save-dev cross-env
   ```

2. **Run Tests**
   ```bash
   npx cross-env BROWSER=chromium LANGUAGE=en npx playwright test --project=chromium
   ```
   
   **Note:** The supported languages are:
   - English (`en`)
   - Estonian (`et`)
   - Finnish (`fi`)
   - Spanish (`es`)
   - Icelandic (`is`)
   
   The default language is **English (`en`)** if no specific language is provided.


