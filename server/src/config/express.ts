import { Express } from "express"
import  bodyParser from "body-parser"

module.exports = (app: Express) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    
}