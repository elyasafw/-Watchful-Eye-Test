export function createService(repository) {
    function createNew(alert) {
        const newAlert = {
            ...alert,
            lon: Number(alert.lon),
            lat: Number(alert.lat),
        };
        return repository.createDoc(newAlert);
    }

    function getAll() {
        return repository.getAllDocs();
    }

    function getById(id) {
        return repository.getDocById(id);
    }

    function remove(id) {
        return repository.deleteDoc(id);
    }

    function update(id, updates) {
        const finalUpdates = { ...updates };

        if (finalUpdates.lon !== undefined) {
            finalUpdates.lon = Number(finalUpdates.lon);
        }
        if (finalUpdates.lat !== undefined) {
            finalUpdates.lat = Number(finalUpdates.lat);
        }

        return repository.updateDoc(id, finalUpdates);
    }

    return { createNew, getAll, getById, remove, update };
}
