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

    return { createNew, getAll, getById, remove };
}

