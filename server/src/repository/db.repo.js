import { ObjectId } from "mongodb";

export function createRepository(getCollection) {
    async function getAllDocs() {
        const allDocs = await getCollection().find({}).toArray();
        return allDocs;
    }

    async function getDocById(id) {
        const doc = await getCollection().findOne({ _id: new ObjectId(id) });
        return doc;
    }

    async function getDocByField(field, value) {
        const doc = await getCollection().findOne({ [field]: value });
        return doc;
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
        getDocByField,
        createDoc,
        deleteDoc,
        updateDoc,
    };
}
