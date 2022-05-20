import EloEntity from './EloEntity';

class User extends EloEntity{
    static collectionId = 'users';

    constructor(id, name, events, baseRating = 1000) {
        super(id, baseRating, events);
        this.name = name;
    }
}

export default User;