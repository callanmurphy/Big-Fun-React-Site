const express = require('express');
const path = require('path');

const gameRoutes = require('./games');

const clipath = path.join(__dirname, '..', 'client', 'build')
const app = express();

/*********************
 * These are the API routes
 */
app.use('/api/games', gameRoutes);

/*********************
 * This will serve the React app to any route that is not in the API above
 */
app.use(express.static(clipath))

app.get('*', (req, res) => {
    // TODO: maybe some route checking
	res.sendFile(path.join(clipath, 'index.html'))
});

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})