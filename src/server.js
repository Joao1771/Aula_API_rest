import app from './app'; // importa o objeto exportado do app.js

const port = process.env.APP_PORT;
app.listen(port);
