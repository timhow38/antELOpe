import EloEntity from './EloEntity';

class Climb extends EloEntity {
    static collectionId = 'climbs';

    constructor(id, rope, colour, grade, ranked, events, baseRating = null) {
        baseRating ??= grade * 100;
        super(id, baseRating, events);
        this.rope = rope;
        this.colour = colour;
        this.ranked = ranked;
        this.outcome = null;
    }
}