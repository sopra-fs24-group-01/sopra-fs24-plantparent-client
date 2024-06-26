# PlantParent

## Introduction
**PlantParent** is a comprehensive houseplant management system designed to simplify and enhance the way users interact with their plants. Motivated by the challenges plant owners face in maintaining the health of their green companions, our application provides a user-friendly platform for users to create detailed profiles for each of their plants, schedule watering and caring tasks, and coordinate with other caretakers. The application allows users to organize their plants into customizable spaces, making it easier to manage plant care efficiently. Equipped with a notification system to alert users when a plant's care is overdue, **PlantParent** ensures that all plants receive the attention they need to thrive. Our goal is to foster a more engaged and informed community of plant enthusiasts, making plant care a seamless part of their daily lives.

## Features

**PlantParent** comes with a variety of features designed to make plant care easier and more enjoyable:

- **User Management**: Manage user accounts with features such as registration, login, and profile editing.

- **Plant Profiles**: Create detailed profiles for each of your plants, including their name, species, watering schedule, and more. You can also upload images of your plants.

- **Task Scheduling**: Schedule watering and other care tasks for each plant.

- **Spaces**: Organize your plants into customizable spaces based on their location in your home or office.

- **Caretaker Coordination**: Coordinate with other caretakers to ensure that all plants are properly cared for.

## Technologies
**PlantParent** leverages a range of powerful technologies to ensure robust and scalable client-side functionality:

- **JavaScript & React**: React is a front-end JavaScript library that uses components to create user interfaces.
    - **React Router**: React Router allows you to handle routing in your React application, enabling the creation of single-page applications with navigation along different paths.
    - **React Hooks**: With Hooks, you can extract stateful logic from a component so it can be tested independently and reused.
- **Redux**: Redux is a predictable state container for JavaScript applications. In this project, Redux is used for managing application state.
- **Fetch API**: The Fetch API, a built-in browser feature for executing HTTP requests, is utilized in this project to facilitate communication with the backend.
- **Google Cloud Platform (GCP) & App Engine**: The production version of this front-end is hosted on GCP's App Engine.
- **GitHub Actions**: Github Actions allows for continious intergration and deployment (CI/CD) by building, testing and deploying every commit to GCP.

## Prerequisites
You will need Node.js for local development. We recommend installing version **v20.11.0**. You can download it [here](https://nodejs.org/download/release/v20.11.0/).

Or download it directly using these links:

- **MacOS:** [node-v20.11.0.pkg](https://nodejs.org/download/release/v20.11.0/node-v20.11.0.pkg)
- **Windows 32-bit:** [node-v20.11.0-x86.msi](https://nodejs.org/download/release/v20.11.0/node-v20.11.0-x86.msi)
- **Windows 64-bit:** [node-v20.11.0-x64.msi](https://nodejs.org/download/release/v20.11.0/node-v20.11.0-x64.msi)
- **Linux:** [node-v20.11.0.tar.xz](https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz) (use this [installation guide](https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux) if you are new to Linux)

If you have a package manager the following commands can be used as well:

- **Homebrew:** `brew install node@20.11.0`
- **Chocolatey:** `choco install nodejs-lts --version=20.11.0`

Also make sure to have:

- Access to the [GitHub project](https://github.com/sopra-fs24-group-01) and [GitHub repo](https://github.com/sopra-fs24-group-01/sopra-fs24-plantparent-client) for the CI/CD Pipeline.
- Access to the GCP project `sopra-fs24-group-01-client`

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sopra-fs24-group-01/sopra-fs24-plantparent-client.git
    ```

2. Navigate to the project directory:
    ```bash
    cd sopra-fs24-plantparent-client
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up the .env file (necessary for local development client)
    Create a new file in the root directory of the project and name it .env. This file will store your environment variables. Add the following lines to the .env file:

    * To connect to the server deployed on GCP:

    `REACT_APP_BACKEND_BASEURL=https://sopra-fs24-group-01-server.oa.r.appspot.com/`

    * Or to connect to a locally running server (8080 is the default port, you might need to adjust it depending on 
    * your setup):

    `REACT_APP_BACKEND_BASEURL=http://localhost:8080/`

    * And finally, your weather API key (this step is optional, the app also works without an API key, but then no 
    * weather data is displayed):

    `REACT_APP_WEATHER_API_KEY=<WeatherAPIKey>`
        
> **Note:** To generate a free api key, go to the [WeatherAPI website](https://www.weatherapi.com/) and create a free 
> account. Go to your dashboard and generate a new API key if you haven't already. Paste the key in the .env file, and 
> restart the development server.

## Usage
1. To start the development client:
    ```bash
    npm start
    ```

2. Build for production:
    ```bash
    npm run build
    ```

## Contribution
Developers are encouraged to push to feature branches and create pull requests for code reviews. Ensure that all merge conflicts are resolved before requesting a review. 

Please create feature branches from the `develop` branch.

## Illustrations

1. **Login/Signup**
   A new user needs to register to use the application. An existing user logs in. The user is redirected to the home page where he/she finds an overview of all plants and spaces.
   
<img src="./readme-images/login-signup-user-flow.png" title="Login/Signup User Flow" alt="Showcasing the Login/Signup User Flow.">

2. **Plants**
   On the home page, the user can create a new plant and set the name, watering/caring schedule. Once a plant is created, other caretakers can be assigned on the plant profile. Caretakers will be able to see the plant and fulfill watering/caring tasks.
   
<img src="./readme-images/plant-user-flow.png" title="Plant User Flow" alt="Showcasing the plant user flow.">

3. **Tasks**
   A caretaker/owner can tick off a watering/caring task on the home page or specific plant profile. Consequently both the caretakers and owner are displayed a real-time animation. Furthermore, if the plant is in urgent need of care, the owner and caretakers are notified via mail.
   
<img src="./readme-images/task-user-flow.png" title="Task User Flow" alt="Showcasing the task user flow.">

4. **Spaces**
   For a more efficient and structured organisation of plants, a user can create a space where he/she assigns plants. Additionally, the user can add caretakers to a space and the caretaker is assigned to all the plants in that space.
   
<img src="./readme-images/space-user-flow.png" title="Space User Flow" alt="Showcasing the space user flow.">

## Roadmap
Here are some of features we plan to implement in the future to enhance our application:
1. **History of Events**  
   You can find more information in
   the [User Story P7](https://github.com/sopra-fs24-group-01/sopra-fs24-plantparent-server/issues/10)
   * **Description**: Implement a feature to record and display the history of care events for each plant, such as watering or fertilizing. This will help users gain a better understanding of a plant's care history and identify potential areas for improvement in their care routine.
2. **Feedback System**  
   You can find more information in
   the [User Story P8](https://github.com/sopra-fs24-group-01/sopra-fs24-plantparent-server/issues/11)
   * **Description**: Allow users to post feedback directly on a plant's page or within a specific space. This feature will enable caretakers to share tips, provide feedback, and communicate effectively, fostering a collaborative environment for plant care.
3. **Subtasks for Plant Care**
    * **Description**: Enhance the flexibility of scheduling care activities by allowing users to define specific tasks and subtasks, such as fertilizing, pruning, or repotting. This detailed task management will help users tailor care routines to the unique needs of each plant, ensuring optimal health and growth. 

These upcoming features are designed to provide our users with more detailed insights, collaborative tools, and costumized care options, making plant management more interactive and precise.

## Authors and Acknowledgement
### Team Members:

* Nordin Dari - Back-End Development - [NorDar](https://github.com/NorDar)
* Daniel Gergely - Front-End Development - [Danielgergely](https://github.com/Danielgergely)
* Lazaro Nicolas Hofmann - Front-End Development - [geringproduktiv](https://github.com/geringproduktiv)
* Michael Sigg - Back-End Development - [M-Sigg](https://github.com/M-Sigg)

### Acknowledgements:
* Stefan Schuler: Special thanks to our TA for continuous guidance and feedback provided during development.
* Prof. Thomas Fritz and the TA Team: Appreciation for the course materials as well as the provided SoPra templates. 

## License

This project is licensed under the Apache License 2.0
