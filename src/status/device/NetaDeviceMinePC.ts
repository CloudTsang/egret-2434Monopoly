class NetaDeviceMinePC extends Device {
	private counter:number
	public constructor(obj:any) {
		super(obj)
		this.counter = 3
	}

	public onHold(obj:TargetObj):any{
		if(this.counter <= 0){
			return
		}
		this.counter -- 
		return super.onHold(obj)
	}
}