import { reduceElo, reduceEloHistory, eloToGrade } from './EloTools';

class UserScore {
    constructor(id, allScores, finalScore) {
        this.id = id;
        this.allScores = allScores;
        this.finalScore = finalScore;
    }
}

const filters = {
    rankedClimbs: users => {
        users.map(user => user.events = (user.events ?? []).filter(i => i.ranked && i.climbRating));
        return users;
    },
    hangboardTimes: users => {
        users.map(user => user.events = (user.events ?? []).filter(i => i.type == 'HangboardTime'));
        return users;
    }
}

const scoreMaps = {
    hangboardTimes: users => {
        users = filters.hangboardTimes(users);
        users = users.map(user => new UserScore(user.id, user.events.map(i => parseFloat(i.durationSeconds))));
        return users;
    },
    eloHistory: users => {
        users = filters.rankedClimbs(users);
        console.log(users);
        users = users.map(user => new UserScore(user.id, reduceEloHistory(user.events, user.baseRating).map(i => eloToGrade(i.currentElo))));
        console.log(users);
        return users;
    }
}

const aggregators = {
    max: users => {
        users.map(user => user.finalScore = user.allScores.reduce((prev, curr) => curr > prev ? curr : prev, 0));
        return users;
    },
    sum: users => {
        users.map(user => user.finalScore = user.allScores.reduce((prev, curr) => curr += prev, 0));
        return users;
    },
    count: users => {
        users.map(user => user.finalScore = user.allScores.length);
        return users;
    },
    last: users => {
        users.map(user => user.finalScore = user.allScores[user.allScores.length - 1]);
        return users;
    },
}

const orders = {
    highToLow: users => users.sort((iA, iB) => iA.finalScore < iB.finalScore ? 1 : -1)
}

function reduceRankedGrade(user) {
    return eloToGrade(reduceElo(filters.rankedClimbs(user.events), user.baseRating));
}

function compose(funcs) {
    let f = (users) => {
        let localUsers = JSON.parse(JSON.stringify(users));
        funcs.forEach(func => {
            localUsers = func(localUsers);
        });
        return localUsers;
    };
    return f;
}

export { reduceRankedGrade, filters, scoreMaps, aggregators, orders, compose };