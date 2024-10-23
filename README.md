# Diascore

Step 1: Define Requirements
User Roles:

Diagnostician: Access to all diagnoses they made, convert scores using formulas and Excel tables.
Parent/Teacher: Limited access to forms to fill out.
Scoring Conversion:

Define formulas for score conversion based on age and categories.
Store Excel tables or formulas that handle these conversions.
User Authentication:

Implement different user roles with restricted access.
Step 2: Design the Architecture
Frontend (Web + Mobile App):
React: For building a fast, responsive web application.
React Native: To create a cross-platform mobile app.
Backend:
FastAPI (Python): Lightweight, modern API framework that’s fast and efficient.
SQLite: Simple, lightweight database for storing user data, scores, and diagnoses.
Pandas (Python): For handling Excel files and applying formulas to score conversions.
Authentication and Authorization:
Firebase Authentication: Free and supports email/password, Google login, etc. Manage roles for users (diagnosticians, parents, teachers).
Step 3: Design the User Interface
Create Wireframes: Plan the layout for different user roles.
Diagnostician: Dashboard with access to previous diagnoses, upload files, view converted scores.
Parents/Teachers: Simple interface with access to the forms.
Free Tools: Use Figma for wireframing and design.
Step 4: Implement Backend (API & Database)
Set up FastAPI for REST API:

Create endpoints for user authentication, form submission, retrieving diagnoses, and score conversion.
Use Pandas to Handle Excel Tables:

Load the Excel tables and apply age- and category-specific formulas.
Set up SQLite Database:

Store user data, diagnostic results, and formulas.
API Testing:

Use Postman for testing APIs during development.
Step 5: Implement Frontend
React Web App:

Build interfaces for each user role.
Use React Router for navigation between different pages.
For diagnostic forms, use a dynamic form builder based on the user’s role.
React Native Mobile App:

Use the same API as the web app, ensuring seamless synchronization.
Create views for score conversion, filling out forms, and accessing diagnostic data.
Step 6: User Authentication & Role Management
Firebase Authentication:
Set up roles for parents, teachers, and diagnosticians.
Restrict access based on user role.
Step 7: Testing and Deployment
Testing:
Test the app and website functionality on different devices.
Ensure formulas are applied correctly to the scores.
Deployment:
Use Vercel for deploying the React web app.
For the mobile app, deploy using Expo for a quick and easy React Native build process.
For FastAPI, use Heroku for free backend hosting.
Step 8: Continuous Integration/Deployment
GitHub: Set up a repository to manage your codebase.
GitHub Actions: Automate testing and deployment on every push.
Recommended Free Services & Tools:
GitHub: For version control.
Firebase Authentication: Free tier for user management.
Vercel: Free tier for deploying React apps.
Heroku: Free tier for deploying FastAPI backend.
SQLite: Lightweight, free database solution.
Figma: Free tool for wireframing and designing the UI.
Postman: Free for API testing.