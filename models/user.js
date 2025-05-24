const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nom: String,
    prenom: { type: String, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ['admin', 'client'] },
    age: Number,
    user_image: String,
    isActive: { type: Boolean, default: false },  // Valeur par défaut pour isActive
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }

}, { timestamps: true });

// Middleware pour hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Si le mot de passe n'est pas modifié, on continue

    try {
        const salt = await bcrypt.genSalt(10);  // Génère un salt
        this.password = await bcrypt.hash(this.password, salt);  // Hache le mot de passe
        this.isActive = false;  // Définir isActive à false lors de la création du compte
        next();
    } catch (error) {
        next(error);  // En cas d'erreur, on passe à l'erreur suivante
    }
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;