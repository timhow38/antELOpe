import Event from './Event';

class ClimbAttempt extends Event {
    constructor(ranked, rope, colour, climbRating, outcome) {
        super('ClimbAttempt');
        this.ranked = ranked;
        this.rope = rope;
        this.colour = colour;
        this.climbRating = climbRating;
        this.outcome = outcome;
    }
}

export default ClimbAttempt;