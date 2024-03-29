import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import skills from './routes/skills.routes.js'
import projects from './routes/projects.routes.js'
import achievements from './routes/achievements.routes.js'
import blog from './routes/blog.routes.js'
import experiences from './routes/experiences.routes.js'


const PORT = process.env.PORT || 4000;

const app = express();


//add middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//load routes
app.use("/skills", skills);
app.use("/projects", projects);
app.use("/achievements", achievements);
app.use("/blog", blog);
app.use("/experiences", experiences)


//start the server
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})