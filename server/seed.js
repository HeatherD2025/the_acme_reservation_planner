require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const init = async () => {
    try {
        await client.connect();

    const SQL = `
        DROP TABLE IF EXISTS customers CASCADE;
        DROP TABLE IF EXISTS restaurants CASCADE;
        DROP TABLE IF EXISTS reservations CASCADE;
            CREATE TABLE customers(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(100)
            );
            CREATE TABLE restaurants(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(100)
            );

            CREATE TABLE reservations(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                date DATE NOT NULL,
                party_count INTEGER NOT NULL,
                restaurants_id UUID REFERENCES restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
                customers_id UUID REFERENCES customers(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
                UNIQUE(restaurants_id, customers_id)	
            );
                INSERT INTO customers(name) VALUES ('Stacey');
                INSERT INTO customers(name) VALUES ('Mike');
                INSERT INTO customers(name) VALUES ('Lisa');
                INSERT INTO customers(name) VALUES ('Ben');

                INSERT INTO restaurants(name) VALUES ('Ottava Via');
                INSERT INTO restaurants(name) VALUES ('Ladder 4');
                INSERT INTO restaurants(name) VALUES ('Adelina');
                INSERT INTO restaurants(name) VALUES ('Grey Ghost');

                INSERT INTO reservations(date, party_count, restaurants_id, customers_id) VALUES ('2025-04-15', 4,
                (SELECT id from restaurants where name = 'Ladder 4'),
                (SELECT id from customers where name = 'Mike'));
            `;

    await client.query(SQL);
    console.log("we have seeded our db");
    await client.end();
    } catch (error) {
        console.error(error);
    }
};

init();