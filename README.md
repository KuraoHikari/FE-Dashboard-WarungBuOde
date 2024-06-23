# Warung Management App

##

This project is a Progressive Web App (PWA) designed to help manage small stores efficiently. It's built using Node.js, React, and various modern libraries and frameworks to deliver a robust and user-friendly experience.

## Installation

To get this project up and running on your local environment, follow these steps:

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js (v18 or higher)**: The project is built with Node.js. You must have Node.js version 18 or higher installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- **npm (Node Package Manager)**: npm is used to install dependencies. It comes with Node.js, so if you have Node.js installed, you should have npm as well.
- **Git**: While not strictly necessary, the project recommends using Git for version control. If you plan to clone the repository, make sure Git is installed on your system. You can download it from [Git's official website](https://git-scm.com/).
- **Basic knowledge of terminal or command line usage**: Since the installation and running of the project require using the terminal or command line, basic knowledge in this area will be beneficial.

Once you have these prerequisites, you can proceed with the installation instructions below.

### Clone the repository

```bash
git clone https://github.com/KuraoHikari/FE-Dashboard-WarungBuOde.git
cd FE-Dashboard-WarungBuOde
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Set up environment variables:

Create a `.env` file in the root directory and fill it with necessary environment variables:

```
VITE_APP_BASE_URL=http://localhost:3000
```

### Run the application

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server, and you should be able to access the app on `http://localhost:5173`.

## Deployment

The project has been deployed and can be accessed at the following URL:

- **[FE-warung-bu-ode](https://fe-warung-bu-ode.netlify.app/auth)**.

## Features

- Inventory management: Keep track of your stock and supplies.
- Sales tracking: Monitor your daily, weekly, and monthly sales.
- Responsive design: Accessible on various devices, providing a seamless experience on desktops, tablets, and smartphones.

## Dependencies

This project uses several key technologies and libraries:

- **[Node.js](https://nodejs.org/en/)**: JavaScript runtime.
- **[Vite](https://vitejs.dev/)**: Front-end build tool.
- **[React](https://reactjs.org/)**: Library for building user interfaces.
- **[Shadcn UI](https://shadcn.github.io/)**: UI framework.
- **[KyJS](https://github.com/sindresorhus/ky)**: HTTP client.
- **[React Leaflet](https://react-leaflet.js.org/)**: For maps integration.
- **[TanStack React Query](https://tanstack.com/query/v4)**: For server state management.
- **[React Camera Pro](https://github.com/AdrianAleixandre/react-camera-pro)**: Camera functionality.
- **[Zod](https://github.com/colinhacks/zod)**: Data validation.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[React Hook Form](https://react-hook-form.com/)**: Forms management.
- **[Vite PWA](https://vite-plugin-pwa.netlify.app/)**: Tools to build PWAs with Vite.

## Acknowledgements

Big thanks to everyone who has contributed to the open-source projects used in this application. Special thanks to:

- The React community for continuous support and innovative solutions.
- Contributors of Vite for their blazing fast build tool.

## Contributing

Contributions to the Warung Management App are welcome! If you have suggestions for improvements or bug fixes, please feel free to:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/AmazingFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some AmazingFeature').
5. Push to the branch (git push origin feature/AmazingFeature).
6. Open a pull request.

## Authors

- **Kurao Hikari** - _Initial work_ - [KuraoHikari](https://github.com/KuraoHikari)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
