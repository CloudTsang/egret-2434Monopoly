class ItemList extends eui.Component{
	public static readonly ITEM_SELECTED:string = 'ITEM_SELECTED'
	private itemListContainer:eui.List
	private itemListScroller:eui.Scroller

	protected rawdata:INetaSelectObj[];
	protected collectdata:eui.ArrayCollection

	private _itemHeight:number = -1
	private _ty:PanelType
	private _mulSel:boolean
	public constructor(ty:PanelType) {
		super();
		this.touchEnabled = true
		this._mulSel = true
		this._ty = ty
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = 'resource/eui_skins/itemlist.exml'
	}

	public setMultiSelection(v:boolean){
		this._mulSel = v
	}

	public setData(d:INetaSelectObj[], refresh:boolean=true){
		this.rawdata = d
		if(refresh){
			this.refreshList()
		}else{
			this.collectdata.replaceAll(d)
		}
		
		return this.itemListContainer.selectedItem
	}

	public selectItem(i:1|-1){
		const container = this.itemListContainer
		const newi = container.selectedIndex + i
		
		if(newi <= -1){
			return null
		}else if(newi >= this.collectdata.length){
			return null
		}
		if(this._itemHeight == -1){
			const li = container.getChildAt(0);
			if(li){
				this._itemHeight = li.height
			}
		}
		container.selectedIndex = newi
		
		const cn = container.numChildren;
	
		if(i == 1){
			if(newi+1 > (container.getChildAt(cn-1) as ItemListObj).itemIndex){
				container.scrollV += this._itemHeight
			}
		}else{
			if(newi == 0){
				container.scrollV=0
			}
			else if(container.scrollV > 0 && newi-1 < (container.getChildAt(0) as ItemListObj).itemIndex){
				container.scrollV -= this._itemHeight
			}
		}
		return this.rawdata[newi]
	}

	protected onComplete(e:any){
		if(!this.itemListContainer){
			return
		}
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		// this.itemListContainer.allowMultipleSelection = true
		this.refreshList()
		
		this.itemListContainer.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemSelected, this)
		this.itemListContainer.useVirtualLayout = true
	}

	public refreshList(){
		const container = this.itemListContainer
		if(!container){
			return
		}
		this.collectdata = new eui.ArrayCollection(this.rawdata)
		container.dataProvider = this.collectdata
		switch(this._ty){
			case PanelType.SHOP:
			case PanelType.SHOP2:
				container.itemRenderer = ItemListBuyObj
				break
			case PanelType.NORMAL:
				container.itemRenderer = ItemListNormalObj
				break
			default:
				container.itemRenderer = ItemListObj
				break
		}
		
		container.selectedIndex = -1; 
	}

	public refreshItem(obj:INetaSelectObj){
		if(!this.collectdata){
			return
		}
		this.collectdata.itemUpdated(obj)
		// this.collectdata.refresh()
	}

	protected onItemSelected(e){
		const item = this.itemListContainer.selectedItem	
		if(!this._mulSel){
			for(let i of this.rawdata){
				if(i.selected && i != item){
					i.selected = false
					break
				}
			}
		}
		const evt = new egret.Event(ItemList.ITEM_SELECTED)
		evt.data = item
		this.dispatchEvent(evt)
	}
}