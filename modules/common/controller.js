//all the functions related to movies will be defined here

var common = require('../common/common.js')// instance of the common.js module
var root = require('../../rootdir.js')//to get the root path of the project
let category;

var movie = {

        //function to return a list of movies present in the repository
        getMoviesList: category_int => {
                if (category_int == 0) category = 'movies';
                else category = 'web_shows';

                return common.getContentList(root.rootdir + `/repo/${category}/`)
        },

        //function to return the info of the selected movie
        getMovieInfo: (name, category_int) => {

                if (category_int == 0) category = 'movies';
                else category = 'web_shows';

                let path, index, path1 = '', path2 = name;
                path = JSON.stringify(name);

                index = path.lastIndexOf('/');


                if (index > 0) {
                        path1 = path.slice(1, index);
                        path2 = path.slice(index + 1, -1);
                }

                // console.log(path1);
                // console.log(path2);
                // console.log(index);

                return common.getFileProp(root.rootdir + `/repo/${category}/${path1}`, path2);
        }
}
module.exports = movie