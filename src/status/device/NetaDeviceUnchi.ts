class NetaDeviceUnchi extends Device{
	/**变干记数 */
	public counter:number 
	public constructor(obj:any) {
		super(obj)
		this.counter = 0
	}

	public set times(v:number){
		//刷新
		this.counter = 0
		this._times = v
	}

	public get times(){
		return this._times
	}
} 