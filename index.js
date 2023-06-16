const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const { Pool } = require('pg');
const url = require('url');

const app = express();
const port = 3000;

const connectionString = 'postgres://grisisback:Vl380Bp8s9cDuJiVPfCjktVtufKcRUd1@dpg-ci5tnf6nqql3q3f13al0-a.ohio-postgres.render.com/grisdb';
const params = url.parse(connectionString);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
};


// Configure session middleware
app.use(session({
  secret: 'mysecretkey', // Cambia esto por una clave secreta más segura en producción
  resave: false,
  saveUninitialized: false
}));

// Configure SQLite database
//const db = new sqlite3.Database('web');
const pool = new Pool(config);

// Create table for contact form data
pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      message TEXT,
      createdAt TEXT,
      updatedAt TEXT,
      status INTEGER
    )
  `, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err);

    } else {
      const users = result.rows; // Obtén los resultados de la consulta

      // Hacer algo con los datos (por ejemplo, enviarlos como respuesta JSON)
     
    }
});

// Create table for user data
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      username TEXT,
      password TEXT
    )
  `, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err);
   
    } else {
      const users = result.rows; // Obtén los resultados de la consulta

      // Hacer algo con los datos (por ejemplo, enviarlos como respuesta JSON)

    }
});

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); // Add support for HTML files

// Set the views folder
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  // Verificar si el usuario ha iniciado sesión
  if (req.session.isLoggedIn) {
    // El usuario ha iniciado sesión, puedes acceder a req.session.username para obtener el nombre de usuario
    const username = req.session.username;
    
    // Renderizar la página de perfil del usuario y pasar el nombre de usuario como variable
    res.render('index', { username });
  } else {
    // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
    res.redirect('/pages-login.html');
  }

 
});

app.get('/charts-apexcharts.html', (req, res) => {
  res.render('charts-apexcharts.html');
});

app.get('/charts-chartjs.html', (req, res) => {
  res.render('charts-chartjs.html');
});

app.get('/charts-echarts.html', (req, res) => {
  res.render('charts-echarts.html');
});

app.get('/components-accordion.html', (req, res) => {
  res.render('components-accordion.html');
});

app.get('/components-alerts.html', (req, res) => {
  res.render('components-alerts.html');
});

app.get('/components-badges.html', (req, res) => {
  res.render('components-badges.html');
});

app.get('/components-breadcrumbs.html', (req, res) => {
  res.render('components-breadcrumbs.html');
});

app.get('/components-buttons.html', (req, res) => {
  res.render('components-buttons.html');
});

app.get('/components-cards.html', (req, res) => {
  res.render('components-cards.html');
});

app.get('/components-carousel.html', (req, res) => {
  res.render('components-carousel.html');
});

app.get('/components-list-group.html', (req, res) => {
  res.render('components-list-group.html');
});

app.get('/components-modal.html', (req, res) => {
  res.render('components-modal.html');
});

app.get('/components-pagination.html', (req, res) => {
  res.render('components-pagination.html');
});

app.get('/components-progress.html', (req, res) => {
  res.render('components-progress.html');
});

app.get('/components-spinners.html', (req, res) => {
  res.render('components-spinners.html');
});

app.get('/components-tabs.html', (req, res) => {
  res.render('components-tabs.html');
});

app.get('/components-tooltips.html', (req, res) => {
  res.render('components-tooltips.html');
});

app.get('/forms-editors.html', (req, res) => {
  res.render('forms-editors.html');
});

app.get('/forms-elements.html', (req, res) => {
  res.render('forms-elements.html');
});

app.get('/forms-layouts.html', (req, res) => {
  res.render('forms-layouts.html');
});

app.get('/forms-validation.html', (req, res) => {
  res.render('forms-validation.html');
});

app.get('/icons-bootstrap.html', (req, res) => {
  res.render('icons-bootstrap.html');
});

app.get('/icons-boxicons.html', (req, res) => {
  res.render('icons-boxicons.html');
});

app.get('/icons-remix.html', (req, res) => {
  res.render('icons-remix.html');
});

app.get('/pages-blank.html', (req, res) => {
  res.render('pages-blank.html');
});

app.get('/pages-contact.html', (req, res) => {
  res.render('pages-contact.html');
});

app.get('/pages-error-404.html', (req, res) => {
  res.render('pages-error-404.html');
});

app.get('/pages-faq.html', (req, res) => {
  res.render('pages-faq.html');
});

app.get('/pages-login.html', (req, res) => {
  res.render('pages-login.html');
});

app.get('/pages-register.html', (req, res) => {
  res.render('pages-register.html');
});

app.get('/tables-data.html', (req, res) => {
  // Verificar si el usuario ha iniciado sesión
  if (req.session.isLoggedIn) {
    // El usuario ha iniciado sesión, puedes acceder a req.session.username para obtener el nombre de usuario
    const username = req.session.username;
    
    // Ejecutar la consulta SELECT en PostgreSQL
    pool.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.error('Error al obtener los usuarios', err);
        res.sendStatus(500);
      } else {
        const users = result.rows; // Obtén los resultados de la consulta

        // Renderizar la página 'tables-data.html' y pasar los datos de usuario como variable
        res.render('tables-data.html', { username, users });
      }
    });
  } else {
    // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
    res.redirect('/pages-login.html');
  }
});


app.get('/tables-general.html', (req, res) => {
  // Verificar si el usuario ha iniciado sesión
  if (req.session.isLoggedIn) {
    // El usuario ha iniciado sesión, puedes acceder a req.session.username para obtener el nombre de usuario
    const username = req.session.username;
    
    // Ejecutar la consulta SELECT en PostgreSQL
    pool.query('SELECT * FROM contacts', (err, result) => {
      if (err) {
        console.error('Error al obtener los contactos', err);
        res.sendStatus(500);
      } else {
        const contacts = result.rows; // Obtén los resultados de la consulta

        // Renderizar la página 'tables-general.html' y pasar los datos de usuario como variable
        res.render('tables-general.html', { username, contacts });
      }
    });
  } else {
    // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
    res.redirect('/pages-login.html');
  }
});

  

app.get('/users-profile.html', (req, res) => {
  // Verificar si el usuario ha iniciado sesión
  if (req.session.isLoggedIn) {
    // El usuario ha iniciado sesión, puedes acceder a req.session.username para obtener el nombre de usuario
    const username = req.session.username;
    
    // Renderizar la página de perfil del usuario y pasar el nombre de usuario como variable
    res.render('users-profile.html', { username });
  } else {
    // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
    res.redirect('/pages-login.html');
  }
});
// ...
// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar si el nombre de usuario y la contraseña coinciden con un usuario en la base de datos
  pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (err, result) => {
    if (err) {
      console.error('Error al obtener el usuario de la base de datos', err);
      res.sendStatus(500);
    } else if (result.rows.length > 0) {
      // Usuario encontrado, guardar el estado de inicio de sesión en la sesión
      req.session.isLoggedIn = true;
      req.session.username = username;

      // Redirigir a la página de perfil de usuario
      res.redirect('/users-profile.html');
    } else {
      // Usuario no encontrado o credenciales incorrectas, redirigir a la página de inicio de sesión con un mensaje de error
      res.redirect('/pages-login.html?error=1');
    }
  });
});

// Ruta de registro
app.post('/register', (req, res) => {
  const { name, email, username, password } = req.body;

  // Verificar si el nombre de usuario ya existe en la base de datos
  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
      console.error('Error al obtener el usuario de la base de datos', err);
      res.sendStatus(500);
    } else if (result.rows.length > 0) {
      // Usuario con el mismo nombre de usuario ya existe, redirigir a la página de registro con un mensaje de error
      res.redirect('/pages-register.html?error=1');
    } else {
      // Insertar el nuevo usuario en la base de datos
      pool.query('INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4)', [name, email, username, password], (err) => {
        if (err) {
          console.error('Error al insertar el usuario en la base de datos', err);
          res.sendStatus(500);
        } else {
          // Nuevo usuario registrado con éxito, redirigir a la página de inicio de sesión
          res.redirect('/pages-login.html');
        }
      });
    }
  });
});

// Ruta del formulario de contacto
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const status = 1;

  // Insertar los datos del formulario en la base de datos PostgreSQL
  pool.query(
    'INSERT INTO contacts (name, email, subject, message, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [name, email, subject, message, createdAt, updatedAt, status],
    (err) => {
      if (err) {
        console.error('Error al insertar los datos en la base de datos', err);
        res.sendStatus(500);
      } else {
        // Recuperar la fila insertada para obtener el ID autoincremental
        pool.query('SELECT * FROM contacts ORDER BY id DESC LIMIT 1', (err, result) => {
          if (err) {
            console.error('Error al obtener el contacto de la base de datos', err);
            res.sendStatus(500);
          } else {
            // Enviar el contacto insertado como respuesta JSON
            res.json(result.rows[0]);
          }
        });
      }
    }
  );
});

// Ruta para obtener todos los contactos
app.get('/api/contacts', (req, res) => {
  // Obtener todos los contactos de la base de datos PostgreSQL
  pool.query('SELECT * FROM contacts', (err, result) => {
    if (err) {
      console.error('Error al obtener los contactos de la base de datos', err);
      res.sendStatus(500);
    } else {
      // Enviar los contactos como respuesta JSON
      res.json(result.rows);
    }
  });
});


// Handle not found routes
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
