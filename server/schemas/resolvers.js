const { User, Cart, Category, Product } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (_parent, _agrs, context) => {
            if (context.user) return User.findOne({ _id: context.user._id }).populate("cart").populate("items.productId");
            throw AuthenticationError;
        },
        getCart: async (_parent, {_id}) => {
            if (context.cart) return Cart.findById({ _id: _id }).populate("items.productId");
            throw AuthenticationError;
        },
        getProducts: async (_parent, {categoryId}) => {
            return Product.find({category: categoryId}).populate('category');
        },
        getProduct: async (_parent, {_id}) => {
            return Product.findById({_id}).populate("category");
        },
        getCategories: async () => {
            return Category.find();
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
        newCart: async (_parent, _args, context) => {
            try {
                const cart = await Cart.create({});
                let user = null;
                if (context.user) {
                    user = await User.findByIdAndUpdate(
                        context.user._id,
                        { cart: cart._id },
                        { new: true })
                        .populate("cart");
                }
                return { cart, user };
            } catch (error) {
                console.error("ERROR occurs while creating CART");
                throw new Error("Failed to create new card");
            }
        },
        addItemToCart: async (_parent, { productId, quantity }, context) => {
            try {
                const cart = await Cart.findByIdAndUpdate(
                    context.cart,
                    { $push: { items: { productId, quantity } } },
                    { new: true }
                );
                return cart;
            } catch (error) {
                console.error("ERROR occurs while adding ITEM to CART");
                throw new Error("Failed to add item to cart");
            }
        },
        removeItemFromCart: async (_parent, { productId }, context) => {
            try {
                const cart = await Cart.findByIdAndUpdate(
                    context.cart,
                    { $pull: { items: { productId } } },
                    { new: true }
                );
                return cart;
            } catch (error) {
                console.error("ERROR occurs while removing ITEM from CART");
                throw new Error("Failed to remove item from cart");
            }
        },
        updateCartItem: async (_parent, { productId, quantity }, context) => {
            try {
                const cart = await Cart.findOneAndUpdate(
                    { _id: context.cart, "items.productId": productId },
                    { $set: { "items.$.quantity": quantity } },
                    { new: true }
                );
                return cart;
            } catch (error) {
                console.error("ERROR occurs while updating ITEM in CART");
                throw new Error("Failed to update item in cart");
            }
        }
    }
}

module.exports = resolvers;