require('dotenv').config();
const express = require('express');
const app = express();
const pg = require('pg');
const client = new pg.Client("postgres://heatherdeliso:easyaf@localhost:5432/coursework");
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(require('morgan')('dev'));
const PORT = 3000;
const { getAllCustomers, getAllRestaurants } = require('./db');

// const init = async () => {
    // client.connect();
// };
client.connect();


// app.post("/api/customers", async (req, res, next) => {
//     try {
//       const { name } = req.body;
//       const SQL = `
//             INSERT INTO customers(name) VALUES($1, (SELECT id from customers where name =$2)) RETURNING *
//         `;
//       const response = await client.query(SQL, [name]);
//       res.status(201).send(response.rows);
//     } catch (error) {
//       next(error);
//     }
//   });

//   app.post("/api/restaurants", async (req, res, next) => {
//     try {
//       const { name } = req.body;
//       const SQL = `
//             INSERT INTO restaurants(name) VALUES($1, (SELECT id from restaurants where name =$2)) RETURNING *
//         `;
//       const response = await client.query(SQL, [name]);
//       res.status(201).send(response.rows);
//     } catch (error) {
//       next(error);
//     }
//   });
  
  app.get('/api/customers', async (req, res) => {
    console.log("testing");
    try {
    //   const response = await getAllCustomers();
      const response = await client.query(`
        SELECT * FROM customers;
        `)
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/api/restaurants', async (req, res) => {
    try {
      const response = await getAllRestaurants();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  });

//   app.post("/api/reservations", async (req, res, next) => {
//     try {
//       const { name } = req.body;
//       const SQL = `
//             INSERT INTO reservations(customers_id, restaurants_id, date, party_count) VALUES($1, $2, $3, $4 (SELECT id from customers where name =$2, SELECT id from restaurants where name =$2)) RETURNING *
//         `;
//       const response = await client.query(SQL, [name]);
//       res.status(201).send(response.rows);
//     } catch (error) {
//       next(error);
//     }
//   });
  

//   app.delete("/api/employees/:id", async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const SQL = `
//             DELETE FROM employees WHERE id = $1
//         `;
//       await client.query(SQL, [id]);
//       res.sendStatus(204);
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   });

app.get('/', (req, res) => {
    res.status(200).json({ message: "This works" });
  });

// init();

app.listen(PORT, () => {
    console.log(`I am listening on port number ${PORT}`);
    });
