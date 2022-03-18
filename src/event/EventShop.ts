class EventShop  extends MapEvent{
	protected store:NetaBag
	protected panel:EvtPanelShop
	public constructor(obj:any) {
		super(obj)
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanelShop|IDisposable{
		this._mc = mc
		this.createStore()
		const strigger = mc.checkIfSkillsTriggered(GamePhrase.GO_SHOPPING, Roll.random3())
		strigger.triggerBag(this.store)
		const ep = new EvtPanelShop(this._mc, this.name, this.des, this.store, PanelType.SHOP)
		ep.addEventListener(GameEvents.MENU_CANCEL, this.onCancel, this)
		ep.addEventListener(GameEvents.NETA_CONFIRM, this.onBuy, this)
		this.panel = ep
		return ep
	}

	protected onBuy(e:egret.Event){
		const n:Neta = e.data.neta
		if(!n) return
		this._mc.netaBag.modifyNeta(n, 'get')
		const obj:INetaSelectObj = {
			neta:n,
			selected:false,
			holded:true
		}
		this._mc.money -= n.value
		this.panel.refresh(obj)
	}

	protected createStore(){
		const nb:NetaBag = new NetaBag()
		const jsonFile = ['netas_game_1_json','netas_song_1_json','device_1_json']
		for(let jsonu of jsonFile){
			const arr = RES.getRes(jsonu)
			if(!arr)continue
			for(let obj of arr){
				const n = NetaFactory.getNetaFromObj(obj)
				const np = nb.modifyNeta(n, 'get', false, 1, false)
			}
		}
		this.store = nb
	}

	protected onCancel(e){
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
	}
}

class EventShop2  extends EventShop{
	public constructor(obj:any) {
		super(obj)
	}

	protected createStore(){
		const nb:NetaBag = new NetaBag()
		const jsonFile = ['device_2_json']
		for(let jsonu of jsonFile){
			const arr = RES.getRes(jsonu)
			if(!arr)continue
			for(let obj of arr){
				const n = NetaFactory.getNetaFromObj(obj)
				nb.modifyNeta(n, 'get', false, 1, false)
			}
		}
		this.store = nb
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanelShop|IDisposable{
		this._mc = mc
		this.createStore()
		const ep = new EvtPanelShop(this._mc, this.name, this.des, this.store, PanelType.SHOP)
		ep.addEventListener(GameEvents.MENU_CANCEL, this.onCancel, this)
		ep.addEventListener(GameEvents.NETA_CONFIRM, this.onBuy, this)
		this.panel = ep
		return ep
	}
}