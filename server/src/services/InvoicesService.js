import {successResponse} from "../controllers/responseController.js";
import cartsModel from "../models/cartsModel.js";
import ProfileModel from "../models/profilesModel.js";
import InvoiceModel from "../models/invoicesModel.js";
import InvoiceProductsModel from "../models/invoiceProductsModel.js";
import PaymentModel from "../models/PaymentSettingModel.js";
import CartsModel from "../models/cartsModel.js";
import mongoose from "mongoose";
import CartModel from "../models/cartsModel.js";
import PaymentSetting from "../models/PaymentSettingModel.js";
import axios from "axios";
import invoicesModel from "../models/invoicesModel.js";
import InvoicesModel from "../models/invoicesModel.js";
import InvoiceProductModel from "../models/invoiceProductsModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const CreateInvoicesService = async (req, res, next) => {
    try {
        // Validate headers
        const userId = new ObjectId(req.headers.userId);
        const userEmail = req.headers['email'];


        // 1. Calculate total payable and VAT
        const matchStage = {$match: {userID: userId}}; // Match by userId
        const joinStageWithProduct = {
            $lookup: {
                from: "products", localField: "productID", foreignField: "_id", as: "product"
            }
        };
        const unwindStage = {$unwind: "$product"}; // Unwind the joined product array

        const cartProduct = await CartModel.aggregate([matchStage, joinStageWithProduct, unwindStage]);

        let totalPrice = 0;

        cartProduct.forEach((element) => {
            let price;

            if (element.product.discount) {
                price = parseFloat(element.product.discountPrice);
            } else {
                price = parseFloat(element.product.price);
            }
            totalPrice = parseFloat(element.qty) * price;
        })

        const vat = totalPrice * 0.05 // 5%
        const payable = totalPrice + vat;

        // 2. Prepare customer details and shopping details

        const customer = await ProfileModel.aggregate([matchStage]);

        let CustomerDetails = `Name: ${customer[0].cus_name},Address:  ${customer[0].cus_add},Phone:  ${customer[0].cus_phone},email:  ${userEmail},`
        let shippingDetails = `ship_name: ${customer[0].ship_name},ship_city:  ${customer[0].ship_city},ship_phone:  ${customer[0].ship_phone},ship_add:  ${customer[0].ship_add},`

        // Add your logic here

        // 3. Generate transaction and other IDs
        const tranId = Math.floor(100000000 + Math.random() * 900000000);
        const validationId = 0;
        const delivery_status = "pending";
        const payment_status = "pending";


        // 4. Create Invoices
        const createInvoice = await InvoiceModel.create({
            userID: userId,
            payable: payable,
            cus_details: CustomerDetails,
            ship_details: shippingDetails,
            tran_id: tranId,
            val_id: validationId,
            payment_status: payment_status,
            delivery_status: delivery_status,
            total: totalPrice,
            vat: vat,
        })


        // 5. Create invoice products

        const InvoiceId = createInvoice["_id"];

        cartProduct.forEach(async (element) => {
            await InvoiceProductsModel.create({
                userID: userId,
                productID: element.productID,
                invoiceID: InvoiceId,
                qty: element.qty,
                price: element.product.discount ? element.product.discountPrice : element.product.price,
                color: element.color,
                size: element.size
            })
        })


        // 6. Remove carts
        await CartsModel.deleteMany({userID: userId});

        // 7. Prepare SSL Payment

        const paymentSetting = await PaymentSetting.find();


        const formData = new FormData();
        // Integration Required Parameters
        formData.append("store_id", "teamr600c004f8da4d");
        formData.append("store_passwd", "teamr600c004f8da4d@ssl");
        formData.append("total_amount", payable.toString());
        formData.append("currency", paymentSetting[0].currency);
        formData.append("tran_id", tranId);
        formData.append("success_url", `${paymentSetting[0].successUrl}/${tranId}`);
        formData.append("fail_url", `${paymentSetting[0].failureUrl}/${tranId}`);
        formData.append("cancel_url", `${paymentSetting[0].cancelUrl}/${tranId}`);
        formData.append("ipn_url", paymentSetting[0].ipnUrl);

        // customer information
        formData.append("cus_name", customer[0].cus_name);
        formData.append("cus_email", userEmail);
        formData.append("cus_add1", customer[0].cus_add);
        formData.append("cus_add2", customer[0].cus_add);
        formData.append("cus_city", customer[0].cus_city);
        formData.append("cus_state", customer[0].cus_state);
        formData.append("cus_postcode", customer[0].cus_postcode);
        formData.append("cus_country", customer[0].cus_country);
        formData.append("cus_phone", customer[0].cus_phone);
        formData.append("cus_fax", customer[0].cus_fax);


        // Shipment Information

        formData.append("shipping_method", "YES");
        formData.append("ship_name", customer[0].ship_name);
        formData.append("ship_add1", customer[0].ship_add);
        formData.append("ship_add2", customer[0].ship_add);
        formData.append("ship_city", customer[0].ship_city);
        formData.append("ship_state", customer[0].ship_state);
        formData.append("ship_country", customer[0].ship_country);
        formData.append("ship_postcode", customer[0].ship_postcode);


        // Product Information
        formData.append("product_name", "Invoice Payment");
        formData.append("product_category", "Invoice");
        formData.append("product_profile", "general");
        formData.append("product_amount", payable.toString());


        //  let SSLCResponse = await axios.post("https://sandbox.sslcommerz.com/gwprocess/v3/api.php", formData);
        let response = await axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', formData)

        console.log(response);
        // Send a success response
        return successResponse(res, {
            statusCode: 200, message: response.data,
        })
    } catch (error) {
        next(error);
    }
};

export const PaymentSuccessService = async (req, res, next) => {
    try {
        const tranId = req.params.trxId;
        await invoicesModel.updateOne({tran_id: tranId}, {payment_status: "success"}, {new: true})
        return successResponse(res, {
            statusCode: 200, message: 'Payment Success',
        })
    } catch (error) {
        next(error);

    }
}
export const PaymentFailService = async (req, res, next) => {
    try {
        const tranId = req.params.trxId;
        await invoicesModel.updateOne({tran_id: tranId}, {payment_status: "fail"}, {new: true})

        return successResponse(res, {
            statusCode: 200, message: 'Payment fail',
        })
    } catch (error) {
        next(error)
    }
}
export const PaymentCancelService = async (req, res, next) => {
    try {
        const tranId = req.params.trxId;
        await invoicesModel.updateOne({tran_id: tranId}, {payment_status: "cancel"}, {new: true})
        return successResponse(res, {
            statusCode: 200, message: "Payment cancel",
        })
    } catch (error) {
        next(error);
    }
}

export const PaymentIPNService = async (req, res, next) => {
    try {
        const tranId = req.params.trxId;
        const status = req.body.status;
        await invoicesModel.updateOne({tran_id: tranId}, {payment_status: status}, {new: true})

        return successResponse(res, {
            statusCode: 200, message: 'Payment IPN service',
        })
    } catch (error) {
        next(error);
    }
}

export const InvoiceListService = async (req, res, next) => {
    try {
        const userId = req.headers.userId;
        const data = await InvoicesModel.find({userID: userId});
        return successResponse(res, {
            statusCode: 200, message: "Read Invoice ListService Ready Successfully", payload: data
        })
    } catch (error) {
        next(error);
    }
}
export const InvoicesProductListService = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.headers.userId);
        const invoiceId = new ObjectId(req.params.invoiceId);

        const matchStage = {$match: {userID: userId, invoiceID: invoiceId}};
        const joinStageWithProduct = {
            $lookup: {
                from: "products", localField: "productID", foreignField: "_id", as: "product"
            }
        };
        const unwindStage = {$unwind: "$product"};

        const data = await InvoiceProductModel.aggregate([matchStage, joinStageWithProduct, unwindStage]);
        return successResponse(res, {
            statusCode: 200, message: " Invoice Product list Service Successfully", payload: data
        })
    } catch (error) {
        next(error);
    }
}

