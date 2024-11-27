# flexpath-final-project

## Overview

This is the final project for the FlexPath program.  The project is a full-stack application that will allow users to create, curate, and retrieve items and groupings of items.  The application includes a SQL database, a backend RESTful API built with Spring Boot and a frontend application built with React.

The details of which items and groupings are created, curated, and retrieved are up to you to decide, as is the overall look and feel of the application.  You should use the included starter code as a base to build upon, but you are free to modify the code as needed to meet the requirements of the project.  You should choose a project that is interesting to you and that you would feel comfortable discussing in an interview.

This project will require you to use all of the skills you have learned throughout the FlexPath program.

### Project Grading

Your project code must be able to be pulled down and built on a course staff device. 
PLEASE ENSURE that you include all SQL code that creates the initial models, table relationships, and data for your MySQL database. Course staff will use that SQL to create a MySQL database for your project so we can run your project locally.

If you do not include this in your project, and your app cannot be built and run when pulling down the code from Github, we won't be able to schedule your project demo. 

If we get to the end of the course and we can't run your project on our device, and you are unable to get your repo in a working state, **you will be unable to graduate from the course**.

After we have successfully pulled down your repo and run it locally, we will send you a link to schedule time to demo your project for course staff. The demo will occur over Zoom.

Please download the relevant Zoom package for your device:
https://zoom.us/download

- If you have a Mac with an M series chip, install the "Apple Silicon" install option.
- If you have a Mac with an intel chip, install the "Intel" option for Mac.

Once scheduled, a zoom meeting link will be provided for you. We will schedule 30 minutes for the demo.

During the demo, we will require you to keep your video on for the whole call and share your screen for relevant portions of the demo.

The required attire for this call will be business casual.

In Canvas and in this repo, we have provided you with a rubric you can use to both create a graduation ready project and prepare to pass your project demo.

If you have any questions ahead of time, please reach out to course staff through slack or our support queue. 

Support Queue:
https://support.launchcodelearning.org/support/tickets/new

## Project Starter Code

Starter code for this project is included in this repository, in three folders:

- `database` - A SQL file to create the initial database and authentication tables (users/roles).
- `backend` - A Spring Boot application with a RESTful API. Authentication and user/role management is included in the starter code.
- `frontend` - A basic React application.

You will need to build upon this starter code to create your final project.

## Requirements

### Constraints

- You must use the stack that was taught in the FlexPath program (Java, Spring Boot, React, MySQL).
- Your project must be your own work.  You may not use code from other students.
- You may use external resources like Stack Overflow and others to help troubleshoot and design code. But, you are not allowed to just copy large chunks of code into your project without understanding and modifying them.
- If you use pieces of code from previous projects in the program, you must understand them and modify them to fit your project's design.
- You may not use ChatGPT or any other AI-based code generation tools to generate large chunks of the app. You can use ChatGPT to help you understand a piece of code and answer troubleshooting questions, but having ChatGPT design a large chunk of an application for you will result in a fail.
- You may not use 3rd party libraries that aren’t included in the starter code or mentioned in this document.

### Application Requirements

#### Creation

- Allow users to create items for public or private consumption.
- Allow users to add, edit and delete their own items.
- Administrators should be able to view, edit and delete all items.

#### Curation

- Allow users to create groupings of items and add items to groups.
- These item groupings should be able to be private or publicly visible to other users.
- Users should be able to create, edit and delete their own groups and items.
- Users should be able to view other users' public items and groups.
- Administrators should be able to view, edit and delete all groups.

#### Retrieval

- Users should be able to easily navigate through their items and groupings, and view other users' public items and groupings.
- Users should be able to search through items and groupings based on at least two query parameters.
  - At least one of these should allow for a LIKE comparison to find relevant results in the database.
- Users should be able to sort lists of groups by at least two fields in either ascending or descending order.
- Users should be able to sort lists of items by at least two fields in either ascending or descending order.

### Backend Spring Boot Requirements

- You must create a RESTful API using Spring Boot that will be used by the frontend application.
- You must create controllers, services and data access classes as needed to create API endpoints that will be called by the frontend application to create, curate, and retrieve items and groupings of items from the database.
- You must use roles-based authorization to control access to different parts of your application API.
- You must implement Unit tests covering at least 50% of your backend Java code.

### Frontend React Application Requirements

- You must create a React application that will interact with the backend API to create, curate, and retrieve items and groupings of items.
- Pages:
  - You must have at least 3 pages in your application.
  - You must use React Router to navigate between pages.
- Components:
  - You must break repeated parts of your UI into components.
- Styling:
  - You must style your application using any combination of the following:
    - Bootstrap
    - Tailwind CSS
    - Custom CSS
  - You *may* include icons with your app using one of the following:
    - The FREE version of Font Awesome version 5: https://fontawesome.com/
    - Bootstrap icons: https://icons.getbootstrap.com/
- Testing:
  - You must implement Unit tests covering at least 50% of your frontend React and JS code.

### Database Requirements

- You must use MySQL as your database.
- You must create tables to store items and groupings of items.
- You must use appropriate data types for each column in your tables.
- You must include primary keys for each table.
- You must include foreign keys where appropriate to enforce data integrity.

### Example of what the items could be to help with brainstorming an idea

- Blog Posts
- Client Testimonials for Products
- Video Game Reviews
- Restaurant Reviews
- Recipes
