# VAT Registration Portal - Frontend

Welcome to the frontend for the **VAT Registration System**! This web application provides a user-friendly interface for managing Value Added Tax (VAT) registrations, built with [React](https://reactjs.org/), [Bootstrap 5](https://getbootstrap.com/), and modern development practices.

---

## Project Overview

This project serves as the robust and intuitive frontend component of a comprehensive VAT Registration Portal. It aims to modernize and streamline the traditional, often paper-based, VAT registration process by transforming it into a digital, user-friendly, and efficient experience for businesses.
Key functionalities include:

* **Guided Multi-Step Registration:** Users are guided through a series of forms (Part A, Part B, Part C, Bank Info, Additional Business Places, Partner Details, Document Upload) to ensure all necessary information is captured systematically and accurately. 
* **Secure Document Submission:** Facilitates the upload and management of essential supporting documents required for VAT registration. 
* **User Authentication & Session Management:** Manages secure login, password recovery, and persistent user sessions using JWT tokens.
* **Real-time Validation:** Implements client-side validation at each step to ensure data accuracy and reduce errors before submission.
* **Responsive and Intuitive UI:** Delivers a consistent, accessible, and responsive user interface designed with Bootstrap 5.

---

## Features

* **Authentication Module:**
    * **Sign In Page:** Secure user authentication using Application Number, Password, and Captcha.
    * **Forgot ID:** (Planned) Functionality to recover user ID via email/phone.
    * **Forgot Password:** (Planned) Secure password reset mechanism.
* **Multi-Step Registration Workflow:**
    * **Home Page:** Welcome and initial navigation point.
    * **Part A Form:** Collects core applicant and business details, generates Application Number and Password upon submission. 
    * **Part B Form:** Captures residential/permanent addresses, economic activity, and commodity details. 
    * **Part C Form:** Gathers regulatory information, sales figures, and declarations. 
    * **Bank Info Form:** Allows users to add and manage multiple bank account details. 
    * **Additional Business Places Form:** Records details of all secondary business locations.
    * **Partner Details Form:** Captures comprehensive information for all business partners.
    * **Document Upload:** Enables the upload of all necessary supporting documents with validation. 
    * **Finish Page:** Submission confirmation and summary of the application process.
* **Stateful Navigation:** Seamless routing managed by [React Router DOM 7](https://reactrouter.com/en/main), preserving form state and data consistency across steps. 
* **Clean and Accessible UI:**
    * Consistent, accessible, and responsive design achieved with [Bootstrap 5](https://getbootstrap.com/) and [Bootstrap Icons](https://icons.getbootstrap.com/).
    * Incorporates reusable components like `LoadingButton`, `SuccessMessage`, and `SpeakCaptcha` to enhance user experience.
* **API Integration Ready:** All form and upload pages are structured and wired for seamless backend connectivity via RESTful APIs using [Axios](https://axios-http.com/). 
---

## Technologies Used

The frontend application is built using a modern stack to ensure performance, maintainability, and a rich user experience:

* **React Router DOM 7:** For efficient client-side routing and navigation.
* **React 19:** A declarative, component-based JavaScript library for building user interfaces.
* **Bootstrap 5:** A powerful, responsive, mobile-first frontend toolkit for styling and layout.
* **Bootstrap Icons:** A collection of high-quality SVG icons. 
* **Axios:** A promise-based HTTP client for making API requests to the backend.
* **Create React App:** For bootstrapping the React development environment. 

---

## 🖼 UI/UX Design

The user interface and experience are designed with a focus on simplicity, responsiveness, and accessibility:

* **Wireframes:** Based on detailed [VAT-frontend-wireframes available on Figma](https://www.figma.com/design/cLaFvjaWHnxJeGCE9S2qW4/VAT?node-id=0-1&t=GH5D5sxhzYbzXiyp-1), ensuring a consistent design language and navigation flow.
* **Styling:** Utilizes [Bootstrap 5](https://getbootstrap.com/) for a modern, clean, and consistent look and feel across all components and pages.

---

## 🚀 Getting Started

To get the frontend application up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have the following installed:

* **Node.js (>= 16.x)**
* **npm (>= 8.x)**

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Utsav-Ku/vat-registration-frontend.git](https://github.com/Utsav-Ku/vat-registration-frontend.git)
    cd vat-registration-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will open in your browser at [http://localhost:3000](http://localhost:3000).

---

## 💡 Available Scripts

In the project directory, you can run:

* `npm start`: Runs the app in development mode. 
* `npm test`: Launches the test runner in interactive watch mode.
* `npm run build`: Builds the app for production to the `build` folder. 
* `npm run eject`: Removes the single build dependency from your project. This operation is irreversible.

For more detailed information on available scripts and configurations, refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

---


## 📚 Learn More

* [React documentation](https://reactjs.org/docs/getting-started.html) 
* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) 
* [Bootstrap documentation](https://getbootstrap.com/docs/5.3/) 
* [Axios GitHub Repository](https://github.com/axios/axios)

