import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";


const router = Router();
const BLOG_COLLECTION = db.collection("blog");

//Endpoint for getting list of blogs
router.get('/', async (req, res) => {
    let results = await BLOG_COLLECTION.find({}).toArray();
    res.send(results).status(200);
});

//Endpoint for adding a single blog by id 
router.get('/:id', async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await BLOG_COLLECTION.findOne(query)

    !result ? res.send("Not found!").status(404) : res.send(result).status(200);
});

//Endpoint for adding a single blog
router.post('/', async (req, res) => {
    try {
        let newBlog = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        }

        let result = await BLOG_COLLECTION.insertOne(newBlog)
        res.send(result).status(201)

    } catch (error) {
        console.log(error)
    }

});

//Endpoint for updating a blog by the id
router.patch('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image
            },
        };
        let result = await BLOG_COLLECTION.updateOne(query, updates);
        res.send(result).status(200);
    } catch (error) {
        console.log(error)
    }
});

//Endpoint for deleting a blog
router.delete('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        let result = await BLOG_COLLECTION.deleteOne(query);
        res.send(result).status(200);

    } catch (error) {
        console.log(error)
    }
});

export default router;