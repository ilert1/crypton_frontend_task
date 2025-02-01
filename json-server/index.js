const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Имитация задержки запроса
server.use(async (req, res, next) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    next();
});

// Эндпоинт для регистрации
server.post("/register", (req, res) => {
    try {
        const { email, password } = req.body;
        const dbPath = path.resolve(__dirname, "db.json");
        const db = JSON.parse(fs.readFileSync(dbPath, "UTF-8"));

        const { users = [] } = db;

        if (users.some(user => user.email === email)) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = { id: Date.now(), email, password };
        users.push(newUser);
        db.users = users;

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        return res.status(201).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Эндпоинт для логина
server.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"));
        const { users = [] } = db;

        const userFromDb = users.find(user => user.email === email && user.password === password);

        if (userFromDb) {
            return res.json(userFromDb);
        }

        return res.status(403).json({ message: "Invalid credentials" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Проверяем, авторизован ли пользователь
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: "AUTH ERROR" });
    }
    next();
});

server.use(router);

server.listen(8000, () => {
    console.log("Server is running on port 8000");
});
