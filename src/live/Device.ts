class Device extends Neta{
	protected _useable:boolean	
	public constructor(obj:any) {
		super(obj)
		const data = obj['data']
		this._useable = data['use']?data['use']:false
	}
	/**持有时发生的效果 */
	public onHold(obj:TargetObj):any{
		if(!this.effect)return
		const effects = this.effect
		for(let ef of effects){
			if(ef['trigger'] != 'hold')continue
			if(ef['req']){
				const cr = this.checkReq(ef['req'], obj)
				if(!cr) continue
			}
			console.log(this.name)
			this.handle(ef.type, ef.data, obj)
		}
	}

	public get useable(){
		return this._useable
	}
}