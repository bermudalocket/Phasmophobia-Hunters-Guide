import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from "./Model/ContextProvider";
import './Style/App.css'
import { Main } from "./View/MainView";

// ----------------------------------------------------------------------------
// GLOBAL

// convenience type
export type bool3 = boolean | undefined

// represents a boolean sent by postgres (true, false, null)
export type pgbool = boolean | null

// ----------------------------------------------------------------------------
// ENVIRONMENT

export const PG_ADDR = (process.env.NODE_ENV === "production") ? "https://www.bermudalocket.com" : "http://localhost:3001"

// The last path component of the current URL: either null or a game UUID
export let GAME_ID = window.location.pathname.split("/").slice(-1).pop()

// ----------------------------------------------------------------------------
// GAME

/**
 * If GAME_ID is null, sends a POST request to API asking for a new game & receive a UUID.
 *
 * Otherwise, attach the ContextProvider to our view tree and render it.
 */
async function launch() {
    if (!GAME_ID) {
        const request = new Request(`${PG_ADDR}/api/game/create`, { method: "POST" })
        const response = await fetch(request)
        if (response.status === 200) {
            const json = await response.json()
            GAME_ID = json.uuid
            window.location.replace(`${window.location.href}${GAME_ID}`)
        } else {
            alert("There was an error fetching a new game UUID. Try again later?")
        }
    } else {
        ReactDOM.render(
            <ContextProvider>
                <Main uuid={GAME_ID} />
            </ContextProvider>,
            document.getElementById("rx-content")
        )
    }
}

launch().then(() => console.log("Launched"))