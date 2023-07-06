import { useEffect, useState } from "react";
import { socket } from "./socketUtil";

function App() {
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		socket.on("connect", () => setIsConnected(true));
		socket.on("disconnect", () => setIsConnected(false));
		socket.on("message", onMessage);

		return () => {
			socket.off("connect"); // add func
			socket.off("disconnect"); // add func
			socket.off("message", onMessage);
		};
	}, []);

	function onMessage(message) {
		setMessages(prevVal => [...prevVal, message]);
	}

	function onClickSend() {
		socket.emit("message", value);
		setValue("");
	}

	return (
		<div>
			<h1>Hello World</h1>
			<p>{isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>

			<h4>History:</h4>

			{messages.map(message => (
				<p>{message}</p>
			))}

			<input
				placeholder='Your message'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button onClick={onClickSend}>Send</button>
		</div>
	);
}

export default App;
