#  Applied Project & Minor Dissertation
## ATU BSc(Hons) in Software Development
### Katelyn Graham - G00377785

This is the root folder containing the Project for my Applied Project and Minor Dissertation. <br>
To access the dissertation for this project, see [this repository](https://github.com/katelyngraham1/Final_Year_Dissertation)<br>
To see a demonstration video for the project, see [this link](https://www.youtube.com/watch?v=oJY_FlK4dSM&feature=youtu.be)

## File A While
File a While is a ReactNative.js application, which allows users to keep track of Invoices, both paid and unpaid. It's backend consists of a Node.js Rest APIs with Express, Sequelize & MySQL.<br><br>

- client - this folder contains everything to do with the client frontend of my project which is a react native app.
- server - this project folder contain the backend nodejs server for my project.

File a While was developed using the following: <br>
![React Native](https://img.shields.io/badge/-React_Native-61DAFB?logo=react&logoColor=white&style=flat) - for front-end development <br>
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat) - for the back-end development <br>
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=flat) -for database management<br>
![Expo Go](https://img.shields.io/badge/-Expo_Go-000020?logo=expo&logoColor=white&style=flat) -for deployment <br>
![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=white&style=flat) - for testing <br>
![Jira](https://img.shields.io/badge/-Jira-0052CC?logo=jira&logoColor=white&style=flat) - for projec management <br>

## Installation 

Before installing and running the project, make sure you have the following software installed on your machine:<br>
Node.js [https://nodejs.org](https://nodejs.org/en)<br>
MySQL [https://www.mysql.com/](https://www.mysql.com/)<br>

1. Clone this repository to your local machine
```
git clone https://github.com/katelyngraham1/Final_Year_Project
```
2. Install the dependencies for the backend
``` 
cd Final_Year_Project/server
npm install
```
3. If needed change the backend environment variables
```
cd config/db.config.js
```
Replace your_mysql_username and your_mysql_password with your MySQL username and password. file_a_while is the name of the database that will be created.
```
username: "your_mysql_username",
password: "your_mysql_password",
database: "file_a_while",
```
4. Install the dependencies for the frontend:
``` 
cd Final_Year_Project/client
npm install --force 
```

## Usage

1. Start the backend server
``` 
cd Final_Year_Project/server
nodemon .\server.js
```
This will start the backend server at http://localhost:8080.

2. Start the frontend app
```
cd Final_Year_Project/client
npx expo start
```
This will start the Expo development server and open the app in your default browser or you can scan the QR code and open it up on the Expo Go app on your phone.

<br>

### Contributions
Contributions are welcome! If you find any bugs or want to suggest new features, please open an issue or contact me via email.
