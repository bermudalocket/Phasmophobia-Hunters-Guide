import {Evidence} from "./Evidence";

export class Ghost {
    public name: string;
    public requiredEvidence: [Evidence, Evidence, Evidence];

    constructor(name: string, requiredEvidence: [Evidence, Evidence, Evidence]) {
        this.name = name;
        this.requiredEvidence = requiredEvidence;
    }

    static spirit = new Ghost("Spirit", [
        Evidence.fingerprints, Evidence.ghostWriting, Evidence.spiritBox
    ]);
    static phantom = new Ghost("Phantom", [
        Evidence.freezing, Evidence.orbs, Evidence.emf5
    ]);
    static poltergeist = new Ghost("Poltergeist", [
        Evidence.fingerprints, Evidence.orbs, Evidence.spiritBox
    ]);
    static banshee = new Ghost("Banshee", [
        Evidence.fingerprints, Evidence.freezing, Evidence.emf5
    ]);
    static jinn = new Ghost("Jinn", [
        Evidence.emf5, Evidence.orbs, Evidence.spiritBox
    ]);
    static mare = new Ghost("Mare", [
        Evidence.freezing, Evidence.orbs, Evidence.spiritBox
    ]);
    static revenant = new Ghost("Revenant", [
        Evidence.fingerprints, Evidence.ghostWriting, Evidence.emf5
    ]);
    static shade = new Ghost("Shade", [
        Evidence.emf5, Evidence.ghostWriting, Evidence.orbs
    ]);
    static demon = new Ghost("Demon", [
        Evidence.freezing, Evidence.ghostWriting, Evidence.spiritBox
    ]);
    static yurei = new Ghost("Yurei", [
        Evidence.freezing, Evidence.ghostWriting, Evidence.orbs
    ]);
    static oni = new Ghost("Oni", [
        Evidence.emf5, Evidence.ghostWriting, Evidence.spiritBox
    ]);
    public static all = [
        Ghost.spirit,
        Ghost.phantom,
        Ghost.poltergeist,
        Ghost.banshee,
        Ghost.jinn,
        Ghost.mare,
        Ghost.revenant,
        Ghost.shade,
        Ghost.demon,
        Ghost.yurei,
        Ghost.oni
    ];
}