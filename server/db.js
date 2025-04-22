const { client } = require('./common');
client.connect();

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
  
//   const getReservation = async (id, name, newGenre) => {
//     const SQL = `
//       UPDATE movies_genre 
//       set genre_id = (SELECT id from genres where type = $3)
//       where genre_id = (SELECT id from genres where type = $2)
//       AND movie_id = $1
//       Returning *
//   `;
//     const response = await client.query(SQL, [id, oldGenre, newGenre]);
//     console.log(response)
//     return response.rows;
//   };
  
  module.exports = { getAllCustomers, getAllRestaurants };