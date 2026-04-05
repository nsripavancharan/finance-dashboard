const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    amount: { 
        type: Number, 
        required: true,
        min: [0, 'Amount cannot be negative'] 
    },
    type: { 
        type: String, 
        enum: ['income', 'expense'], 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    }, 
    date: { 
        type: Date, 
        default: Date.now 
    }, 
    notes: { 
        type: String,
        trim: true
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

// Performance Optimization: Indexing fields frequently used in dashboard queries
recordSchema.index({ type: 1, date: -1 });
recordSchema.index({ category: 1 });

module.exports = mongoose.model('Record', recordSchema);