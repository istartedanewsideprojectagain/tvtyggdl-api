require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const express = require('express')

const AxiosService = require('./services/Ygg.rest.service');
const YggService = require('./services/Ygg.api.service');
AxiosService.init();

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({ });
    }
    return next();
});


const port = process.env.PORT || 3002

const mongoose = require('mongoose');

require('./models/episode.model');
require('./models/torrent.model');

const EpisodeModel = mongoose.model('Episode');
const TorrentModel = mongoose.model('Torrent');

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}+/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
}

mongoose.connection.on('connected', () => {
    console.log('Connection Established')
})
mongoose.connection.on('error', (error) => {
    console.log('ERROR: ' + error)
})

app.get('/episodes', (req, res) => {
    EpisodeModel.find(req.query).exec((err,episodes) =>{
        if(err) return res.status(500).json({message: err});
        return res.json(episodes);
    });
})

app.get('/torrents', (req, res) => {
    TorrentModel.find(req.query).exec((err,torrents) =>{
        if(err) return res.status(500).json({message: err});
        return res.json(torrents);
    });
})

app.get('/download', async (req, res) => {
   const torrentId = req.query.id;
    const { data } = await YggService.downloadTorrent(torrentId);
    const file = Buffer.from(data,'base64');
    
    res.writeHead(200, {
        "Content-Disposition": "attachment;filename=" + `${torrentId}.torrent`,
        'Content-Type':'application/x-bittorrent',
    });
    res.end(file);

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
