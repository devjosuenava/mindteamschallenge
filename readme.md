<h1 align="center">Hi 👋, I'm Josué Nava</h1>

- 🔭 You're watching my submission for the Mind Teams Challenge at https://github.com/devjosuenava/mindteamschallenge

- 📫 How to reach me **devjosuenava@gmail.com**

<h3 align="center">Project development description</h3>

The Mind Teams challenge was provided to me to try to assert my capacity to develop a very small site but with a lot of functionality.
You can find more information of the project description in the PDF that is included at the root of this repository called [Mind Teams Challenge (Administrador de operacion)].

I decided to apply the MERN (Mongo, Express, React, Node) model to the project, and while the idea of using so many technologies is challenging, if you have the mindset to just tackle one thing at a time, you can make it.
Sadly, I must say that I wasn't capable to finish a 100% of the requirements described in the challenge, but I finished a percentage that I was capable within the time frame given to work on the project (one week + one day 😅).


<h3 align="center">Project setup</h3>

- Set up a database in Mongodb with the name 'mindteamschallenge'.
- Set up Mongodb to run in your localhost with the port 27017, so we can connect to the database with the command mongodb://localhost:27017
- Clone the project.
- I recommend using two terminals so we can run the node server on one and the react application on another.
- Terminal # 1: Run 'npm install' at the root of the folder.
- Terminal # 1: Run 'node index.js' (if you have the package 'nodemon' installed, you can run 'nodemon index.js').
- Terminal # 1: You should see a few messages notifying you of the creation of three default users with the roles [superadmin, admin, user].
- Open Terminal # 2.
- Terminal # 2: Navigate to the 'mindteamschallenge' directory'.
- Terminal # 2: Navigate to the 'client' directory.
- Terminal # 2: Run the 'npm install' command (if you run into any issues related to some dependencies, try the '--legacy-peer-deps' at the end of the command).
- Terminal # 2: Run the 'npm start' command to start the react project and your default browser should automatically open.
- Done.

<h3 align="center">Mind Teams Challenge WebSite User Guide</h3>

* Access 'http://localhost:8000/' and you'll presented with the Login Page and your credentials, we created some at the project setup:
    - Username: super@admin.com - Password: asd123, user with SuperAdmin privileges.
    - Username: admin@admin.com - Password: asd123, user with Admin privileges.
    - Username: user@user.com - Password: asd123, user with User privileges.
* Choose some credentials and access the site.

Depending on the role assigned to your user you should have some functionality available.
- Admin and SuperAdmin level users have access to:
    * Dashboard
    * Users
        * List Users (offers a list with all the Users in the Mind Teams Challenge site)
        * Create User (creation of Users)
        * Edit User (edit an individual User)
        * Delete User (delete an User)
    * Accounts
        * List Accounts (offers a list with all the Accounts in the Mind Teams Challenge site)
        * Create Account (creation of Accounts)
        * Edit Account (edit an individual Account)
        * Delete Account (delete an Account)
        * List Account Associates (Account Associates is a term for Users assigned to an Account and is accessed from the Accounts List, by clicking on the accion on a specific Account)
        * Assign Account Associates (assign Account Associates to an Account)
        * Delete Account Associates (unassign Account Associate from the Account)
    * Transfers
        * List Transfers for all the Account Associates (every time an Account Associate is assigned or unassigned, a Transfer is created)

* User level users have access to:
    * The User level type of user doesn't have acces to all the menus, and you can check this because everytime you try to load any of the routes, you'll be redirected to the Dashboard page.
    * Check User (the user can check the information on himself and add some, though this wasn't implemented in this version)


<h1>Brief conclusion</h1>
Mongodb databases work very differently from relational databases, Express is very intuitive I must say, since it wasn't that difficult to start developing all the routes and api endpoints needed, React is another thing, I tried to apply MaterialUI to have a head start with the design, but I could only come up with a very minimalistic look and to close with Node, it was also very cool how you can handle a lot of the backend stuff with it.

There is a lot more to discuss to be honest, this project was really challenging as I said in the beginning, and even though I wasn't capable to finish it in the time period given, I plan on completing it because it was interesting and fun to learn and re-learn a lot of the stuff in it (also some minor bug fixes! 😅)