const { Pizza } = require('../models');

const pizzaController = {
    // the functions will go in here as methods
    //get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one pizza by ID
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {
                //if no Pizza is found, send 404
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No Pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //createPizza
    createPizza({ body }, res){
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },
    //update Pizza by ID
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id}, body, { new: true})
            .then(dbPizzaData => {
                if(!dbPizzaData){
                    res.status(404).json({message: 'No Pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete Pizza
    deletePizza({ params }, res){
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if(!dbPizzaData){
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(404).json(err));
    }
};

module.exports = pizzaController;