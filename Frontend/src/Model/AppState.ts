import { bool3 } from "../index";
import { Evidence } from "../../../Shared Model/Evidence";
import { Objective } from "../../../Shared Model/Objective";

export class AppState {

    uuid = ""
    ghostName = ""
    aloneGhost: bool3 = undefined
    evidences = new Map<Evidence, bool3>()
    objectives = new Map<Objective, bool3>()

    isDiff = (appState: AppState) => {
        return this.uuid !== appState.uuid
            || this.ghostName !== appState.ghostName
            || this.aloneGhost !== appState.aloneGhost
            || !this.evidencesAreEqual(appState)
            || !this.objectivesAreEqual(appState)
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