const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId; // Generar string aleatorio

//Suscription Schema
const membershipSchema = new Schema({
    membershipId: ObjectId,
    creation_date: String,
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    membership_data: {
        amount: Number,
        currency: {
            type: String,
            default: "MXN",
            enum: ["MXN", "USD"]
        },
        repeat_every: {
            type: Number,
            default: 1
        },
        repeat_unit: {
            type: String,
            default: "month"
        },
        retry_times: {
            type: Number,
            default: 3
        },
        status_after_retry: {
            type: String,
            default: "cancelled"
        }
    },
    member_data: {
        name: String,
        last_name: String,
        email: String,
        phone_number: Number,
    },
    card_data: {
        holder_name: String,
        card_number: Number,
        cvv2: Number,
        expiration_month: Number,
        expiration_year: Number
    }
});

const Membership = mongoose.model('Membership', membershipSchema);
module.exports = { Membership }