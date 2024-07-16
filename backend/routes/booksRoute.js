import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// create and save a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, authorm publishYear',
            });
        }

        // new book info 
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        // create book
        const book = await Book.create(newBook);

        // success message
        return res.status(201).send(book);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
});

// get all books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length, // get count of books in the array
            data: books
        }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// get one book from database by id
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// update a book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, authorm publishYear',
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book updated successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);


        // checker
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book deleted successfully" });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;