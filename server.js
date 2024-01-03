const express = require('express');
const appRoute = require('./routes/route')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(appRoute)

app.listen(port, () => {
	console.log(`app run on localhost:${port}`);
});
