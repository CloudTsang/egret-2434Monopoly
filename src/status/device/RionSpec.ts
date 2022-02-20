class RionSpec  extends Device {
	private _index:number
	private _mc:MainCharacter
	private _tgt:MainCharacter[]
	public constructor(obj:any) {
		super(obj)
	}

	public onUse(obj:TargetObj):any{
		const mc = obj.player
		const tgt = obj.tgtPlayer
		if(!mc || !tgt) return
		this._index = 0
		this._mc = mc
		this._tgt = tgt
		this.effectHandler()
	}

	private effectHandler(){
		if(this._index >= this._tgt.length){
			WorldMap.focusToPlayer(this._mc)
			this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
			return 
		}
		const tp = this._tgt[this._index]
		const tw = WorldMap.focusToPlayer(tp)
		if(tw){
			tw.wait(100)
			.call(()=>{
				tp.netaBag.lostNeta(NetaType.TALK)
				tp.netaBag.lostNeta(NetaType.TALK)
				tp.dispObj.showAttacked()
			})
			.wait(1000)
			.call(()=>{
				this._index ++
				this.effectHandler()
			})
		}else{
			this._index ++
			this.effectHandler()
		}
	}
}