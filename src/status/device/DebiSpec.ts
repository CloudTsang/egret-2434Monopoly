class DebiSpec  extends Device {
	public constructor(obj:any) {
		super(obj)
	}
	public onUse(obj:TargetObj):any{
		const mc:MainCharacter = obj.player
		
		if(!mc) return

		const dataStr:string = this.effect[0].data
		const dataStrArr:string[] = dataStr.split(',')
		
		let objarr:NpcObj[] = []
		for(let s of dataStrArr){
			const tmp = s.replace("{mc.npc.", "").split('}+')
			const ID:string = tmp[0]
			const num:number = mc.npc[ID] + parseFloat(tmp[1])
			const npc = Liver.allLivers.filter((v:BaseLiver)=>{return v.ID==ID})[0]
			if(!npc)continue
			const obj:NpcObj = {
				...npc,
				favor:num
			}
			objarr.push(obj)
		}
		this.showChangedNpc(objarr, 0, 3)
		
		// WorldMap.showNpcPanel()
		// this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
	}

	private showChangedNpc(arr:NpcObj[], from:number, to:number){
		let isLast = false
		if(to > arr.length){
			isLast = true
			to = arr.length
		}

		const arr2:NpcObj[] = arr.slice(from, to)
		const p = WorldMap.showNpcPanel(arr2)
		p.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, (e)=>{
			if(isLast){
				this.dispatchEvent(new egret.Event(GameEvents.DEVICE_FINISH))
			}else{
				this.showChangedNpc(arr, to, to+3)
			}
		}, this)
	}
}