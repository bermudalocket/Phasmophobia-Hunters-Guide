const { Client } = require("pg")
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const SHA256 = require("crypto-js/sha256");

// ----------------------------------------------------------------------------
// CONFIG

const PORT = 3001

const app = express()

app.set("trust proxy", true)

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

app.post("/api/game/create", async (_, res) => {
    const now = Date.now();
    const uuid = uuidv4();
    try {
        await client.query("INSERT INTO games (uuid, ghost_name) VALUES($1, '')", [uuid]);
        res.json({uuid: uuid})
    } catch (err) {
        console.log(err.stack)
        res.send("error")
    }
    const later = Date.now()
    console.debug(`STAT|/api/game/create|${uuid}|${later - now}ms`)
})

const adjectives = [
    "Atrocious",
    "Alluring",
    "Busty",
    "Cordial",
    "Daring",
    "Dashing",
    "Flamboyant",
    "Galliant",
    "Heroic",
    "Inky",
    "Moldy",
    "Murdering",
    "Noxious",
    "Obtuse",
    "Particular",
    "Questionable",
    "Radiant",
    "Rowdy",
    "Stately",
    "Staunt",
    "Undulating",
    "Vexing",
    "Wet",
    "Waxed",
]

const nouns = [
    "Antelope",
    "Beaver",
    "Cactus",
    "Dancer",
    "Eggplant",
    "Foot Sniffer",
    "Growth",
    "Marzipan",
    "Marshmallow",
    "Plunger",
    "Pocket Lint",
    "Trashcan",
]

const randomVisitorName = () => {
    const adj = adjectives[Math.floor(Math.random()*adjectives.length)]
    const noun = nouns[Math.floor(Math.random()*nouns.length)]
    return `${adj} ${noun}`
}

app.get("/api/visitors/:uuid", async (req, res) => {
    const { uuid } = req.params;
    try {
        const { rows } = await client.query("SELECT COUNT(DISTINCT visitor)\n" +
            "    FROM visitors\n" +
            "    WHERE game=$1\n" +
            "    AND timestamp > CURRENT_TIMESTAMP - interval '30 minutes'\n" +
            "    LIMIT 4;", [uuid])
        let result = []
        for (let i = 0; i < rows[0].count; i++) {
            result.push(randomVisitorName())
        }
        res.send(result)
    } catch (error) {
        console.log("Error: " + error)
    }
})

app.get("/api/game/:uuid", async (req, res) => {
    const id = String(SHA256(req.ip))
    const { uuid } = req.params;
    try {
        const { rows } = await client.query("SELECT * FROM games WHERE uuid=$1", [uuid]);
        if (rows.length === 0) {
            res.send("NAW");
        } else {
            const name = await client.query("SELECT new_value FROM mutations WHERE game=$1 AND type='name' ORDER BY timestamp DESC LIMIT 1", [uuid]);
            let game = rows[0]
            if (name.rows.length > 0) {
                game.ghost_name = name.rows[0].new_value
            }
            res.send(game);
            // await client.query("DELETE FROM visitors WHERE visitor=$1", [id])
            client.query("INSERT INTO visitors (visitor, timestamp, game) VALUES($1, CURRENT_TIMESTAMP, $2)", [
                id,
                uuid
            ])
        }
    } catch (err) {
        console.log(err.stack);
        res.send(err.stack);
    }
})

app.post("/api/game/update", async (req, res) => {
    let uuid = req.body.uuid
    let action = req.body.action
    if (!uuid || !action) {
        res.send("error")
        return
    }
    try {
        if (action === "name") {
            let name = req.body.name;
            await client.query("INSERT INTO mutations (game, timestamp, type, new_value) VALUES($1, CURRENT_TIMESTAMP, $2, $3)", [
                uuid, "name", name
            ])
            // await client.query("UPDATE games SET ghost_name=$1 WHERE uuid=$2", [name, uuid])
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
})

app.listen(PORT, function() {
    console.log('Example app listening on port ' + PORT + '!');
});
