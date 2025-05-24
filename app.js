const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const app = express();



// Charger les variables d'environnement
dotenv.config();

// Créer un serveur HTTP
const server = http.createServer(app);

// Importer les routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usersRouter");
const osRouter = require("./routes/osRouter");
const productRouter = require("./routes/productRouter"); // Correction ici

// Utiliser les middlewares
app.use(cors());
app.use(express.json());

// Charger la configuration de la base de données (par exemple, MongoDB)
require('./config/db');

// Définir les routes
app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/os", osRouter);
app.use("/products", productRouter); // Correction ici



// Démarrer le serveur
const PORT = process.env.PORT || 5004;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`); // Correction ici
});
