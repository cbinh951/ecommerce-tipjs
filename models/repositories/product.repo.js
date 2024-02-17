const { result } = require('lodash');
const {
  product,
  electronic,
  clothing,
  furniture,
} = require('../../models/product.model');
const { Types } = require('mongoose');
const { getSelectData, unGetSelectData } = require('../../ultis');

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const findAllPublishForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip });
};

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

const publishProductByShop = async ({ product_shop, product_id }) => {
  // ERROR
  // const foundShop = await product.findOne({
  //   product_shop: new Types.ObjectId(product_shop),
  //   _id: new Types.ObjectId(product_id),
  // });
  // if (!foundShop) return null;

  // foundShop.isDraft = false;
  // foundShop.isPublished = true;
  // const { modifiedCount } = await foundShop.update(foundShop);
  // return modifiedCount;
  const updatedProduct = await product.findOneAndUpdate(
    {
      product_shop: new Types.ObjectId(product_shop),
      _id: new Types.ObjectId(product_id),
    },
    {
      $set: {
        isDraft: false,
        isPublished: true,
      },
    },
    { new: true } // to return the updated document
  );

  if (!updatedProduct) return null;

  return updatedProduct;
};

const unPublishProductByShop = async ({ product_shop, product_id }) => {
  const updatedProduct = await product.findOneAndUpdate(
    {
      product_shop: new Types.ObjectId(product_shop),
      _id: new Types.ObjectId(product_id),
    },
    {
      $set: {
        isDraft: true,
        isPublished: false,
      },
    },
    { new: true } // to return the updated document
  );

  if (!updatedProduct) return null;

  return updatedProduct;
};

const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const results = await product
    .find(
      {
        isPublished: true,
        $text: { $search: regexSearch },
      },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean();
  return results;
};

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean();

  return products;
};

const findProduct = async ({ product_id, unSelect }) => {
  return await product.findById(product_id).select(unGetSelectData(unSelect));
};

const updateProductById = async ({
  productId,
  bodyUpdate,
  model,
  isNew = true,
}) => {
  return await model.findByIdAndUpdate(productId, bodyUpdate, {
    new: isNew,
  });
};

module.exports = {
  findAllDraftsForShop,
  findAllPublishForShop,
  publishProductByShop,
  unPublishProductByShop,
  searchProductByUser,
  findAllProducts,
  findProduct,
  updateProductById,
};
