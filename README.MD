<p align="center">
	<a href="https://github.com/lucaskauer/reintegra-server">
		<img src="./logo.png" height="150" alt="Reintegra API">
	</a>
</p>

## Wiki
Please before decided to contribute to this project, take a look at the [Wiki](https://github.com/lucaskauer/reintegra-server/wiki/) to see important guides.

### Installing
First, download the repository or make the git clone in a directory:
```bash
git clone git@github.com:lucaskauer/reintegra-server.git
```

Then to go the folder and install all the dependencies with:
```bash
npm i
```

Maybe `npm` will need some permissions to install all packages, so run with `sudo` or other equivalent command depends on your OS.

### Start up enviroment
Now, you need to create and fill the `env/.env` and `env/docker.env`

The `env/` folder have a `.env.example` file to indicate wich keys **must** be in your `.env` (wich you have to create and fill by yourself) otherwise the application will not startup, this behaviour is caused by the use of [dotenv-safe](https://github.com/rolodato/dotenv-safe/). Each key have an explanation what is his usage to facilitate the filling.

### Build and run
Actually, the project is using nodemon in dev enviroment just for reloading server automatically for us and Babel for transpilation to work with ES6. We are using [babel-node](https://babeljs.io/docs/usage/cli/#babel-node) which works the same as babel-cli but for node, so we start the project in `npm run start` with `nodemon src/app.js --inspect --exec babel-node`

To start the server:
```bash
npm run start
```

### Build and run with Docker

Compose pulls a Mongo image, builds an image for the code, and starts the services.

To start the server:
```bash
docker-compose up
```

Enter http://localhost:3000/api/v1/status in a browser to see the API running.
