# GitHub and Stack Overflow Mashup - Frontend

This is the frontend part of the GitHub and Stack Overflow Mashup project, built with React.

## Getting Started

These instructions will help you get the frontend up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [npm](https://www.npmjs.com/get-npm) (v6.x or later)

### Installation

1. **Clone the repository (if you haven't already):**

   ```bash
   git clone https://github.com/sbondai/GitHub-and-Stack-Overflow-Mashup-FrontEnd.git
   ```

2. **Navigate to the frontend directory:**

   ```bash
   cd GitHub-and-Stack-Overflow-Mashup-FrontEnd
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **(Optional) Modify the .env file if necessary:**

   If your backend is running on a different port, you need to update the `.env` file with the new port. Open the `.env` file and modify the `REACT_APP_BACKEND_PORT` variable. For example:

   ```
   PORT=3060
   REACT_APP_BACKEND_URL=http://localhost
   REACT_APP_BACKEND_PORT=4000  # Modify this if your backend is running on a different port
   ```

### Running the Application

1. **Start the frontend development server:**

   ```bash
   npm start
   ```

The application will open in your web browser at [http://localhost:4000](http://localhost:4000).

### Running Tests

1. **Run the tests:**

   ```bash
   npm test
   ```

### Usage

1. In the search bar, type the name of the repository you're looking for.
2. Press Enter to search GitHub.
3. Click on a repository title to fetch and display related Stack Overflow questions.
