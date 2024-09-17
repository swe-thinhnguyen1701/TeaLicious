//weight unit is ounce (oz) and we will start with 4oz is 12 dollars 
const db = require("./db-connection");
const s3Client = require("./aws-connection");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Product, Category } = require("../models");

const TEA_DATA = require('./teadata.json');
const CATEGORY = [
    { name: "black" },
    { name: "green" },
    { name: "oolong" },
    {  name: "white"}
];

if (!TEA_DATA) {
    console.error("missing TEA DATA");
    return 1;
}

db.once("open", async () => {
    // Clean up old database if exist
    try {
        await Product.deleteMany({});
        await Category.deleteMany({});

        const categories = await Category.insertMany(CATEGORY);
        const categoryMap = new Map(categories.map(cat => [cat.name, cat._id]));

        for (let product of TEA_DATA) {
            const key = `${product.name.replace(/ /g, "-")}.webp`;
            const imgUrl = `https://d2vjaadplvjxj2.cloudfront.net/${key}`;
            // const command = new GetObjectCommand(
            //     {
            //         Bucket: process.env.AWS_BUCKET_NAME,
            //         Key: key
            //     }
            // );
            // const imgUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            const categoryId = categoryMap.get(product.category);

            product.image = imgUrl;
            product.category = categoryId;
        }

        await Product.insertMany(TEA_DATA);
        console.log("SEED DATA SUCCESS");
        
        process.exit(0);
    } catch (error) {
        console.error("ERROR occurs while setting database");
        console.log(error);
        process.exit(1);
    }
});