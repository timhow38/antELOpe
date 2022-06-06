import EloEntity from './EloEntity';

class Climb extends EloEntity {
    static collectionId = 'climbs';

    constructor(id, rope, colour, grade, events, isActive = true, baseRating = null) {
        baseRating ??= grade * 100;
        super(id, baseRating, events);
        this.rope = rope;
        this.colour = colour;
        this.grade = grade;
        this.isActive = isActive;
    }
}

export default Climb;