class MapEvent extends BaseObj{
	protected selections:SelectionObj[]
	protected className:string
	protected buffName:string
	protected log:string
	protected netas:any[]

	protected _mc:MainCharacter
	
	public constructor(obj:any) {
		// console.log(obj)
		super()
		this.name = obj['name']
		this.des = obj['des']
		this.iconUrl = obj['iconUrl']
		this.netas = []

		if(obj['evt']){
			for(let tmp of obj['evt']){
				const ty = tmp['type']
				switch(ty){
					case EffectType.SHOW_MENU:
						this.getSelections(tmp['data'])
						if(tmp['class']){						
							this.className = tmp['class']
						}else{
							this.className = 'CustomMenu'
						}
						break
					case EffectType.GET_BUFF:
						this.buffName = tmp['data']
						break
					case EffectType.GET_NETA:
						this.netas.push(tmp['data'])
						break
					case EffectType.SHOW_LOG:
						this.log = tmp['data']
						break
					default:
						break
				}
				
			}
		}
	}

	/**触发事件
	 * @param mc 当前角色
	 * @param cell 当前格子
	 */
	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		this._mc = mc
		if(mc && this.buffName){
			const bn = egret.getDefinitionByName(this.buffName)
			if(bn){
				const buff = new bn(mc)
				mc.getBuff(buff)
			}
		}

		if(this.className){
			let cn = egret.getDefinitionByName(this.className)
			let ep:EvtPanel
			if(this.selections){
				ep = new EvtPanel(new cn(this.selections), this.name, this.des, cell.getNpc(mc.npc))
			}else{
				ep = new EvtPanel(new cn(), this.name, this.des, cell.getNpc(mc.npc))
			}
			ep.addEventListener(GameEvents.ACTION_CONFIRM, this.onSelected, this)
			return ep
		}

		if(this.log){
			const lp = WorldMap.showEvtLog(this.log)
			lp.addEventListener("touchTap", this.onLogTap, this)
		}
		return null
	}

	protected onSelected(e:egret.Event){
		
	}

	protected onLogTap(e:egret.Event){
		const lp:EvtLog = e.currentTarget
		lp.removeEventListener("touchTap", this.onLogTap, this)
		lp.dispose()
		setTimeout(()=>{
			this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}, 200)
	}

	protected getSelections(obj:any){
		if(!obj){
			this.selections = []
			return
		}
		let s = []
		for(let tmp of obj){
			s.push(tmp)
		}
		this.selections = s
	}

	public dipose(){
		
	}
}

interface SelectionObj{
	selection:string
	sub?:string
	data?:any
	log?:string
	/**roll随机数事件 */
	roll?:any
	evt?:any
	disable?:boolean
}