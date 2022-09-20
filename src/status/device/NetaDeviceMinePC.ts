class NetaDeviceMinePC extends PC {
	private counter:number
	public constructor(obj:any) {
		super(obj)
		this.counter = 5
	}

	public onHold(obj:TargetObj):any{
		if(this.counter <= 0){			
			return
		}
		this.counter -- 
		if(this.counter <= 0){			
			console.log("NetaDeviceMinePC : 矿机已失效")
			return
		}
		return super.onHold(obj)
	}
}