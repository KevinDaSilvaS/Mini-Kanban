const BaseOperations = require('../BaseOperations');

class OperationsBaseMongo extends BaseOperations {
    constructor(model) {
        super(model);
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

    async getPaginated(query, page=1, limit=10) {
        return await this.model.find(query).skip((page-1)*limit).limit(limit);
    }
}

module.exports = OperationsBaseMongo;