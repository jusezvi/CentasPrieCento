const express = require('express');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const app = express();


app.use(express.json());
const cors = require('cors');
app.use(cors());
mongoose.connect('mongodb+srv://admin:admin@centaspriecentocluster.dkfsd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
 useNewUrlParser: true,
});

app.get('/', async (par, res) => {
    console.log('test')
   })

app.listen(3001, () => {
 console.log('Server started. Port: 3001');
});