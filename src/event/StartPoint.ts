class StartPoint extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}

	protected onLogTap(e:egret.Event){
		const lp:EvtLog = e.currentTarget
		lp.removeEventListener("touchTap", this.onLogTap, this)
		lp.dispose()
		this._mc.money += this._mc.income
		const neta = NetaFactory.getNetaFromObj(this.netas[0])
		const ngp = this._mc.netaBag.modifyNeta(neta, 'get', true)
		ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}, this	)
	}


	


}