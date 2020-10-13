class OperationsBaseMongo extends BaseOperations {
    constructor(model) {
        this.model = model;
    }

    async insert(data) {
        const concrete = new this.model(data);
        return await concrete.save();
    }

    async update(query, replace) {
        const updatedRegister = await this.model.updateMany(query, replace);
        if(updatedRegister.ok > 0) return true;
        return false;
    }

    async get(query) {
        return await this.model.findOne(query);
    }

    async getAll(query) {
        return await this.model.find(query);
    }

    async delete(query) {
        return await this.model.deleteMany(query);
    }
}

module.exports = OperationsBaseMongo;