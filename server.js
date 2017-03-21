const express = require('express');
const app = express();
const port = process.env.PORT || 8100;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

app.use('/data', express.static('data/'));
app.use('/', express.static('build/'));
app.use('/*', express.static('build/index.html'));