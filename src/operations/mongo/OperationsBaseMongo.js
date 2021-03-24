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
        try {
            return await this.model.updateMany(query, replace);
        if(updatedRegister.ok > 0) return true;
        } catch (error) {
            return {};
        }
        
        return false;
    }

    async get(query) {
        try {
            return await this.model.findOne(query);
        } catch (error) {
            return {};
        }
    }

    async getAll(query) {
        try {
            return await this.model.find(query);
        } catch (error) {
            return {};
        }
    }

    async delete(query) {
        return await this.model.deleteMany(query);
    }

    async getPaginated(query, page=1, limit=10) {
        try {
            return await this.model.find(query).skip((page-1)*limit).limit(parseInt(limit));
        } catch (error) {
            return {};
        }
    }
}

module.exports = OperationsBaseMongo;