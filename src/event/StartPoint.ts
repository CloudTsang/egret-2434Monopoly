class StartPoint extends MapEvent{
	public constructor(obj:any) {
		super(obj)
	}

	protected onLogTap(e:egret.Event){
		const lp:EvtLog = e.currentTarget
		if(lp){
			lp.removeEventListener("touchTap", this.onLogTap, this)
			lp.dispose()
		}
		try{
			this._mc.money += this._mc.income
			const neta = NetaFactory.getNetaFromObj(this.netas[0])
			const ngp = this._mc.netaBag.modifyNeta(neta, 'get', true)
			ngp && ngp.once(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			}, this	)
		}catch(err){
			console.log(err)
		}
		
	}


	


}