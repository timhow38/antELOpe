import { doc, setDoc, getDoc } from "firebase/firestore";

class IdMappedObject {
	constructor({ db, id }) {
		this.db = db;
		this.id = id;
	}

	fillFromDoc(doc) {
		let data = doc.data();
		for (const prop in data) {
			this[prop] = data[prop];
		}
	}

	toDoc() {
		let pseudoObj = {};
		for (const prop in this) {
			if (!(prop == 'id' || prop == 'collectionId' || prop == 'db')) {
				pseudoObj[prop] = this[prop];
			}
		}
		return pseudoObj;
	}

	static getDocRef(db, id) {
		return doc(db, this.collectionId, id);
	}

	static async fromFireStore(db, id) {
		let docRef = this.getDocRef(db, id);
		let docSnap = await getDoc(docRef);
		if (!docSnap.exists())
			return null;
		let obj = new this({ db, id });
		obj.fillFromDoc(docSnap);
		return obj;
	}

	persist() {
		console.log(this.toDoc());
		let docRef = this.constructor.getDocRef(this.db, this.id);
		setDoc(docRef, this.toDoc(), { merge: true });
	}
}

export { IdMappedObject };