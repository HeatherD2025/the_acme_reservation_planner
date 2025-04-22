const { client } = require('./common');
// client.connect();

const getAllCustomers = async () => {
    const SQL = `
      SELECT * FROM customers
  `;
    const response = await client.query(SQL);
    return response.rows;
  };

  const getAllRestaurants = async () => {
    const SQL = `
      SELECT * FROM restaurants
  `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  const getAllReservations = async () => {
    const SQL = `
      SELECT * FROM reservations 
  `;
    const response = await client.query(SQL);
    return response.rows;
  };

  const createReservation = async (date, party_count, restaurants_name, customers_name) => {
    const SQL = `
      INSERT INTO reservations(date, party_count, restaurants_id, customers_id) VALUES($1, $2, (SELECT id from restaurants where name = $3),
                (SELECT id from customers where name = $4)) RETURNING *
    `
    const response = await client.query(SQL, [date, party_count, restaurants_name, customers_name]);
    return response.rows;
  };

  const deleteReservation = async (id) => {
    const SQL = `
      DELETE FROM reservations WHERE id = $1
    `;
    const response = await client.query(SQL, [id]);
    return response;
  };

  
  module.exports = { getAllCustomers, getAllRestaurants, getAllReservations, createReservation, deleteReservation };