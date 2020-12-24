const { Client } = require("pg")
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

import { Evidence } from "../Shared Model/Evidence";
import { Objective } from "../Shared Model/Objective";

// ----------------------------------------------------------------------------
// CONFIG

const PORT = 3001;
const app = express()

// receive json
app.use(express.json())

// cors
const CORS_WHITELIST = [
    'https://www.bermudalocket.com',
    'https://bermudalocket.com',
    'bermudalocket.com',
    'www.bermudalocket.com',
    'http://localhost:3000'
]
app.use(cors((req, callback) => {
    let corsOptions;
    if (CORS_WHITELIST.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}))

// Set up connection to database.
const client = new Client();
client.connect();

// ----------------------------------------------------------------------------
// ROUTES

app.post("/api/game/create", async (req, res) => {
    const now = Date.now();
    const uuid = uuidv4();
    try {
        await client.query("INSERT INTO games (uuid, ghost_name) VALUES($1, '')", [uuid]);
        await res.json({uuid: uuid})
    } catch (err) {
        console.log(err.stack)
        res.send("error")
    }
    const later = Date.now()
    console.debug(`STAT|1|${uuid}|${later - now}ms`)
})

app.get("/api/game/:uuid", async (req, res) => {
    const now = Date.now();
    const { uuid } = req.params;
    try {
        const {rows} = await client.query("SELECT * FROM games WHERE uuid=$1", [uuid]);
        if (rows.length === 0) {
            res.send("NAW");
        } else {
            res.send(rows[0]);
        }
    } catch (err) {
        console.log(err.stack);
        res.send(err.stack);
    }
    const later = Date.now();
    console.debug(`STAT|2|${uuid}|${later - now}ms`)
})

const updateObjective = (input: string) => {
    switch (input) {

    }
}

app.post("/api/game/update", async (req, res) => {
    const now = Date.now()
    let uuid = req.body.uuid
    let action = req.body.action
    try {
        if (action === "name") {
            let name = req.body.name;
            await client.query("UPDATE games SET ghost_name=$1 WHERE uuid=$2", [name, uuid])
        }
        if (action === "aloneghost") {
            let aloneGhost = req.body.aloneghost;
            await client.query("UPDATE games SET alone_ghost=$1 WHERE uuid=$2", [req.body.aloneghost, uuid])
        }
        if (action === "objective") {
            let objective = req.body.objective;
            let state = req.body.state;
            await client.query("UPDATE games SET " + objective + "=$1 WHERE uuid=$2", [state, uuid]) // TODO security
        } else if (action === "evidence") {
            let evidence = req.body.evidence;
            switch (evidence) {
                case "fingerprints":
                case "emf5":
                case "freezing":
                case "orbs":
                case "ghost_writing":
                case "spirit_box":
                    break;

                default: res.send("error"); return;
            }
            let state = req.body.state;
            await client.query("UPDATE games SET " + evidence + "=$1 WHERE uuid=$2", [state, uuid]) // TODO security
            res.send("OK")
        }
    } catch(er) {
        console.log("error: " + er)
        res.send("error")
    }
    const later = Date.now();
    console.debug(`STAT|3|${uuid}|${later-now}ms`)
})

app.listen(PORT, function() {
    console.log('Example app listening on port ' + PORT + '!');
});
