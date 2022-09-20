class NetaSelectPanel extends egret.Sprite{
	private _width:number;
	private _height:number;

	protected _closebtn:egret.Bitmap;

	protected _panel:egret.Sprite;

	protected _tabs:Tab[];
	protected _tabWidth:number;
	protected _curTab:number;

	protected _list:ItemList

	protected _shadowFilter:egret.DropShadowFilter
	protected _ty:PanelType
	protected _ty2:string
	protected _store:NetaBag
	protected _store2:NetaBag

	private tmpNetasList:{[key:number]:INetaSelectObj[]}
	/**
	 * neta列表菜单
	 * @param store neta集合对象
	 * @param t 列表用处
	 * @param t2 t是直播列表时的直播类型
	 * @param store2 用于商店菜单时传入，玩家的neta库用于对比持有数
	 */
	public constructor(store:NetaBag, t:PanelType, t2:string, w:number, h:number, store2:NetaBag=null) {
		super();
		this._width = w
		this._height = h
		this._ty = t
		this._ty2 = t2
		this._store = store
		this._store2 = store2
		this.touchEnabled = true
		this.tmpNetasList = []
		
		let curY = this.createTabs();
		curY = this.createPanel(curY);
		
		this.createList();
		// this.addEventListener( ItemList.ITEM_SELECTED, this.onItemSelected, this)
		// this._shadowFilter = new egret.DropShadowFilter(10,45,null,0.5)
		// this.filters = [this._shadowFilter]
		const ty = this._tabs[this._curTab].type
		const netas = this.getList(ty)//this._store.filterNetas2Select(this._tabs[0].type)
		this._list.setMultiSelection(!(ty == NetaType.GAME || ty == NetaType.PRESENT))
		
		this._list.setData(netas)

		let cb = new egret.Bitmap()
		cb.texture = RES.getRes("icons_json#close")
		cb.width = 60
		cb.height = 60
		cb.x = this._width - cb.width
		cb.touchEnabled = true
		cb.addEventListener("touchTap", this.onCancel, this)
		this.addChild(cb)
		this._closebtn = cb
	}

	protected createTabs(y:number=0){
		let tabArr:any[]
		switch(this._ty){
			case PanelType.STREAM:
				switch(this._ty2){
					case StreamType.GAME:
						tabArr = [
							NetaType.GAME,
							NetaType.TALK,
							NetaType.SPEC
						]
						break;
					case StreamType.SING:
						tabArr = [
							NetaType.SONG,
							NetaType.SPEC
						]
						break;
					case StreamType.TALK:
						tabArr = [
							NetaType.TALK,
							NetaType.SPEC
						]
						break;
					case StreamType.PRESENT:
						tabArr = [
							NetaType.PRESENT,
							NetaType.SPEC
						]
						break;
				}
				break
			case PanelType.SHOP:
				tabArr = [
					NetaType.GAME,
					NetaType.SONG,
					NetaType.DEVICE,
					NetaType.EQUIPMENT
				]
				break
			case PanelType.SHOP2:
				tabArr = [
					NetaType.DEVICE
				]
				break
			case PanelType.NORMAL:
				tabArr = [
					NetaType.TALK,
					NetaType.GAME,
					NetaType.SONG,
					NetaType.PRESENT,
					NetaType.SPEC,
					NetaType.DEVICE,
					NetaType.EQUIPMENT
				]
				break
			case PanelType.EQUIPMENT:
				tabArr = [
					NetaType.EQUIPMENT
				]
				break
			
		}
		const tabsWid = this._width / tabArr.length
		let tabs:Tab[] = []
		for(let i=0;i<tabArr.length;i++){
			let t:Tab;
			t = new Tab(tabsWid, i , tabArr[i])
			t.x = i*t.width
			t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this);
			this.addChild(t)
			tabs.push(t)
		}
		this._tabs = tabs
		this._tabWidth = tabs[0].width
		this._curTab = 0;
		tabs[0].setSelected(true)
		return tabs[0].width
	}

	protected createPanel(y:number=0){
		let p = new egret.Sprite()
		p.graphics.beginFill(0x000000, 0.9)
		p.graphics.drawRoundRect(0,y,this._width,this._height-y, 50)
		p.graphics.endFill()
		this._panel = p
		this.addChild(this._panel)
		return this._height
	}

	protected createList(){
		const w = this._width
		let l = new ItemList(this._ty)
		l.width = w
		l.height = this._height -this._tabWidth
		l.y = this._tabWidth
		this.addChild(l)
		this._list = l
	}

	protected onTabSelected(e:egret.TouchEvent){
		const t = e.currentTarget as Tab;
		this.switchTab(t)
	}

	protected switchTab(t:Tab){
		const ct = this._tabs[this._curTab]
		if(ct==t){
			return;
		}
		if(ct){
			ct.setSelected(false)
		}
		this._curTab = t.index;
		t.setSelected(true)

		const ty = this._tabs[this._curTab].type
		const netas = this.getList(ty)//this._store.filterNetas2Select(this._tabs[0].type)
		this._list.setMultiSelection(!(ty == NetaType.GAME || ty == NetaType.PRESENT))
		this._list.setData(netas)
	}

	public refresh(obj:INetaSelectObj){
		const ty = this._tabs[this._curTab].type
		if(obj.neta.type != ty)return
		const list = this.tmpNetasList[ty]
		for(let i=0; i<list.length; i++){
			if(list[i].neta.name == obj.neta.name){
				list[i] = obj
				break
			}
		}
		this._list.refreshItem(obj)
		// this._list.setData(list, false)
	}

	private getList(ty:NetaType, isrefresh:boolean=false):INetaSelectObj[]{
		if(this.tmpNetasList[ty] && !isrefresh){
			return this.tmpNetasList[ty]
		}else{
			let list 
			if(this._ty == PanelType.SHOP || this._ty == PanelType.SHOP2){
				list = this._store.filterNeta2Shop(ty, this._store2)
			}else{
				list = this._store.filterNetas2Select(ty)
			}
			this.tmpNetasList[ty] = list
			return list
		}
	}

	public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): any{
		if(type == ItemList.ITEM_SELECTED){
			this._list.addEventListener(type, listener, thisObject, useCapture, priority)
		}else{
			super.$addListener(type, listener, thisObject, useCapture, priority)
		}
		
	}

	public dispose(){
		for(let t of this._tabs){
			t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this);
		}
		this._closebtn.removeEventListener("touchTap", this.onCancel, this)
	}

	protected onCancel(e:any){
		this.dispatchEvent(new egret.Event(GameEvents.MENU_CANCEL))
	}
}