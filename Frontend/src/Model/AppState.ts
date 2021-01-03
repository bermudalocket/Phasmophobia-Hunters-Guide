import { bool3 } from "../index";
import Evidence from "./Evidence";
import Objective from "./Objective";
import ObjectiveState from "./ObjectiveState";

export class AppState {

    // meta
    isLoading = true
    colorMode = "dark"

    // game
    uuid = ""
    ghostName = ""
    aloneGhost: bool3 = undefined
    evidences = new Map<Evidence, bool3>()
    photos = new Map<String, bool3>()
    objectives = new Map<Objective, ObjectiveState>()

    gameVisitors: Array<string> = []

    /**
     * Returns true if React should redraw the view tree with the new state.
     
     * @param appState the new state
     */
    isDiff = (appState: AppState) => {
        return this.uuid !== appState.uuid
            || this.ghostName !== appState.ghostName
            || this.aloneGhost !== appState.aloneGhost
            || !this.evidencesAreEqual(appState)
            || !this.objectivesAreEqual(appState)
            || !this.photosAreEqual(appState)
    }

    photosAreEqual = (otherState: AppState) => {
        for (let [photo, state] of this.photos) {
            if (state !== otherState.photos.get(photo)) {
                return false
            }
        }
        return true
    }

    evidencesAreEqual = (otherState: AppState) => {
        for (let [evidence, evidenceState] of this.evidences) {
            if (evidenceState !== otherState.evidences.get(evidence)) {
                return false
            }
        }
        return true
    }

    objectivesAreEqual = (otherState: AppState) => {
        for (let [objective, objectiveState] of this.objectives) {
            if (objectiveState !== otherState.objectives.get(objective)) {
                return false
            }
        }
        return true
    }

}