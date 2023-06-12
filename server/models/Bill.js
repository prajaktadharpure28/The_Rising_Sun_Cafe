import { Schema, model } from mongoose

const billSchema = new Schema({
    orderId: String,
    totalAmount: Number,
},
{
    timestamps: true
});

const Bill = model("Bill", billSchema);

export default Bill;
