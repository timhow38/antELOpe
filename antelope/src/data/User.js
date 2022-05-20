import EloEntity from './EloEntity';

class User extends EloEntity{
    static collectionId = 'users';

    constructor(db, id, name, events, baseRating) {
        super(db, id, baseRating, events);
        this.name = name;
    }
}

export default User;