require("dotenv").config();
const { client } = require("./common");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
app.use(require("morgan")("dev"));
const { getAllCustomers, getAllRestaurants, getAllReservations, createReservation, deleteReservation } = require("./db");

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
  });

const init = async () => {
    await client.connect();
};

app.get("/", (req, res) => {
  res.status(200).json({ message: "This works" });
});

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
  
  app.get("/api/customers", async (req, res, next) => {
    console.log("testing");
    try {
      const response = await getAllCustomers();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/restaurants", async (req, res, next) => {
    try {
      const response = await getAllRestaurants();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/reservations", async (req, res, next) => {
    try {
      const response = await getAllReservations();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/reservations", async (req, res, next) => {
    try {
      const { date, party_count, restaurants_name, customers_name } = req.body;
      const response = await createReservation(date, party_count, restaurants_name, customers_name);
      res.status(201).json(response.rows);
    } catch (error) {
      next(error);
    }
  });
  
  app.delete("/api/customers/:customer_id/reservations/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await deleteReservation(id);
      res.status(204).json(response.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

init();
