const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Configure session middleware
app.use(session({
  secret: 'mysecretkey', // Cambia esto por una clave secreta más segura en producción
  resave: false,
  saveUninitialized: false
}));

// Configure SQLite database
const db = new sqlite3.Database('web');

// Create table for contact form data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      message TEXT,
      createdAt TEXT,
      updatedAt TEXT,
      status INTEGER
    )
  `);
});

// Create table for user data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      username TEXT,
      password TEXT
    )
  `);
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
        // Consultar todos los usuarios en la tabla 'users'
        db.all('SELECT * FROM users', (err, users) => {
          if (err) {
            console.error('Error al obtener los usuarios', err);
            res.sendStatus(500);
          } else {
            // Devolver los datos como JSON y pasarlos al render
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
          // Consultar todos los usuarios en la tabla 'contacts'
          db.all('SELECT * FROM contacts', (err, contacts) => {
            if (err) {
              console.error('Error al obtener los contactos', err);
              res.sendStatus(500);
            } else {
              // Devolver los datos como JSON y pasarlos al render
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
  
  // Check if the username and password match a user in the database
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error('Error fetching user from database', err);
      res.sendStatus(500);
    } else if (row) {
      // Usuario encontrado, guardar el estado de inicio de sesión en la sesión
      req.session.isLoggedIn = true;
      req.session.username = username;
      
      // Redirigir a la página de perfil de usuario
      res.redirect('/users-profile.html');
    } else {
      // User not found or incorrect credentials, redirect to the login page with an error message
      res.redirect('/pages-login.html?error=1');
    }
  });
});

// Register route
app.post('/register', (req, res) => {
  const { name, email, username, password } = req.body;

  // Check if the username already exists in the database
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('Error fetching user from database', err);
      res.sendStatus(500);
    } else if (row) {
      // User with the same username already exists, redirect to the registration page with an error message
      res.redirect('/pages-register.html?error=1');
    } else {
      // Insert the new user into the database
      db.run('INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)', [name, email, username, password], function(err) {
        if (err) {
          console.error('Error inserting user into database', err);
          res.sendStatus(500);
        } else {
          // New user successfully registered, redirect to the login page
          res.redirect('/pages-login.html');
        }
      });
    }
  });
});


// Contact form route
app.post('/api/contact', (req, res) => {
  const { name, email,subject, message } = req.body;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const status = 1;

  // Insert form data into SQLite database
  db.run(
    'INSERT INTO contacts (name, email, message, createdAt, updatedAt, status) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, message, createdAt, updatedAt, status],
    function(err) {
      if (err) {
        console.error('Error inserting data into database', err);
        res.sendStatus(500);
      } else {
        // Retrieve the inserted row to get the auto-incremented ID
        const contactId = this.lastID;
        // Fetch the inserted contact from the database
        db.get('SELECT * FROM contacts WHERE id = ?', [contactId], (err, row) => {
          if (err) {
            console.error('Error fetching contact from database', err);
            res.sendStatus(500);
          } else {
            // Send the inserted contact as JSON response
            res.sendStatus(200);
          }
        });
      }
    }
  );
});

// Get all contacts route
app.get('/api/contacts', (req, res) => {
  // Fetch all contacts from the database
  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      console.error('Error fetching contacts from database', err);
      res.sendStatus(500);
    } else {
      // Send the contacts as JSON response
      res.json(rows);
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
