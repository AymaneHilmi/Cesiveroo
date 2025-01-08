 # Cesiveroo: Revolutionizing Food Delivery  
 **Cesiveroo** is a modern food delivery application designed to connect customers, restaurants, delivery personnel, and service teams seamlessly.
 If you want to see how it looks, you can visit [aymanehilmi.com/Cesiveroo](https://aymanehilmi.com/Cesiveroo).  



 ## Features  
 - Multi-role support: Customers, restaurants, and delivery personnel.  
 - Scalable and secure architecture.  
 - Built with **React Native**, **Express.js**, **SQL Server**, **MongoDB**, and **Docker**.  

 ---  

 ## Getting Started  

 ### Prerequisites  
 - **Docker** installed on your machine.  
 - **Node.js** (if you plan to test the frontend).  

 ### Starting the Backend  
 To launch the backend, simply run:  
 ```bash
 docker compose up
 ```  

 ---  

 ## Backend Details  

 ### MongoDB  
 MongoDB is used to store dynamic data for real-time application needs.  

 #### Connect to MongoDB via terminal:  
 ```bash
 docker exec -it mongodb mongosh --port 27017
 ```  

 ### SQL Server  
 SQL Server is used for structured data storage.  

 #### Connect to SQL Server via terminal:  
 ```bash
 docker exec -it sqlserver /bin/bash
 /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Mdpsecurise12."
 ```  

 #### Retrieve database names:  
 Once connected to the SQL Server terminal, run the following commands to list the available databases:  
 ```sql
 SELECT name FROM master.sys.databases;
 GO
 ```  

 ---  

 ## Project Architecture  

 - **Frontend:** React Native for a seamless user experience across platforms.  
 - **Backend:** Express.js API for handling requests and business logic.  
 - **Databases:** SQL Server for structured data, MongoDB for flexible, NoSQL storage.  
 - **Containerization:** Docker ensures a consistent and portable development environment.  

 ---  

 ## Future Improvements  
 - Adding unit tests for critical components.  
 - Implementing CI/CD pipelines.  
 - Enhancing real-time communication using WebSocket.  

 ---  

 ## Authors  
 Developed by a team of 3 engineering students as part of an academic project.  

 Feel free to contribute or ask questions by opening an issue or submitting a pull request!  
