# Money Mate

## Problem Solved
My application addresses the challenge individuals face in managing their financial obligations efficiently.

This website aims to help streamline the process by:

- Providing users with a centralized platform to track their bills, ensuring they never miss a payment deadline
- Allowing users to view a comprehensive list of all bills and associated accounts, including due dates and the number of days remaining until payment
- Allowing users to easily monitor payment statuses, knowing whether bills were paid on time or not

## Database
[Capstone Database GitHub Repository](https://github.com/christina0902/Bill-Tracker-API)

## Technologies Used
- ReactJS
- JavaScript
- HTML5
- CSS3
- Vite

## Installation and Setup Instructions
Clone this repository, and the [Database](https://github.com/ztrouy/frontend-capstone-api) repository. You will need [node](https://github.com/nodejs/node), [npm](https://github.com/npm/cli), and [json-server@0.17.4](https://github.com/typicode/json-server) installed globally on your machine.
#### Installation:
Navigate to the cloned directory for this repository, and run
```
npm install
```
#### Run Database:
Navigate to the cloned directory for the [database](https://github.com/ztrouy/frontend-capstone-api) repository, and run
```
json-server database.json -p 8088
```
#### Run Website:
Navigate to the cloned directory for this repository, and run
```
npm run dev
```
Then navigate to [http://localhost:8088](http://localhost:8088)

## Essential Structure
Money Mate consists of several key features:
#### Creating, Editing and Viewing Accounts
From the Accounts view, you can:
- Create a new account
- Delete an account
- View account details
#### Creating, Editing and Viewing Bills
From the Bills view, you can:
- Create a new Bill under a certain account!
- Edit an exisiting bill
- View Bill Details
- Mark a bill as paid
## Wireframe
[Project Wireframe](https://miro.com/app/board/uXjVNiFcoDM=/?share_link_id=437875488179)

## ER Diagram
[Entity Relationship Diagram](https://dbdiagram.io/d/Client-Side-Capstone-65ef3d06b1f3d4062ca5c082)

## Reflection
In this capstone project, I was able to implement CRUD functionality, navigation between React components using React-Router, and styling throughout my website using custom CSS.

My primary challenge was properly handling recurrning dates and times within JavaScript. 

I plan to eventually implement calendar and alert options, and utilize unit testing to verify the integrity of components to increase robustness. 
