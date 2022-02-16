class ElfMori extends MapEvent {
	public constructor(obj:any) {
		super(obj)
	}

	protected onSelected(e:egret.Event){
		const index:number = e.data.index
		switch(index){
			case 0:
				this.onFire()
				break
			case 1:
				this.onDonguri()
				break
			case 2:
				if(this._mc.npc['elu'] > 0.5) this._mc.npc['elu'] -= 0.5
				else this._mc.npc['elu'] = 0
				this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
				break
		}
	}

	private onFire(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const mc = this._mc
		const data = this.selections[0].data[0].data
		const n = NetaFactory.getNetaFromObj(data)

		if(mc.npc['elu'] > 2) this._mc.npc['elu'] -= 2
		else mc.npc['elu'] = 0

		const np = mc.netaBag.modifyNeta(n, 'get', true)
		np.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}, this)
	}

	private onDonguri(){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_START))
		const mc = this._mc
		const data = this.selections[1].data[0].data
		const n = NetaFactory.getNetaFromObj(data)

		const np = mc.netaBag.modifyNeta(n, 'get', true)
		np.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}, this)

	}
}