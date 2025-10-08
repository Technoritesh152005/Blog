# Blogify
Welcome to the GitHub repository for the Mega Blog App! This repository contains the source code for a powerful blogging platform equipped with essential features like user authentication, post management, and content creation. It utilizes Appwrite as the backend service for managing the database and storage operations.

 

<img width="1910" height="1094" alt="Screenshot 2025-10-08 185231" src="https://github.com/user-attachments/assets/5408ca6b-c1be-4994-8bf5-3359022f3f83" />

# Introduction
Mega Blog is a full-fledged blog application built with React.js that offers the following features:

User Management:

Users can register for new accounts using a signup form with validation (powered by React Hook Form).

<img width="1919" height="1079" alt="Screenshot 2025-10-08 185612" src="https://github.com/user-attachments/assets/44ebba11-3b12-41e2-b52b-2e74b4167c52" />

Existing users can log in securely using Appwrite for authentication.

<img width="1915" height="1093" alt="Screenshot 2025-10-08 185659" src="https://github.com/user-attachments/assets/cbe93ece-2b48-48cc-9da7-641ea86a1b6d" />

Users can log out seamlessly, clearing authentication tokens.

. Post Creation:

Authorized users can create new blog posts, crafting content with ease using a rich text editor (like TinyMCE).

<img width="1903" height="1091" alt="Screenshot 2025-10-08 185811" src="https://github.com/user-attachments/assets/6a384274-1ec4-4b1f-a919-cbfb4e3fc332" />

Post data is stored securely in Appwrite's database.

# Post Listing:

A clear and organized list displays all published blog posts.
Each post showcases the title, author, and a snippet of the content.
Consider implementing pagination or sorting for extensive post management (optional).

<img width="1916" height="1039" alt="Screenshot 2025-10-08 185935" src="https://github.com/user-attachments/assets/bd6f2c76-daaf-4993-94d7-0329757f8614" />

# Update and Delete Post:

Users can update their existing post if the same user that is Logged in and have their own post.

User can also delete their own post.

<img width="1901" height="1026" alt="image" src="https://github.com/user-attachments/assets/21796828-3d35-4ac5-8d45-7beef5fc3353" />

# Tech Stack
Frontend: React.js
Form Handling: React Hook Form
Rich Text Editor: TinyMCE 
State Management: Redux with react-redux
Routing: react-router-dom
Backend: Appwrite (for database, storage, and authentication)

# Deployment & Repository
Live Demo : https://blognew-omega.vercel.app/
Repository : 
