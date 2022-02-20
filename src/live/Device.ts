class Device extends Neta{
	protected _useable:boolean
	protected _trigger:boolean
	public target:string
	public constructor(obj:any) {
		super(obj)
		const data = obj['data']
		this._trigger = true
		this._useable = data['use']?data['use']:false
		this.target = data['tgt']?data['tgt']:EffectTarget.SELF
	}
	/**持有时发生的效果 */
	public onHold(obj:TargetObj):any{
		if(!this.effect)return
		if(!this._trigger)return
		const effects = this.effect
		for(let ef of effects){
			if(ef['trigger'] != 'hold')continue
			if(ef['req']){
				const cr = this.checkReq(ef['req'], obj)
				if(!cr) continue
			}
			this.handle(ef.type, ef.data, obj)
		}
	}

	public onUse(obj:TargetObj):any{
		super.onUse(obj)
		this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
	}

	public get useable(){
		return this._useable
	}

	public get trigger(){
		return this._trigger
	}
	public set trigger(v:boolean){
		this._trigger = v
	}
}

class PC extends Device{
	public constructor(obj:any) {
		super(obj)
	}
}