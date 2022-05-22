import Event from './Event';

class ClimbAttempt extends Event {
    constructor(ranked, rope, colour, outcome) {
        super('ClimbAttempt');
        this.ranked = ranked;
        this.rope = rope;
        this.colour = colour;
        this.outcome = outcome;
    }
}

export default ClimbAttempt;