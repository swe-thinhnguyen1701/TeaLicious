/**
 * GraphQL Resolvers for handling queries and mutations.
 * 
 * This file defines resolvers for the queries and mutations used in the GraphQL API.
 * It includes functionality for user authentication, cart management, product operations, and checkout.
 * 
 * @module resolvers
 * 
 * @description
 * - **Query Resolvers**:
 *   - `me`: Retrieves the currently authenticated user.
 *   - `getCart`: Fetches a cart by its ID.
 *   - `getProducts`: Fetches products by category ID.
 *   - `getProduct`: Fetches a single product by its ID.
 *   - `getCategories`: Retrieves all product categories.
 *   - `getCheckout`: Initiates a Stripe checkout session for a cart.
 * 
 * - **Mutation Resolvers**:
 *   - `addUser`: Creates a new user and returns an authentication token.
 *   - `login`: Authenticates a user and returns an authentication token.
 *   - `updateAddress`: Updates the address of the currently authenticated user.
 *   - `newCart`: Creates a new cart.
 *   - `addItemToCart`: Adds an item to a specified cart.
 *   - `removeItemFromCart`: Removes an item from a specified cart.
 *   - `updateCartItem`: Updates the quantity of an item in a specified cart.
 *   - `syncCart`: Syncs a guest cart with the user's cart and updates the user cart.
 *   - `removeCart`: Removes a cart, updates product stock, and assigns a new cart to the user.
 * 
 * @example
 * // Example usage of the resolvers in a GraphQL server setup:
 * const { ApolloServer } = require('apollo-server');
 * const { typeDefs } = require('./schema');
 * const { resolvers } = require('./resolvers');
 * 
 * const server = new ApolloServer({ typeDefs, resolvers });
 * server.listen().then(({ url }) => {
 *   console.log(`Server ready at ${url}`);
 * });
 */

const { User, Cart, Category, Product } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const resolvers = {
    Query: {
        /**
         * Retrieves the currently authenticated user.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} _args - Arguments passed to the query, not used.
         * @param {Object} context - The context object, containing the current user.
         * @returns {Promise<User>} The authenticated user.
         * @throws {GraphQLError} If the user is not authenticated.
         */
        me: async (_parent, _agrs, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate("cart");
                return user;
            }
            throw AuthenticationError;
        },

        /**
         * Fetches a cart by its ID.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the query, including cart ID.
         * @param {ID} args._id - The ID of the cart to fetch.
         * @returns {Promise<Cart>} The cart with the specified ID.
         */
        getCart: async (_parent, { _id }) => {
            if(_id === null) return;
            return Cart.findById(_id);
        },

        /**
         * Fetches products by category ID.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the query, including category ID.
         * @param {ID} args.categoryId - The ID of the category to fetch products for.
         * @returns {Promise<Product[]>} List of products in the specified category.
         */
        getProducts: async (_parent, { categoryId }) => {
            return Product.find({ category: categoryId }).populate('category');
        },

        /**
         * Fetches a single product by its ID.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the query, including product ID.
         * @param {ID} args._id - The ID of the product to fetch.
         * @returns {Promise<Product>} The product with the specified ID.
         */
        getProduct: async (_parent, { _id }) => {
            return Product.findById({ _id }).populate("category");
        },

        /**
         * Retrieves all product categories.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} _args - Arguments passed to the query, not used.
         * @returns {Promise<Category[]>} List of all categories.
         */
        getCategories: async () => {
            const categories = await Category.find();
            return categories;
        },

         /**
         * Initiates a Stripe checkout session for a cart.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the query, including cart ID.
         * @param {ID} args.cartId - The ID of the cart to create a checkout session for.
         * @param {Object} context - The context object, containing request headers.
         * @returns {Promise<Checkout>} The checkout session ID.
         * @throws {Error} If the cart is not found or fails to create a session.
         */
        getCheckout: async (_parent, { cartId }, context) => {
            const url = new URL(context.headers.referer).origin;

            const cart = await Cart.findById(cartId);

            if (!cart) {
                throw new Error("Cart not found with given ID");
            }

            const productList = [];
            for (const item of cart.items) {
                const product = await Product.findById(item.productId);
                product.quantity = item.quantity;
                productList.push(product);
            }

            const line_items = [];
            for (const product of productList) {
                line_items.push({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            description: product.description,
                            images: [product.image]
                        },
                        unit_amount: product.price * 100
                    },
                    quantity: product.quantity
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items,
                mode: "payment",
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id }
        }
    },

    Mutation: {
         /**
         * Creates a new user and returns an authentication token.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including user details.
         * @param {String} args.username - The username of the new user.
         * @param {String} args.email - The email address of the new user.
         * @param {String} args.password - The password for the new user.
         * @returns {Promise<Auth>} The authentication token and user details.
         */
        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        /**
         * Authenticates a user and returns an authentication token.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including login credentials.
         * @param {String} [args.username] - The username for login.
         * @param {String} [args.email] - The email for login.
         * @param {String} args.password - The password for login.
         * @returns {Promise<Auth>} The authentication token and user details.
         * @throws {GraphQLError} If authentication fails.
         */
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

        /**
         * Updates the address of the currently authenticated user.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including address details.
         * @param {String} [args.street] - The street address.
         * @param {String} [args.city] - The city.
         * @param {String} [args.state] - The state.
         * @param {String} [args.zip] - The zip code.
         * @param {Object} context - The context object, containing the current user.
         * @returns {Promise<User>} The updated user with the new address.
         * @throws {GraphQLError} If the user is not authenticated.
         */
        updateAddress: async (_parent, { street, city, state, zip }, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(context.user._id, { address: { street, city, state, zip } }, { new: true });
                return user;
            }
            throw AuthenticationError;
        },

        /**
         * Creates a new cart.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} _args - Arguments passed to the mutation, not used.
         * @returns {Promise<Cart>} The newly created cart.
         * @throws {Error} If the cart creation fails.
         */
        newCart: async (_parent, _args) => {
            try {
                const cart = await Cart.create({});
                return cart;
            } catch (error) {
                console.error("ERROR occurs while creating CART");
                throw new Error("Failed to create new cart");
            }
        },

        /**
         * Adds an item to a specified cart.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including cart ID, product ID, and quantity.
         * @param {ID} args._id - The ID of the cart to update.
         * @param {ID} args.productId - The ID of the product to add.
         * @param {Number} args.quantity - The quantity of the product to add.
         * @returns {Promise<Cart>} The updated cart.
         * @throws {Error} If the product quantity is invalid or cart update fails.
         */
        addItemToCart: async (_parent, { _id, productId, quantity }) => {
            try {
                const product = await Product.findById(productId);

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

                    if (!inCart) {
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
                console.error("ERROR occurs while adding ITEM to CART");
                console.log(error);
                throw new Error("Failed to add item to cart");
            }
        },

         /**
         * Removes an item from a specified cart.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including cart ID and product ID.
         * @param {ID} args._id - The ID of the cart to update.
         * @param {ID} args.productId - The ID of the product to remove.
         * @returns {Promise<Cart>} The updated cart.
         * @throws {Error} If the cart update fails.
         */
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

        /**
         * Updates the quantity of an item in a specified cart.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including cart ID, product ID, and quantity.
         * @param {ID} args._id - The ID of the cart to update.
         * @param {ID} args.productId - The ID of the product to update.
         * @param {Number} args.quantity - The new quantity of the product.
         * @param {Object} context - The context object, containing the current user.
         * @returns {Promise<Cart>} The updated cart.
         * @throws {Error} If the cart update fails.
         */
        updateCartItem: async (_parent, { _id, productId, quantity }, context) => {
            try {
                const cart = await Cart.findOne(
                    { _id: _id }
                );

                const updatedItems = cart.items.map(item => {
                    if (item.productId == productId) {
                        return {
                            productId: item.productId,
                            quantity: quantity
                        }
                    } else {
                        return item;
                    }
                });

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

        /**
         * Syncs a guest cart with the user's cart and updates the user cart.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including cart ID.
         * @param {ID} args.cartId - The ID of the guest cart to sync with the user's cart.
         * @param {Object} context - The context object, containing the current user.
         * @returns {Promise<User>} The updated user with the synced cart.
         * @throws {Error} If the cart sync fails.
         */
        syncCart: async (_parent, { cartId }, context) => {

            if (!context.user) {
                return;
            }

            try {
                const user = await User.findById(context.user._id);
                const userCart = await Cart.findById(user.cart);
                const cart = await Cart.findById(cartId);

                if(userCart.items.length === 0){
                    user.cart = cart._id;
                    await user.save();
                    return user;
                }

                const map = new Map();
                for(const item of userCart.items){
                    map.set(item.productId, item.quantity);
                }

                for(const item of cart.items){
                    if(!map.has(item.productId)){
                        map.set(item.productId, item.quantity);
                    }
                }
                const updatedItems = Array.from(map).map(([productId, quantity]) => ({ productId, quantity }));
                cart.items = updatedItems;
                await cart.save();

                await Cart.findByIdAndDelete(cartId);

                const updateUser = await User.findById(context.user._id);
                return updateUser;
            } catch (error) {
                console.error("ERROR occurs while syncing CART");
                throw new Error("Failed to sync cart");
            }
        },

        /**
         * Removes a cart, updates product stock, and assigns a new cart to the user.
         * 
         * @param {Object} _parent - The parent object, not used.
         * @param {Object} args - Arguments passed to the mutation, including cart ID.
         * @param {ID} args.cartId - The ID of the cart to remove.
         * @param {Object} context - The context object, containing the current user.
         * @returns {Promise<Object>} Success status and the ID of the new cart.
         * @throws {Error} If the cart removal fails.
         */
        removeCart: async (_parent, { cartId }, context) => {
            try {
                const newCart = await Cart.create({});
                const newCartId = newCart._id;
                if (context.user) {
                    await User.findByIdAndUpdate(context.user._id, { cart: newCartId });
                }
                
                const cart = await Cart.findById(cartId);
                
                for (const item of cart.items) {
                    const product = await Product.findById(item.productId);
                    product.stock -= item.quantity;
                    await product.save();
                }
                await cart.deleteOne();

                return { success: true, message: "Cart is removed", newCartId: newCartId };
            } catch (error) {
                console.log("ERROR occurs while removing CART", error);
                throw new Error("Failed to remove cart");
            }
        },
    }
}

module.exports = resolvers;