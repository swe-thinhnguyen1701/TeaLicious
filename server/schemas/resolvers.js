const { User, Cart, Category, Product } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (_parent, _agrs, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id });
                console.log("BACKEND USER :>>", user);
                return user;
            }
            throw AuthenticationError;
        },
        getCart: async (_parent, { _id }) => {
            return Cart.findById(_id);
        },
        getProducts: async (_parent, { categoryId }) => {
            return Product.find({ category: categoryId }).populate('category');
        },
        getProduct: async (_parent, { _id }) => {
            return Product.findById({ _id }).populate("category");
        },
        getCategories: async () => {
            const categories = await Category.find();
            return categories;
        }
    },

    Mutation: {
        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (_parent, { username, email, password }) => {
            try {
                const user = await User.findOne({ $or: [{ username }, { email }] });
                if (!user) throw AuthenticationError;

                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) throw AuthenticationError;

                const token = signToken(user);
                return { token, user };
            } catch (error) {
                console.error("ERROR occurs while loging");
                throw AuthenticationError;
            }
        },
        updateAddress: async (_parent, { street, city, state, zip }, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(context.user._id, { address: { street, city, state, zip } }, { new: true });
                return user;
            }
            throw AuthenticationError;
        },
        newCart: async (_parent, _args) => {
            try {
                const cart = await Cart.create({});
                return cart;
            } catch (error) {
                console.error("ERROR occurs while creating CART");
                throw new Error("Failed to create new cart");
            }
        },
        addItemToCart: async (_parent, { _id, productId, quantity }) => {
            try {
                const product = await Product.findById(productId);
                console.log(product.stock);

                if (quantity <= 0 || quantity > product.stock) {
                    throw new Error(`Invalid quantity. Quantity must be greater than 0 and not exceed available stock (${product.stock})`);
                } else {
                    const cart = await Cart.findOne(
                        { _id: _id }
                    );

                    let inCart = false;

                    const updatedItems = cart.items.map(item => {
                        if (item.productId == productId) {
                            inCart = true;
                            return {
                                productId: item.productId,
                                quantity: item.quantity + quantity
                            }
                        } else {
                            return item;
                        }
                    })

                    if(!inCart) {
                        updatedItems.push({ productId, quantity });
                    }


                    const updatedCart = await Cart.findByIdAndUpdate(
                        _id,
                        { $set: { items: updatedItems } },
                        { new: true }
                    );
    
                    if (!updatedCart) {
                        console.error("Cannot find cart id");
                        throw new Error("Cart not found");
                    }
    
                    return updatedCart;
                }


            } catch (error) {
                console.log(error)
                console.error("ERROR occurs while adding ITEM to CART");
                throw new Error("Failed to add item to cart");
            }
        },
        removeItemFromCart: async (_parent, { _id, productId }) => {
            try {
                const cart = await Cart.findByIdAndUpdate(
                    _id,
                    { $pull: { items: { productId } } },
                    { new: true }
                );
                return cart;
            } catch (error) {
                console.error("ERROR occurs while removing ITEM from CART");
                throw new Error("Failed to remove item from cart");
            }
        },
        updateCartItem: async (_parent, {_id, productId, quantity }, context) => {
            try {
                const cart = await Cart.findOne(
                    { _id: _id }
                );

                console.log(cart)

                const updatedItems = cart.items.map(item => {
                    console.log(item.productId + " vs " + productId)
                    if (item.productId == productId) {
                        console.log("is equals")
                        return {
                            productId: item.productId,
                            quantity: quantity
                        }
                    } else {
                        return item;
                    }
                })

                console.log(updatedItems)

                const updatedCart = await Cart.findOneAndUpdate(
                    { _id: _id },
                    { $set: { items: updatedItems } },
                    { new: true }
                );
                return updatedCart;
            } catch (error) {
                console.error("ERROR occurs while updating ITEM in CART");
                throw new Error("Failed to update item in cart");
            }
        },
        syncCart: async (_parent, { cartId }, context) => {

            if (!context.user) {
                console.log("CONTEXT :>>", context.user);
                return;
            }
            try {
                const user = await User.findById(context.user._id);

                if (!user.cart) {
                    await user.updateOne({ cart: cartId }, { new: true });
                }
                console.log(user);
                const updateUser = await User.findById(context.user._id);
                return updateUser;
            } catch (error) {
                console.error("ERROR occurs while syncing CART");
                throw new Error("Failed to sync cart");
            }
        }
    }
}

module.exports = resolvers;