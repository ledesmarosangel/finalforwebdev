import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";

export async function findAllProducts() {
    return Product.find().exec();
}

export default async function handle(req, res) {
    await initMongoose();
    const { ids } = req.query;

    if (ids) {
        const idsArray = ids.split(','); // Split the comma-separated IDs into an array
        res.json(
            await Product.find({
                '_id': { $in: idsArray } // Use the $in operator to filter by multiple IDs
            }).exec()
        );
    } else {
        res.json(await findAllProducts()); // If no IDs are provided, return all products
    }
}
