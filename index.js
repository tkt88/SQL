require("dotenv").config();

// Importing the server function, which includes the express constructor to create the server 

const server = require('./server');

// Destructuring process.env to set the default port
const {
    PORT=3333,
    NODE_ENV= 'development'
    } = process.env;

// Switching on the server
// Needs a port and callback function
    server.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
    });


process.on('uncaughtException', err => {
    console.log(`Uncaught Exception: ${err.message}`)
    process.exit(1)
    })

process.on('unhandledRejection', (reason, promise) => {
// console.log('reasonObj', reason);
    console.log('Unhandled rejection at ', promise, `reason: ${reason.message}`)
    process.exit(1)
    })

process.on('SIGINT', _ => {
    server.close(() => {
    process.exit(0)
    })

// If server hasn't finished in 1000ms, shut down process
setTimeout(() => {
    process.exit(0)
    }, 1000).unref() // Prevents the timeout from registering on event loop
})
