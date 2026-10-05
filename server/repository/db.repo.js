import { ObjectId } from "mongodb";

export function createRepository(getCollection) {
    async function getAllDocs() {
        const allAlerts = await getCollection().find({}).toArray();
        return allAlerts;
    }

    async function getDocById(id) {
        const alert = await getCollection().findOne({ _id: new ObjectId(id) });
        return alert;
    }

    async function createDoc(doc) {
        const result = await getCollection().insertOne(doc);
        return result.insertedId;
    }

    async function deleteDoc(id) {
        const result = await getCollection().deleteOne({
            _id: new ObjectId(id),
        });
        return result._id;
    }

    async function updateDoc(id, updates) {
        const result = await getCollection().updateOne(
            { _id: new ObjectId(id) },
            { $set: updates },
        );
        return result.matchedCount;
    }

    return {
        getAllDocs,
        getDocById,
        createDoc,
        deleteDoc,
        updateDoc,
    };
}
