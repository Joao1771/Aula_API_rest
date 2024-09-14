import app from './app'; // importa o objeto exportado do app.js

const port = 3001;
app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`); // console = vai aparecer no cmd
  console.log(`CTRL + clique em http://localhost:${port}`);
});
