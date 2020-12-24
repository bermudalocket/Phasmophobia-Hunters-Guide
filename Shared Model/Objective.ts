export class Objective {
    public text: string;
    public rowName: string;

    constructor(text: string, rowName: string) {
        this.text = text;
        this.rowName = `obj_${rowName}`;
    }

    static main = new Objective("Discover what type of Ghost we are dealing with", "main")
    static ghostEvent = new Objective("Have a member of your team witness a Ghost Event", "ghostevent")
    static ghostPhoto = new Objective("Capture a photo of the Ghost", "ghostphoto")
    static dirtyWater = new Objective("Capture a photo of Dirty Water in a sink", "dirtywater")
    static emf = new Objective("Find evidence of the paranormal with an EMF Reader", "emf")
    static coldRoom = new Objective("Detect a room below 10 Celsius/50 Fahrenheit with a Thermometer", "coldroom")
    static motionSensor = new Objective("Detect a Ghosts presence with a Motion Sensor", "motionsensor")
    static smudgeSticks = new Objective("Cleanse the area near the Ghost using Smudge Sticks", "smudgesticks")
    static crucifix = new Objective("Prevent the Ghost from hunting with a Crucifix", "crucifix")
    static salt = new Objective("Get a Ghost to walk through Salt", "salt")
    static all = [
        Objective.main,
        Objective.ghostEvent,
        Objective.ghostPhoto,
        Objective.dirtyWater,
        Objective.emf,
        Objective.coldRoom,
        Objective.motionSensor,
        Objective.smudgeSticks,
        Objective.crucifix,
        Objective.salt,
    ]
}