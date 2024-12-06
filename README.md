# Trail Tales

## Project Overview

Trail Tales is a web-based application that allows users to track their outdoor activities, such as hiking and climbing, and connect with others in the community. It helps users document their adventures, set goals, and earn awards based on their achievements. The app features profile pages, a tips forum, and an exploration page where users can discover new hikes based on location. It is designed for hikers who want to create memories of their outdoor experiences while building a supportive network.

Unlike other fitness apps, this application emphasizes goal-based achievements and social interaction through journaling, providing users with a meaningful way to reflect on their outdoor experiences.

## Project Features

- **Profile Pages**: Users can create and maintain profiles documenting their hikes and climbs. Profiles show statistics like the number of hikes, miles hiked, and places traveled. Users earn awards based on their achievements.
  
- **Explore Page**: Users can browse through different hikes and outdoor activities based on location.
  
- **Search Feature**: Users can search for other users or specific hiking locations to connect with friends or discover new places to visit.
  
- **Tips Forum**: A community-driven tips forum where users can share survival and outdoor tips.

- **Goals**: Users can set future goals, whether it's reaching a specific destination or hiking a certain number of miles.

- **Map Integration**: Each profile includes an interactive map with pins that track the user's hikes.

## Installation Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/downloads/)
- [MongoDB](https://www.mongodb.com/try/download/community)

---

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/adventure-journal.git
   # Adventure Journal


## Backend Setup (Set up first)

1. **Navigate to the backend directory:**

    ```bash
    cd adventure-journal/backend
    ```

2. **Create a virtual environment:**

    ```bash
    python -m venv env
    ```

3. **Activate the virtual environment:**

   - **On Windows:**

      ```bash
      .\env\Scripts\activate
      ```

   - **On Mac/Linux:**

      ```bash
      source env/bin/activate
      ```

4. **Install backend dependencies:**

    ```bash
    pip install django
    pip install pymongo
    pip install djangorestframework
    pip install django-cors-headers
    ```

5. **Install MongoDB:**

    Follow the MongoDB installation guide to install MongoDB on your machine.

7. **Start the Django development server:**

    ```bash
    python manage.py runserver
    ```

   The backend server will now run at [http://localhost:8000](http://localhost:8000).
---

## Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd adventure-journal/frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the React development server:**

    ```bash
    npm start
    ```

   This will run the frontend application on [http://localhost:3000](http://localhost:3000).
