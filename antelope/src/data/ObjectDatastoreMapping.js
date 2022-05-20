import { doc, setDoc, getDoc } from "firebase/firestore";

class IdMappedObject {
	constructor(db, id) {
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
				pseudoObj[prop] = DeepMapToPojo(this[prop]);
			}
		}
		return pseudoObj;
	}

	static getDocRef(db, id) {
		return doc(db, this.collectionId, id);
	}

	static async fromFirestore(db, id) {
		let docRef = this.getDocRef(db, id);
		let docSnap = await getDoc(docRef);
		if (!docSnap.exists())
			return null;
		let obj = new this(db, id);
		obj.fillFromDoc(docSnap);
		return obj;
	}

	persist() {
		let docRef = this.constructor.getDocRef(this.db, this.id);
		setDoc(docRef, this.toDoc(), { merge: true });
	}
}

function DeepMapToPojo(obj) {
	if (typeof obj === 'object') {
		if (Array.isArray(obj)) {
			let arr = [];
			for (let element in obj) {
				arr.push(DeepMapToPojo(obj[element]));
			}
			return arr;
		} else {
			let pojo = {};
			for (let prop in obj) {
				pojo[prop] = DeepMapToPojo(obj[prop]);
			}
			return pojo;
		}
	} else {
		if (typeof obj === 'undefined')
			return '';
		return obj;
    }
}

export { IdMappedObject };