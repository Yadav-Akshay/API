let { db } = require('../model/mysqlConnection');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function (req, res, next) {
    let data;
    db.query(
        `SELECT
                *
        FROM
            city
        `, function (error, result) {
        data = result;
        console.log(result)
        console.log(error)
        res.send(data);



    }
    )









});

/* count number of rows in db */
router.get('/count', function (req, res, next) {

    try {
        let data;
        db.query(
            `SELECT
               Count(ID)  as count
        FROM
            city
        `, function (error, result) {
            data = result;
            let pageNo = result[0].count / 13;
            console.log(pageNo);
            console.log(result[0].count)
            console.log(error)
            res.send(data)

            
        }
        )
    } catch (error) {
        console.log(error);

    }

    












});


/* get Render */
router.get('/Table', function (req, res, next) {

    db.query(
        `SELECT
                *
        FROM
            city

            ORDER BY ID 

        `, function (error, result) {
        data = result;
        console.log(result)
        console.log(error)
        res.render('tables', {
            users: result
        });


    }
    )









});


/* insert data using post */
router.post('/create', function (req, res, next) {
    try {
        console.log(req.body);
        let Name = req.body.Name
        let CountryCode = req.body.CountryCode
        let District = req.body.District
        let Population = req.body.Population
        let resData = {
            Name, CountryCode, District, Population

        }
        //insert in db



        db.query(
            `
                INSERT INTO city  (Name, CountryCode, District, Population) VALUES ('${Name}', '${CountryCode}', '${District}', '${Population}')
        
                `, function (error, result) {
            console.log(result)
            console.log(error)

            res.send(result);


        }
        )


    } catch (error) {
        console.log(error);
    }

});
/* getting individual data */
router.get('/details/:Name', function (req, res, next) {

    let Name = req.params.Name;

    db.query(
        `SELECT
                *
        FROM
            city

            where 
            Name = '${Name}'
        `, function (error, result) {
        data = result;
        console.log(result)
        console.log(error)
        res.send(result);



    }
    )
});

/* Modify user data using put */
router.put('/Update/', function (req, res, next) {

    try {

        console.log(req.body);
        let ID = req.body.ID

        /* if(1==1){
     
             console.log(abc)
     
             var abc = 2323 ;
     
            
     
         } */


        db.query(
            `Update 
             city
               SET Population = 333333
            where 
            ID = '${ID}'
        `, function (error, result) {
            data = result;
            console.log(result)
            console.log(error)
            res.send(result);



        }
        )

    } catch (error) {
        console.log(error);
    }

});



router.put('/Delete/', function (req, res, next) {

    console.log(req.body);
    var ID = req.body.ID



    db.query(
        `Delete
              from
             city
        
            where 
            ID = '${ID}'
        `, function (error, result) {
        data = result;
        console.log(result)
        console.log(error)
        res.send(result);



    }
    )
});

/* render */
router.get('/createhbs', function (req, res, next) {
    try {
        res.render('Add', { title: 'By User' });



    } catch (error) {
        console.log(error);
    }

});

/* Get pages from DB*/
router.get('/Table/:page', function (req, res, next) {
    let page = req.params.page;
    const limit = 13;
    let offset = ((page - 1) * limit)
    db.query(
        `SELECT
                *
        FROM
            city

            ORDER BY ID 

            limit ${limit} offset ${offset}

        `, function (error, result) {
        data = result;
        console.log(result)
        console.log(error)
        res.render('tables', {
            users: result
        });


    }
    )









});

/*Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
var t = Handlebars.compile($('#t').html());
$('body').append(t());
*/


module.exports = router;
