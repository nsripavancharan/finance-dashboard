const Record = require('../models/Record');

exports.createRecord = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.id;
        const record = await Record.create(req.body);
        res.status(201).json({ success: true, data: record });
    } catch (error) {
        next(error);
    }
};

exports.getRecords = async (req, res, next) => {
    try {
        const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;
        let query = {};

        if (type) query.type = type;
        if (category) query.category = category;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const records = await Record.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Record.countDocuments(query);

        res.json({ success: true, count: records.length, total, data: records });
    } catch (error) {
        next(error);
    }
};

exports.updateRecord = async (req, res, next) => {
    try {
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        
        if (!record) return res.status(404).json({ success: false, error: 'Record not found' });
        
        res.json({ success: true, data: record });
    } catch (error) {
        next(error);
    }
};

exports.deleteRecord = async (req, res, next) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);
        
        if (!record) return res.status(404).json({ success: false, error: 'Record not found' });
        
        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        next(error);
    }
};