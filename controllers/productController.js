const Product = require("../models/productSchema");
const UserModel = require("../models/userSchema"); // Assure-toi que ce fichier existe et est correct

module.exports.getAllProducts = async (req, res) => {
  try {
    const listProduct = await Product.find();
    res.status(200).json({ listProducts: listProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const addedProduct = new Product({
      name,
      description,
      price,
      imageUrl,
    });
    await addedProduct.save();
    res.status(200).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    await UserModel.updateMany({}, { $pull: { products: id } });

    res.status(200).json("Product deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.UpdateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock, available } = req.body;

    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    await Product.findByIdAndUpdate(id, {
      $set: { name, price, description, category, stock, available },
    });

    res.status(200).json("Product updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCountProduct = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.status(200).json({ totalProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductOwner = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("owner", "name email")
      .populate("category", "name description")
      .populate("supplier", "name contact");

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addProductWithOwner = async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, available, owner } =
      req.body;

    // Création du produit
    const addedProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      stock,
      available,
    });

    // Sauvegarde du produit
    await addedProduct.save();

    // Ajout du produit à l'utilisateur (propriétaire)
    await UserModel.findByIdAndUpdate(owner, {
      $push: { products: addedProduct._id },
    });

    res.status(201).json({ message: "Product added successfully with owner." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
