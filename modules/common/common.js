/* all the common functions used by movies
 module an webshows module will be defined 
defined here*/


const fs = require('fs') //file system module instance
const path = require('path') //path module instance
const tree = require("directory-tree")
const root = require('../../rootdir.js')
const { Console } = require('console')


var fileobj = { 'path': '', 'mimetype': '' } //object declaration for file props

var abs_path = "";

var createString = (data, int, category) => {

    if (int == 0) {
        if (category == 1) abs_path = 'web_shows/';
        else abs_path = 'movie/';
        int++;
    }
    let htmlString;
    // console.log(data);
    // const string = JSON.stringify(data);
    // const dataObj = JSON.parse(string);
    // console.log(data.children[0].children);
    console.log(abs_path);
    let str;

    htmlString = data.children.map((el) => {
        if (el.hasOwnProperty("extension")) {
            return `<li class="list_el"  id='/${abs_path}${JSON.stringify(el.name).slice(1, -5)}'>${el.name}</a></li>`;
        }
        else {
            abs_path += `${el.name}-`;
            str = `<li>${el.name}
            <ul style="display:none">${createString(el, int, category)}
            </ul></li>`;
            var len = JSON.stringify(el.name).length - 1;

            abs_path = abs_path.slice(0, -len);
            // console.log(abs_path);

            return str;
        }

    }).join('');


    return htmlString;

}

var common = {

    //function to get all the content inside the given directory, returns array of directories inside the given directory
    getContentList: (arg) => {
        return tree(arg);
    },

    //function to get the information of the requested stream file, returns an object of type fileobj
    getFileProp: (dir, name) => {
        var files = fs.readdirSync(dir)
        for (file of files) {
            parts = file.split('.')
            if (parts[0] == name) {
                var ext = parts[1]
                fileobj.path = dir + '/' + file
                if (ext === 'flv') {
                    fileobj.mimetype = 'video/x-flv'
                    break;
                }
                else if (ext === 'mp4') {
                    fileobj.mimetype = 'video/mp4'
                    break;
                }
                else if (ext == 'mov') {
                    fileobj.mimetype = 'video/quicktime'
                    break;
                }
                else if (ext === 'avi') {
                    fileobj.mimetype = 'video/x-msvideo'
                    break;
                }
                else if (ext === 'wmv') {
                    fileobj.mimetype = 'video/x-ms-wmv'
                    break;
                }
                else if (ext === 'mkv') {
                    fileobj.mimetype = 'video/x-matroska'
                    break;
                }
            }
        }
        return fileobj
    },

    // A function which creates a list from the directory tree and inserts it into the template
    replaceTemp: (template, data, category) => {
        let htmlString, output;

        // creates & stores a HTML string of the required list in the variable htmlString
        htmlString = createString(data, 0, category);
        // console.log(htmlString);

        // this string containing the code for list is inserted into the HTML template of the page
        output = template.replace(/{%LIST%}/g, htmlString);

        return output;
    }

}


module.exports = common
