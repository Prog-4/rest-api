"use strict";

module.exports.register = (app, database) => {

    app.get('/', async (req, res) => {
        res.status(200).send("You did it! I am now running:) ").end();
    });

    app.get('/api/items', async (req, res) => {
        console.log("=================");
        let query;
        query = database.query(
            'SELECT * FROM items'
        );
        console.log(query);
        const emps = await query;

        res.status(200).send(JSON.stringify(emps)).end();
    });


    app.get('/api/items/id=:id', async (req, res) => {
        let _id = req.params.id;
        const query = database.query(
            'select * from items where id = ?',
            [_id]
        );
        const emps = await query;
        res.status(200).send(JSON.stringify(emps)).end();
    });

    app.get('/api/items/name=:name', async (req, res) => {
        let _name = req.params.name;
        const query = database.query(
            'select * from items where name = ?',
            [_name]
        );
        const emps = await query;
        res.status(200).send(JSON.stringify(emps)).end();
    });


    app.post('/api/items', async (req, res) => {
        let _id = req.body.id;
        let _name = req.body.name;
        let _quantity = req.body.quantity;
        let _price = req.body.price;
        let _supplier_id = req.body.supplier_id;
        let _status = "";

        if ((typeof _id === 'undefined') || (typeof _name === 'undefined') || (typeof _quantity === 'undefined') || (typeof _price === 'undefined') || (typeof _supplier_id === 'undefined')) {
            _status = "Unsuccess";

        } else {
            const query = database.query(
                'insert into items(id, name, quantity, price, supplier_id) values (?, ?, ?, ?, ?)',
               [_id, _name, _quantity, _price, _supplier_id]
            );
            const emps = await query;
            _status = "Success";

        }

        let messsage = '{"status":"' + _status + '", "data":{"_id":"' + _id + '","_name":"' + _name + '","_quantity":"' + _quantity + '","_price":"' + _price + '", "_supplier_id":"' + _supplier_id + '"}}';
        const obj_messsage = JSON.parse(messsage);
        res.status(200).send((obj_messsage)).end();

    });
};