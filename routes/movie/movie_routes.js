var express = require('express')//instance of express 
var movie_router = express.Router()//instance of router method
var movies = require('../../modules/common/controller.js')//instance of movie module
var common = require('../../modules/common/common.js')// instance of the common.js module
const fs = require('fs') //file system module instance
const { dir } = require('console')

const overview = fs.readFileSync(`${__dirname}/../../public/movie-overview.html`,
    'utf-8');

//this route sends array of movies back to client
movie_router.get('/', (req, res) => {

    // 1 for web_shows, 0 for movies
    const dir_tree = movies.getMoviesList(0);
    let data;

    // console.log(dir_tree);
    // res.send(movies.getMoviesList())

    // function to create list and insert it into the parent HTML
    // 1 for webshows, 0 for movies
    data = common.replaceTemp(overview, dir_tree, 0);

    res.end(data);
})

//this route sends array of movies back to client
movie_router.get('/:name', (req, res) => {

    let param_name, name;

    //getting the file info from the directory
    // console.log(req.params);
    param_name = req.params.name;
    name = param_name.replace(/-/g, "/");

    // console.log(name);

    // 1 for webshows, 0 for movies
    const f = movies.getMovieInfo(name, 0)
    fileSize = fs.statSync(f.path).size

    //building the response
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return
        }

        const chunksize = (end - start) + 1
        const file = fs.createReadStream(f.path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': f.mimetype,
        }

        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': f.mimetype,
        }
        res.writeHead(200, head)
        fs.createReadStream(f.path).pipe(res)
    }
})

module.exports = movie_router