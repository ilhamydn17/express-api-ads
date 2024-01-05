const express = require('express');
const appRoute = require('./routes/route')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static('./assets/images'))
app.use(bodyParser.json())
app.use(appRoute)

app.use((req, res, next) => {
	res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
	console.log(`app run on localhost:${port}`);
});
