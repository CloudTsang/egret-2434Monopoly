class EventSpecial extends MapEvent{
	private _curEvent:MapEvent
	public constructor(obj:any) {
		super(obj)
	}

	private cleanCurEvent(){
		if(!this._curEvent){
			return 
		}
		this._curEvent.removeEventListener(GameEvents.EVENT_START, this.onEvent, this)
		this._curEvent.removeEventListener(GameEvents.EVENT_FINISH, this.onEvent, this)
		this._curEvent.dipose()
		this._curEvent = null
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		this.cleanCurEvent()
		const jsonArr = ['events_real_2_json']
		let i = Math.floor(Math.random()*jsonArr.length)
		const objs:any[] = RES.getRes(jsonArr[i])
		i = Math.floor(Math.random()*objs.length)
		const obj = objs[2]
		let fn = MapEvent
		
		if(obj['class']) fn = egret.getDefinitionByName(obj['class'])
		this._curEvent = new fn(obj)
		this._curEvent.addEventListener(GameEvents.EVENT_START, this.onEvent, this)
		this._curEvent.addEventListener(GameEvents.EVENT_FINISH, this.onEvent, this)
		return this._curEvent.trigger(mc,  cell) 
		
	}

	private onEvent(e:egret.Event){
		this.dispatchEvent(e)
	}
}