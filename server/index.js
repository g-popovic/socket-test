const http = require("http").createServer();
const SocketIO = require("socket.io");

const io = SocketIO(http, {
	cors: { origin: "*" }
});

io.on("connection", socket => {
	console.log("a user connected");

	socket.on("message", message => {
		console.log({ message, socket });
		io.emit("message", `${socket.id.substr(0, 2)}: ${message}`);
	});
});

http.listen(3001, () => {
	console.log("Running on port 30001");
});
