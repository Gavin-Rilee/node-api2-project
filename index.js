// require your server and launch it here
const server = require('./api/server');

//! setting the port 

const port = 5000;

//! start listening 

server.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
  