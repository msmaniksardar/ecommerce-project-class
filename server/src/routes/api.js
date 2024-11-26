import express from "express";

const router = express.Router();
import {IsLoggedIn, isLoggedOut} from "../middlewares/authentication.js";
import * as UserController from "../controllers/UsersController.js";
import * as CategoryController from "../controllers/CategoryController.js";
import * as BrandController from "../controllers/BrandController.js";
import * as ProductController from "../controllers/ProductController.js";
import * as CartListController from "../controllers/CartListController.js";
import * as WishListController from "../controllers/WishListController.js";
import * as InvoiceController from "../controllers/InvoiceController.js";
import * as FeatureController from "../controllers/FeatureController.js";
import {productFilterList} from "../controllers/ProductController.js";

// Users
router.post("/Login", UserController.Login);
router.post("/VerifyLogin", UserController.VerifyLogin);
router.post("/CreateUserProfile", IsLoggedIn, UserController.CreateUserProfile);
router.post("/UpdateUserProfile", IsLoggedIn, UserController.UpdateUserProfile);
router.get("/ReadUserProfile", IsLoggedIn, UserController.ReadUserProfile);
router.post("/logout", UserController.userLogOut);

// Brands
router.get("/BrandList", BrandController.BrandList);

// Categories
router.get("/CategoryList", CategoryController.CategoryList);

// Cart
router.post("/CreateCart", IsLoggedIn, CartListController.CreateCart);
router.get("/ReadCartList", IsLoggedIn, CartListController.ReadCartList);
router.post("/UpdateCart", IsLoggedIn, CartListController.UpdateCart);
router.post("/RemoveCart", IsLoggedIn, CartListController.RemoveCart);

// Review
router.post("/CreateUserReview", IsLoggedIn, UserController.CreateUserReview);
router.post("/UpdateUserReview", IsLoggedIn, UserController.UpdateUserReview);

// Wish
router.post("/CreateWish", IsLoggedIn, WishListController.CreateWish);
router.get("/ReadWishList", IsLoggedIn, WishListController.ReadWishList);
router.post("/RemoveWish", IsLoggedIn, WishListController.RemoveWish);

// Product
router.get("/ProductListBySlider", ProductController.ProductListBySlider);
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory);
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark);
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand);
router.get("/ProductDetailsID/:ProductID", ProductController.ProductDetailsID);
router.get("/ProductListByKeyword/:keyword", ProductController.ProductListByKeyword);
router.get("/ProductReviewListByID/:ProductID", ProductController.ReviewList);
router.get("/productFilterList", ProductController.productFilterList);

//Invoice & payment

router.get("/create-invoice", IsLoggedIn, InvoiceController.CreateInvoice);
router.get("/invoice-list", IsLoggedIn, InvoiceController.InvoiceList);
router.get("/invoice-productList/:invoiceId", IsLoggedIn, InvoiceController.InvoicesProductList);
router.post("/PaymentSuccess/:trxId", InvoiceController.PaymentSuccess);
router.post("/PaymentCancel/:trxId", InvoiceController.PaymentCancel);
router.post("/PaymentFail/:trxId", InvoiceController.PaymentFail);
router.post("/PaymentIPN/:trxId", InvoiceController.PaymentIPN);


// Feature API

router.post("/create-feature", FeatureController.createFeature);
router.get("/read-feature", FeatureController.readFeature);
router.post("/delete-feature/:id", FeatureController.deleteFeature);
router.get("/terms-condition/:type", FeatureController.termsAndCondition);


export default router;
