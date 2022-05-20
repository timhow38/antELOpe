import EloEntity from './EloEntity';

class Climb extends EloEntity {
    static collectionId = 'climbs';

    constructor(db, id, rope, colour, grade, events, baseRating = null) {
        baseRating ??= grade * 100;
        super(db, id, baseRating, events);
        this.rope = rope;
        this.colour = colour;
    }
}