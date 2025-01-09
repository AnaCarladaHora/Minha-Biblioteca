const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username e password são obrigatórios');
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
       if (err) {
           return res.status(500).send('Erro ao verificar usuário!');
       }
       if(row) {
            return res.status(400).send('Usuário já cadastrado!');
        }
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
            if (err) {
               return res.status(500).send('Erro ao cadastrar usuário!');
            }
          console.log('Usuário Cadastrado', username);
            res.status(200).send('Usuário criado com sucesso!');
        });
    })
  
});

app.listen(port, () => {
  console.log(`Backend rodando na porta http://localhost:${port}`);
});