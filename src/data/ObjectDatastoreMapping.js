import { doc, setDoc, getDoc } from "firebase/firestore";

class IdMappedObject {
	constructor(id) {
		this.id = id;
	}

	fillFromDoc(doc) {
		let data = doc.data();
		for (const prop in data) {
			this[prop] = data[prop];
		}
		return this;
	}

	toDoc() {
		let pseudoObj = {};
		for (const prop in this) {
			if (!(prop == 'id' || prop == 'collectionId')) {
				pseudoObj[prop] = DeepMapToPojo(this[prop]);
			}
		}
		return pseudoObj;
	}

	static async fromFirestore(db, id) {
		let docSnap = await getDoc(doc(db, this.collectionId, id));
		if (!docSnap.exists())
			return null;
		let obj = new this(id);
		obj.fillFromDoc(docSnap);
		return obj;
	}

	persist(db) {
		setDoc(doc(db, this.constructor.collectionId, this.id), this.toDoc(), { merge: true });
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