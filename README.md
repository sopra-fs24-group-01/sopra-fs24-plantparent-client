# PlantParent

## Introduction
**PlantParent** is a comprehensive houseplant management system designed to simplify and enhance the way users interact with their plants. Motivated by the challenges plant owners face in maintaining the health of their green companions, our application provides a user-friendly platform for users to create detailed profiles for each of their plants, schedule watering and caring tasks, and coordinate with other caretakers. The application allows users to organize their plants into customizable spaces, making it easier to manage plant care efficiently. Equipped with a notification system to alert users when a plant's care is overdue, **PlantParent** ensures that all plants receive the attention they need to thrive. Our goal is to foster a more engaged and informed community of plant enthusiasts, making plant care a seamless part of their daily lives.

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

2. Navigate to the project directory:
    ```bash
    cd sopra-fs24-plantparent-client

3. Install dependencies:
    ```bash
    npm install

## Usage
1. To start the development server:
    ```bash
    npm start

2. Build for production:
    ```bash
    npm run build

## Contribution
Developers are encouraged to push to feature branches and create pull requests for code reviews. Ensure that all merge conflicts are resolved before requesting a review. 

Please create feature branches from the `develop` branch.

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