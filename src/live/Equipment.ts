class Equipment extends Neta{
	protected _isEquiped:boolean
	protected _trigger:boolean
	public constructor(obj:any) {
		super(obj)
		this._isEquiped = false
		this._trigger = true
	}

	/**持有时发生的效果 */
	public onHold(obj:TargetObj):any{
		if(!this.effect)return
		if(!this._trigger)return
		if(!this._isEquiped)return
		const effects = this.effect
		for(let ef of effects){
			if(ef['req']){
				const cr = this.checkReq(ef['req'], obj)
				if(!cr) continue
			}
			console.log(`${this.name} 发动效果`)
			this.handle(ef.type, ef.data, obj)
		}
	}

	public get isEquipped(){
		return this._isEquiped
	}
	public set isEquipped(v:boolean){
		this._isEquiped = v
	}
	public get trigger(){
		return this._trigger
	}
	public set trigger(v:boolean){
		this._trigger = v
	}
}

class PC extends Equipment{
	public constructor(obj:any) {
		super(obj)
	}
}