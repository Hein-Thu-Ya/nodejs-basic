const express = require('express')
const Stock = require('../models/Stock')

const router = express.Router()

// get all stock with pagination and search
router.get('/', async(req, res) => {
    try {
        const page = req.query.page;
        const perpage = req.query.perpage;
        const search = req.query.search;
        
        const offset = (page - 1) * perpage
        const filter = {};

        if (search) {
            filter['$text'] = { $search: search }
        }

        const stocks = await Stock.find(filter).sort({_id:-1}).limit(perpage).skip(offset);
        const total = await Stock.countDocuments(filter)

        res.status(200).json({
            code: 200,
            message: 'Success',
            data: stocks,
            total: total
        })
    } catch (error) {
        next(error)
    }
})

const getById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findById(id);
        if (!stock) {
            res.status(404).json({
                code: 404,
                message: 'Stock not found',
            })
        }
        req.stock = stock
        next();
    } catch (error) {
        next(error)
    }
}

// get stock by id
router.get('/:id', getById, async(req, res) => {
    res.status(200).json({
        code: 200,
        message: 'Success',
        data: req.stock
    })
})

// update stock
router.put('/:id', getById, async(req, res) => {
    try {
        const stock = req.stock;
        stock.code = req.body.code;
        stock.name = req.body.name;
        stock.price = req.body.price;
        await stock.save();

        res.status(200).json({
            code: 200,
            message: 'Stock updated successfully',
            data: stock
        })
    } catch (error) {
        next(error)
    }
})

// delete stock
router.delete('/:id', getById, async(req, res) => {
    try {
        await req.stock.deleteOne();
        res.status(200).json({
            code: 200,
            message: 'Stock deleted successfully',
        })
    } catch (error) {
        next(error)
    }
})

// create stock
router.post('/', async(req, res, next) => {
    try {
        const stock = new Stock(req.body);
        await stock.save();
        res.status(201).json({
            code: 201,
            message: 'Stock created successfully',
            data: stock
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router