export default class Evidence {
    public name: string;
    public rowName: string;

    constructor(name: string, rowName: string) {
        this.name = name;
        this.rowName = rowName;
    }

    static emf5 = new Evidence("EMF 5", "emf5");
    static fingerprints = new Evidence("Fingerprints", "fingerprints");
    static freezing = new Evidence("Freezing", "freezing");
    static ghostWriting = new Evidence("Ghost Writing", "ghost_writing");
    static spiritBox = new Evidence("Spirit Box", "spirit_box");
    static orbs = new Evidence("Orbs", "orbs");
    static all = [
        Evidence.emf5,
        Evidence.fingerprints,
        Evidence.freezing,
        Evidence.ghostWriting,
        Evidence.spiritBox,
        Evidence.orbs,
    ]

}