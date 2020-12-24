import { AxiosResponse, CancelTokenSource } from "axios";
import React, { ReactNode, useEffect } from "react";
import { AppState } from "./AppState";
import { Evidence } from "./Evidence";
import { Objective } from "./Objective";
import { bool3, PG_ADDR } from "../index"
import { GameContext } from "./GameContext";
const axios = require("axios").default;

type ContextProviderModel = {
    children: ReactNode
}

export const ContextProvider = ({children}: ContextProviderModel) => {

    const [gameState, setGameState] = React.useState(new AppState())

    let cancellables: CancelTokenSource[] = []

    const setGhostName = async (name: string) => {
        try {
            cancellables.forEach(c => { c.cancel() })
            cancellables = []
            const token = axios.CancelToken.source()
            cancellables.push(token)
            console.log("-> Set name to " + name)
            await axios.post(`${PG_ADDR}/api/game/update`, {
                uuid: gameState.uuid,
                action: "name",
                name: name,
            }, {
                cancelToken: token.token
            })
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    const setAloneGhost = async (isAloneGhost: bool3) => {
        try {
            return await axios.post(`${PG_ADDR}/api/game/update`, {
                uuid: gameState.uuid,
                action: "aloneghost",
                aloneghost: isAloneGhost,
            })
        } catch (error) {
            return `error: ${error}`
        }
    }

    const setObjective = async (objective: Objective, state?: boolean) => {
        let objectives = gameState.objectives
        objectives.set(objective, state)
        setGameState({...gameState, objectives: objectives})
        try {
            return await axios.post(`${PG_ADDR}/api/game/update`, {
                uuid: gameState.uuid,
                action: "objective",
                objective: objective.rowName,
                state: state,
            })
        } catch (error) {
            return `error: ${error}`
        }
    }

    const setEvidence = async (evidence: Evidence, evidenceState: bool3) => {
        let evidences = gameState.evidences
        evidences.set(evidence, evidenceState)
        setGameState({...gameState, evidences: evidences})
        console.log("evidence: " + evidence + " to " + evidenceState)
        try {
            await axios.post(`${PG_ADDR}/api/game/update`, {
                uuid: gameState.uuid,
                action: "evidence",
                evidence: evidence.rowName,
                state: evidenceState,
            }).then((response: AxiosResponse) => {
                console.log(response)
            })
        } catch(error) {
            console.log("POST error: " + error)
        }
    }

    const update = async () => {
        const parsePostgresState = (state: boolean | string | null) => {
            switch (state) {
                case true: case "yes": return true
                case false: case "no": return false
                case null: case undefined: case "unknown": return undefined
            }
        }
        try {
            let res = await axios.get(`${PG_ADDR}/api/game/${gameState.uuid}`)
            let state = new AppState()
            state.uuid = res.data.uuid
            state.aloneGhost = res.data.alone_ghost
            state.ghostName = (!res.data.ghost_name) ? "" : res.data.ghost_name

            state.evidences = new Map<Evidence, bool3>()
            state.evidences.set(Evidence.fingerprints, parsePostgresState(res.data.fingerprints))
            state.evidences.set(Evidence.freezing, parsePostgresState(res.data.freezing))
            state.evidences.set(Evidence.emf5, parsePostgresState(res.data.emf5))
            state.evidences.set(Evidence.orbs, parsePostgresState(res.data.orbs))
            state.evidences.set(Evidence.spiritBox, parsePostgresState(res.data.spirit_box))
            state.evidences.set(Evidence.ghostWriting, parsePostgresState(res.data.ghost_writing))

            state.objectives = new Map<Objective, bool3>()
            state.objectives.set(Objective.main, parsePostgresState(res.data.obj_main))
            state.objectives.set(Objective.ghostEvent, parsePostgresState(res.data.obj_ghostevent))
            state.objectives.set(Objective.ghostPhoto, parsePostgresState(res.data.obj_ghostphoto))
            state.objectives.set(Objective.dirtyWater, parsePostgresState(res.data.obj_dirtywater))
            state.objectives.set(Objective.emf, parsePostgresState(res.data.obj_emf))
            state.objectives.set(Objective.coldRoom, parsePostgresState(res.data.obj_coldroom))
            state.objectives.set(Objective.motionSensor, parsePostgresState(res.data.obj_motionsensor))
            state.objectives.set(Objective.smudgeSticks, parsePostgresState(res.data.obj_smudgesticks))
            state.objectives.set(Objective.crucifix, parsePostgresState(res.data.obj_crucifix))
            state.objectives.set(Objective.salt, parsePostgresState(res.data.obj_salt))

            const isDiff = gameState.isDiff(state)
            console.log("==== IS DIFF? " + isDiff)
            if (isDiff) {
                setGameState(state)
            }
        } catch(error) {
            console.log("UPDATE ERROR: " + error)
        }
    }

    useEffect(() => {
        console.log("---> GAMEPROVIDER RE-RENDERED")
        update()
        const updater = setInterval(update, 2500)
        return () => clearInterval(updater)
    })

    return (
        <GameContext.Provider value={{gameState, setEvidence, setObjective, setGhostName, setAloneGhost}}>
            {children}
        </GameContext.Provider>
    )
}
