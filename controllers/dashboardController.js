const Record = require('../models/Record');

exports.getSummary = async (req, res, next) => {
    try {
        const summary = await Record.aggregate([
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
                    totalExpense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalIncome: 1,
                    totalExpense: 1,
                    netBalance: { $subtract: ['$totalIncome', '$totalExpense'] }
                }
            }
        ]);
        
        res.json({ success: true, data: summary[0] || { totalIncome: 0, totalExpense: 0, netBalance: 0 } });
    } catch (error) {
        next(error);
    }
};

exports.getCategoryTotals = async (req, res, next) => {
    try {
        const totals = await Record.aggregate([
            { $group: { _id: { type: '$type', category: '$category' }, total: { $sum: '$amount' } } },
            { $sort: { total: -1 } }
        ]);
        
        res.json({ success: true, data: totals });
    } catch (error) {
        next(error);
    }
};