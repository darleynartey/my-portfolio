import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";


const router = Router();
const PROJECTS_COLLECTION = db.collection("projects");

//Endpoint for getting list of projects
router.get('/', async (req, res) => {
    let results = await PROJECTS_COLLECTION.find({}).toArray();
    res.send(results).status(200);
});

//Endpoint for adding a single project by id 
router.get('/:id', async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await PROJECTS_COLLECTION.findOne(query)

    !result ? res.send("Not found!").status(404) : res.send(result).status(200);
});

//Endpoint for adding a single project
router.post('/', async (req, res) => {
    try {
        let newProject = {
            title: req.body.title,
            description: req.body.description
        }

        let result = await PROJECTS_COLLECTION.insertOne(newProject)
        res.send(result).status(201)

    } catch (error) {
        console.log(error)
    }

});

//Endpoint for updating a project by the id
router.patch('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                title: req.body.title,
                description: req.body.description,
            },
        };
        let result = await PROJECTS_COLLECTION.updateOne(query, updates);
        res.send(result).status(200);
    } catch (error) {
        console.log(error)
    }
});

//Endpoint for deleting a project
router.delete('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        let result = await PROJECTS_COLLECTION.deleteOne(query);
        res.send(result).status(200);

    } catch (error) {
        console.log(error)
    }
});

export default router;