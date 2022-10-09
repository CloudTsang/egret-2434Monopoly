class Connection  {
	protected socket:WebSocket
	public constructor() {
		const s = new WebSocket("ws://127.0.0.1:8084/")
		s.onopen = this.onSocketOpen
		s.onmessage = this.onSocketMessage
	}

	protected onSocketOpen(this: WebSocket, ev: Event){
		this.send("hello")
	}

	protected onSocketMessage(this: WebSocket, ev: MessageEvent){
		console.log(ev.data)
	}
}
