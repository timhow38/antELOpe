import Event from './Event';

class HangboardTime extends Event {
	constructor(durationSeconds) {
		super('HangboardTime');
		this.durationSeconds = durationSeconds;
	}
}

export default HangboardTime;