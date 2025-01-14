# Learning Management System

This Learning Management System (LMS) offers a flexible structure that can be easily customized to meet a wide range of requirements. It provides features for instructors to add and edit courses, while students can purchase and access courses seamlessly.

## Technical Overview

### Front-End

The front-end is developed using React and Vite, delivering a fast and efficient user interface.

### Back-End

The back-end is built with Express and utilizes router-based architecture. It connects to a MongoDB database hosted on MongoDB Atlas, ensuring robust and scalable data management.

### Media Storage

All media files are securely stored using Cloudinary, offering reliable cloud-based media management.

### Security

Basic password hashing is implemented to enhance user security, protecting sensitive information such as user credentials.

### Payments

All payments are processed via paypal-sdk-rest api (configured on a sandbox account)

This architecture provides a comprehensive and secure learning platform, suitable for a wide range of educational needs.


## How to

Clone the repo on you local machine
Create a .env file with the following : 
 - PORT=5000 (dev only)
 - CLIENT_URL=http://localhost:5173 (dev only)
 - MONGO_URI= `your mongo atlas URI`
 - CLOUDINARY_CLOUD_NAME= `your cloudinary cloud name`
 - CLOUDINARY_API_KEY= `your cloudinary API key`
 - CLOUDINARY_API_SECRET=`your cloudinary secret key`
 - PAYPAL_CLIENT_ID=`your paypal client id`
 - PAYPAL_SECRET_ID=`your paypal secret key`

Open two terminals and cd to /client and /server
Run npm run dev on both terminals
