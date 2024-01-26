const { SuccessResponse } = require('../core/success.response');
const ProductService = require('../services/product.service');
const ProductServiceV2 = require('../services/product.service.xxx');

class ProductController {
  createProduct = async (req, res, next) => {
    // new SuccessResponse({
    //   message: 'Create new Product success',
    //   metadata: await ProductService.createProduct(
    //     req.body.product_type,
    //     {
    //       ...req.body,
    //       product_shop: req.user.userId,
    //     }
    //   ),
    // }).send(res);

    new SuccessResponse({
      message: 'Create new Product success',
      metadata: await ProductServiceV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
  /**
   * @desc Get all Drafts for shop
   * @param {Number} limit
   * @param {Number} skip
   */
  // QUERY //
  getAllDraftsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list Draft success',
      metadata: await ProductServiceV2.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };
  // END QUERY //
}

module.exports = new ProductController();
