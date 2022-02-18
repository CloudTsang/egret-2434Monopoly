class NetaDeviceCurse  extends Device{
	public constructor(obj:any) {
		super(obj)
	}

	 /**使用时发生的效果 */
	public onUse(obj:TargetObj):any{
		if(!this.effect)return
		const effects = this.effect
		
	}
}