import { ObjectId } from "mongodb";

export function createRepository(collection) {
    async function getAllAlerts() {
        const allAlerts = await collection.find({}).toArray();
        return allAlerts;
    }

    async function getAlertById(id) {
        const alert = await collection.findOne({ _id: new ObjectId(id) });
        return alert;
    }

    async function createAlert(alert) {
        const result = await collection.insertOne(alert);
        return result.insertedId;
    }

    async function deleteAlert(id) {
        const result = await collection.deleteOne({
            _id: new ObjectId(id),
        });
        return result._id;
    }

    async function updateAlert(id, updates) {
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates },
        );
        return result.matchedCount;
    }

    return {
        getAllAlerts,
        getAlertById,
        createAlert,
        deleteAlert,
        updateAlert,
    };
}
