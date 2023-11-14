// Importing node application that can help control postgres
// Importing Pool function that generates a pool of connections

const { Pool } = require("pg");

// Localhost URL

const {
    DB_URL = "postgresql://localhost/gpigsdb?user=postgres",
} = process.env;

// Pass the connection string to the pool generator 

const pool = new Pool ({
    connectionString: DB_URL,
});

module.exports = {
    query:(text, params, callback) =>{
        const start = Date.now();
        // Text = SQL string, params = any data params
        return pool.query(text, params, (err, res)=>{
            const duration = Date.now() - start;
            console.log('Executed query', {text, duration, rows: res && res.rowCount})
            callback(err, res)
        })
    },
    getClient:(callback) =>{
        pool.connect((err, client, done)=>{
            const query = client.query
            client.query = (...args) =>{
                client.lastQuery = args
                return query.apply(client, args)
            }
                  // set a timeout of 5 seconds, after which we will log this client's last query
        const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!')
            console.error(`The last executed query on this client was: ${client.lastQuery}`)
            }, 5000)
        const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)
        // clear our timeout
        clearTimeout(timeout)
        // set the query method back to its old un-monkey-patched version
        client.query = query
        }
        callback(err, client, release)
        })
    }
}

