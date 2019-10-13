const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema( {
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer'
    },
    ordersList: [
        {
            date: {
                type: Date
            },
            waiter: {
                ref: 'users',
                type: Schema.Types.ObjectId
            },
            customer: {
                ref: 'users',
                type: Schema.Types.ObjectId
            },
            table: {
                ref: 'tables',
                type: Schema.Types.ObjectId
            }
        }
    ]
} )
 
module.exports = mongoose.model('users', userSchema)