import { IdMappedObject } from './ObjectDatastoreMapping';

class EloEntity extends IdMappedObject {
    constructor(db, id, baseRating, events) {
        super(db, id);
        this.baseRating = baseRating ?? 1000;
        this.events = events ?? [];
    }
}

export default EloEntity;