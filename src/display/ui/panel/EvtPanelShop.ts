class EvtPanelShop extends eui.Component implements IDisposable{
	private netaSelectPanel:NetaSelectPanel
	private netaPanel:NetaPanel
	private logContainer:eui.Group
	private baseContainer:eui.Group

	private ename:string
	private des:string
	private ty:PanelType.SHOP|PanelType.SHOP2
	private store:NetaBag
	private mc:MainCharacter

	private txtEvtName:eui.Label
	private txtDes:eui.Label

	private sH:number
	private sW:number
	public constructor(mc:MainCharacter,name:string, des:string, store:NetaBag, shopType:PanelType.SHOP|PanelType.SHOP2) {
		super()
		this.sW = egret.MainContext.instance.stage.stageWidth
		this.sH = egret.MainContext.instance.stage.stageHeight
		this.ename = name
		this.des = des
		this.ty = shopType
		this.store = store
		this.mc = mc
		this.width = this.sW
		this.height = this.sH
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.skinName = "resource/eui_skins/evtpanel_shop.exml"
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	protected childrenCreated(){
		super.childrenCreated()
		const panel = this
		panel.txtEvtName.text = panel.ename
		panel.txtDes.text = panel.des
	}

	protected onAdded(e:any){
		const panel = this
		panel.netaPanel.setType(true)
		panel.netaPanel.addEventListener(GameEvents.NETA_CONFIRM, panel.onEvent, panel)
		const dwidth = panel.width*0.7 - panel.netaPanel.width - 50
		let netaSelectPanel = new NetaSelectPanel(panel.store, panel.ty, '', 
		dwidth, panel.netaPanel.height, panel.mc.netaBag)
		netaSelectPanel.y = panel.netaPanel.top
		panel.baseContainer.addChild(netaSelectPanel)
		panel.netaSelectPanel = netaSelectPanel
		netaSelectPanel.addEventListener( ItemList.ITEM_SELECTED, panel.onSelected, panel)
		netaSelectPanel.addEventListener(GameEvents.MENU_CANCEL, panel.onEvent, panel)
	}

	public refresh(obj:INetaSelectObj){
		this.netaSelectPanel.refresh(obj)
		this.onSelected({
			data:obj
		})
	}

	protected onSelected(e:any){
		const obj:INetaSelectObj = e.data
		const neta = obj.neta
		const mc = this.mc
		const v = mc.money >= neta.value
		const arr = mc.netaBag.filterNetas0(neta.type)
		let hold = 0
		for(let n of arr){
			if(n.name == neta.name)
			{
				hold = n.times==-1?-1:n.times
				break
			}
		}
		this.netaPanel.setNeta(obj.neta)
		this.netaPanel.setBtnEnable(v && hold!=-1)
		this.netaPanel.setHold(hold)
	}

	protected onEvent(e:egret.Event){
		this.dispatchEvent(e)
	}
}