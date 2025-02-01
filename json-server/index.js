const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

const SECRET_KEY = "your_secret_key"; // Лучше хранить в .env
const TOKEN_EXPIRATION = "24h"; // Время жизни токена

// Имитация задержки запроса
server.use(async (req, res, next) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    next();
});

// Функция генерации токена
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: TOKEN_EXPIRATION,
    });
};

// Эндпоинт регистрации
server.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbPath = path.resolve(__dirname, "db.json");
        const db = JSON.parse(fs.readFileSync(dbPath, "UTF-8"));

        const { users = [] } = db;

        if (users.some((user) => user.email === email)) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), email, password: hashedPassword };

        users.push(newUser);
        db.users = users;
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        const token = generateToken(newUser);
        return res.status(201).json({ token, user: newUser });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Эндпоинт логина
server.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8")
        );
        console.log(email, password);
        const { users = [] } = db;
        console.log(users[0].email === email);
        const userFromDb = users.find((user) => user.email === email);

        if (!userFromDb) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            userFromDb.password
        );
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const token = generateToken(userFromDb);
        return res.json({ token, user: userFromDb });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.get("/profile", (req, res) => {
    try {
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8")
        );
        const { users = [] } = db;

        const user = users.find((user) => user.id === req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ id: user.id, email: user.email });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});
// Middleware проверки авторизации
server.use((req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "AUTH ERROR" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({ message: "Invalid token" });
    }
});

server.use(router);

server.listen(8000, () => {
    console.log("Server is running on port 8000");
});
