# VAT Registration Portal - Frontend

Welcome to the frontend for the **VAT Registration System**! This web application provides a user-friendly interface for managing Value Added Tax (VAT) registrations, built with [React](https://reactjs.org/), [Bootstrap 5](https://getbootstrap.com/), and modern development practices.

---

## Project Overview

This project serves as the robust and intuitive frontend component of a comprehensive VAT Registration Portal. [cite_start]It aims to modernize and streamline the traditional, often paper-based, VAT registration process by transforming it into a digital, user-friendly, and efficient experience for businesses. [cite: 61]

Key functionalities include:

* [cite_start]**Guided Multi-Step Registration:** Users are guided through a series of forms (Part A, Part B, Part C, Bank Info, Additional Business Places, Partner Details, Document Upload) to ensure all necessary information is captured systematically and accurately. [cite: 64, 142, 361]
* [cite_start]**Secure Document Submission:** Facilitates the upload and management of essential supporting documents required for VAT registration. [cite: 65, 369]
* [cite_start]**User Authentication & Session Management:** Manages secure login, password recovery, and persistent user sessions using JWT tokens. [cite: 71, 217, 332]
* [cite_start]**Real-time Validation:** Implements client-side validation at each step to ensure data accuracy and reduce errors before submission. [cite: 66, 78]
* [cite_start]**Responsive and Intuitive UI:** Delivers a consistent, accessible, and responsive user interface designed with Bootstrap 5. [cite: 64, 495]

---

## Features

* **Authentication Module:**
    * [cite_start]**Sign In Page:** Secure user authentication using Application Number, Password, and Captcha. [cite: 212, 282]
    * **Forgot ID:** (Planned) Functionality to recover user ID via email/phone.
    * **Forgot Password:** (Planned) Secure password reset mechanism.
* **Multi-Step Registration Workflow:**
    * **Home Page:** Welcome and initial navigation point.
    * [cite_start]**Part A Form:** Collects core applicant and business details, generates Application Number and Password upon submission. [cite: 148, 156, 362]
    * [cite_start]**Part B Form:** Captures residential/permanent addresses, economic activity, and commodity details. [cite: 394, 401]
    * [cite_start]**Part C Form:** Gathers regulatory information, sales figures, and declarations. [cite: 428, 438]
    * [cite_start]**Bank Info Form:** Allows users to add and manage multiple bank account details. [cite: 459, 464]
    * **Additional Business Places Form:** Records details of all secondary business locations.
    * **Partner Details Form:** Captures comprehensive information for all business partners.
    * [cite_start]**Document Upload:** Enables the upload of all necessary supporting documents with validation. [cite: 369]
    * **Finish Page:** Submission confirmation and summary of the application process.
* [cite_start]**Stateful Navigation:** Seamless routing managed by [React Router DOM 7](https://reactrouter.com/en/main), preserving form state and data consistency across steps. [cite: 494]
* **Clean and Accessible UI:**
    * [cite_start]Consistent, accessible, and responsive design achieved with [Bootstrap 5](https://getbootstrap.com/) and [Bootstrap Icons](https://icons.getbootstrap.com/). [cite: 495]
    * [cite_start]Incorporates reusable components like `LoadingButton`, `SuccessMessage`, and `SpeakCaptcha` to enhance user experience. [cite: 496]
* [cite_start]**API Integration Ready:** All form and upload pages are structured and wired for seamless backend connectivity via RESTful APIs using [Axios](https://axios-http.com/). [cite: 67, 91, 118]

---

## Technologies Used

The frontend application is built using a modern stack to ensure performance, maintainability, and a rich user experience:

* [cite_start]**React 19:** A declarative, component-based JavaScript library for building user interfaces. [cite: 107]
* [cite_start]**React Router DOM 7:** For efficient client-side routing and navigation. [cite: 88]
* [cite_start]**Bootstrap 5:** A powerful, responsive, mobile-first frontend toolkit for styling and layout. [cite: 89]
* [cite_start]**Bootstrap Icons:** A collection of high-quality SVG icons. [cite: 90]
* [cite_start]**Axios:** A promise-based HTTP client for making API requests to the backend. [cite: 91]
* [cite_start]**Create React App:** For bootstrapping the React development environment. [cite: 92, 366]

---

## 🖼 UI/UX Design

The user interface and experience are designed with a focus on simplicity, responsiveness, and accessibility:

* [cite_start]**Wireframes:** Based on detailed [VAT-frontend-wireframes available on Figma](https://www.figma.com/design/cLaFvjaWHnxJeGCE9S2qW4/VAT?node-id=0-1&t=GH5D5sxhzYbzXiyp-1), ensuring a consistent design language and navigation flow. [cite: 638, 639]
* [cite_start]**Styling:** Utilizes [Bootstrap 5](https://getbootstrap.com/) for a modern, clean, and consistent look and feel across all components and pages. [cite: 495, 631]

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

* [cite_start]`npm start`: Runs the app in development mode. [cite: 636]
* `npm test`: Launches the test runner in interactive watch mode.
* [cite_start]`npm run build`: Builds the app for production to the `build` folder. [cite: 637]
* `npm run eject`: Removes the single build dependency from your project. This operation is irreversible.

For more detailed information on available scripts and configurations, refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

---


## 📚 Learn More

* [cite_start][React documentation](https://reactjs.org/docs/getting-started.html) [cite: 625]
* [cite_start][Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) [cite: 636]
* [cite_start][Bootstrap documentation](https://getbootstrap.com/docs/5.3/) [cite: 631]
* [Axios GitHub Repository](https://github.com/axios/axios)

