// var express = require('express')//instance of express 
// var shows_router = express.Router()//instance of router method
// var web_shows = require('../../modules/web_shows/web_shows.js')//instance of webshows module
// const fs = require('fs') //file system module instance



// //this route sends array of shows back to client
// shows_router.get('/fetch',(req,res)=>{
//     res.send(web_shows.getShowList())
// })

// //this route sends array of seasons back to client
// shows_router.get('/fetch/:name',(req,res)=>{
//     res.send(web_shows.getSeasonList(req.params.name))
// })

// //this route sends array of episodes back to client
// shows_router.get('/fetch/:name/:season',(req,res)=>{
//     res.send(web_shows.getEpisodeList(req.params.name,req.params.season))
// })

// //this route will initiate the stream of the perticular episode
// shows_router.get('/stream/:name',(req,res)=>{

//     //getting the file info from the directory
//     var f = web_shows.getEpisodeInfo(req.param.name)
//     fileSize = fs.statSync(f.path).size

//     //building the response
//     const range = req.headers.range
//     if (range) {
//         const parts = range.replace(/bytes=/, "").split("-")
//         const start = parseInt(parts[0], 10)
//         const end = parts[1]
//             ? parseInt(parts[1], 10)
//             : fileSize - 1

//         if (start >= fileSize) {
//             res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
//             return
//         }

//         const chunksize = (end - start) + 1
//         const file = fs.createReadStream(f.path, { start, end })
//         const head = {
//             'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': chunksize,
//             'Content-Type': f.mimetype,
//         }

//         res.writeHead(206, head)
//         file.pipe(res)
//     } else {
//         const head = {
//             'Content-Length': fileSize,
//             'Content-Type': f.mimetype,
//         }
//         res.writeHead(200, head)
//         fs.createReadStream(f.path).pipe(res)
//     }
// })

// module.exports = shows_router

var express = require('express')//instance of express 
var web_show_router = express.Router()//instance of router method
var web_show = require('../../modules/common/controller.js')//instance of movie module
var common = require('../../modules/common/common.js')// instance of the common.js module
const fs = require('fs') //file system module instance
const { dir } = require('console')

const overview = fs.readFileSync(`${__dirname}/../../public/webshows-overview.html`,
    'utf-8');

//this route sends array of movies back to client
web_show_router.get('/', (req, res) => {

    // 1 for web_shows, 0 for movies
    const dir_tree = web_show.getMoviesList(1);
    let data;

    // console.log(dir_tree);
    // res.send(movies.getMoviesList())

    // function to create list and insert it into the parent HTML
    // 1 for webshows, 0 for movies
    data = common.replaceTemp(overview, dir_tree, 1);

    res.end(data);
})

//this route sends array of movies back to client
web_show_router.get('/:name', (req, res) => {

    let param_name, name;

    //getting the file info from the directory
    // console.log(req.params);
    param_name = req.params.name;
    name = param_name.replace(/-/g, "/");

    // console.log(name);

    // 1 for webshows, 0 for movies
    const f = web_show.getMovieInfo(name, 1)
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

module.exports = web_show_router