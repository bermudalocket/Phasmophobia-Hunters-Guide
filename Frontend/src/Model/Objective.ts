export default class Objective {
    public text: string;
    public rowName: string;

    private constructor(text: string, rowName: string) {
        this.text = text;
        this.rowName = `obj_${rowName}`;
    }

    static readonly main = new Objective("Discover what type of Ghost we are dealing with", "main")
    static readonly ghostEvent = new Objective("Have a member of your team witness a Ghost Event", "ghostevent")
    static readonly ghostPhoto = new Objective("Capture a photo of the Ghost", "ghostphoto")
    static readonly dirtyWater = new Objective("Capture a photo of Dirty Water in a sink", "dirtywater")
    static readonly emf = new Objective("Find evidence of the paranormal with an EMF Reader", "emf")
    static readonly coldRoom = new Objective("Detect a room below 10 Celsius/50 Fahrenheit with a Thermometer", "coldroom")
    static readonly motionSensor = new Objective("Detect a Ghosts presence with a Motion Sensor", "motionsensor")
    static readonly smudgeSticks = new Objective("Cleanse the area near the Ghost using Smudge Sticks", "smudgesticks")
    static readonly crucifix = new Objective("Prevent the Ghost from hunting with a Crucifix", "crucifix")
    static readonly salt = new Objective("Get a Ghost to walk through Salt", "salt")
    static readonly all = [
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