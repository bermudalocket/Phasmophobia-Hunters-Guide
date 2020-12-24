import React from "react";
import { bool3 } from "../index";
import { AppState } from "./AppState";
import { Evidence } from "./Evidence";
import { Objective } from "./Objective";

// ----------------------------------------------------------------------------
/**
 * An environment object that:
 *  - describes the state of the game
 *  - provides mutators for changing the state of the game
 */
export const GameContext = React.createContext({
    gameState: new AppState(),
    setEvidence: (_evidence: Evidence, _evidenceState: bool3) => {},
    setObjective: (_objective: Objective, _state: bool3) => {},
    setGhostName: (_name: string) => {},
    setAloneGhost: (_isAloneGhost: bool3) => {},
})

export const useGameContext = () => React.useContext(GameContext);