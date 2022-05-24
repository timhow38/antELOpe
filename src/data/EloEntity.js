import { IdMappedObject } from './ObjectDatastoreMapping';

class EloEntity extends IdMappedObject {
    constructor(id, baseRating, events) {
        super(id);
        this.baseRating = baseRating ?? 1500;
        this.events = events ?? [];
    }
}

export default EloEntity;