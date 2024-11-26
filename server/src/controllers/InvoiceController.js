import {
    CreateInvoicesService,
    InvoiceListService,
    InvoicesProductListService,
    PaymentCancelService,
    PaymentFailService,
    PaymentIPNService, PaymentSuccessService,

} from "../services/InvoicesService.js";

export const CreateInvoice = async (req, res, next) => {
    await CreateInvoicesService(req, res, next)
}

export const PaymentFail = async (req, res, next) => {
    await PaymentFailService(req, res, next);
}

export const PaymentCancel = async (req, res, next) => {
    await PaymentCancelService(req, res, next);
}

export const PaymentIPN = async (req, res, next) => {
    await PaymentIPNService(req, res, next);
}

export const PaymentSuccess = async (req, res, next) => {
    await PaymentSuccessService(req, res, next);
}

export const InvoicesProductList = async (req, res, next) => {
    await InvoicesProductListService(req, res, next)
}

export const InvoiceList = async (req, res, next) => {

    await InvoiceListService(req, res, next)
}