class EvtPanel extends eui.Component implements IDisposable {
	private menuContainer:eui.Group
	private logContainer:eui.Group
	private txtEvtName:eui.Label
	private txtDes:eui.Label
	private npcPanel:NpcPanel

	public menu:egret.DisplayObject
	private ename:string
	private des:string
	private sH:number
	private sW:number
	private npcs:NpcObj[]
	private _oriLogBottom:number
	private _oriMenuLeft:number
	public constructor(menu:egret.DisplayObject, name:string, des:string, npcs:NpcObj[]=null) {
		super()
		this.sW = egret.MainContext.instance.stage.stageWidth
		this.sH = egret.MainContext.instance.stage.stageHeight
		this.menu = menu
		this.ename = name
		this.des = des
		this.skinName = "resource/eui_skins/evtpanel.exml"
		this.width = this.sW
		this.height = this.sH
		this.npcs = npcs
		this.createTween()
	}


	public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): any{
		this.menu.addEventListener(type, listener, thisObject, useCapture, priority)
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	public modiflyContents(name:string, des:string){
		const panel = this
		panel.ename = name
		panel.des = des
		panel.txtEvtName.text = panel.ename
		panel.txtDes.text = panel.des
	}

	public get customMenu():CustomMenu|null{
		if(egret.getQualifiedClassName(this.menu) == 'CustomMenu'){
			return this.menu as CustomMenu
		}
		return null
	}

	protected childrenCreated(){
		super.childrenCreated()
		const panel = this
		panel.txtEvtName.text = panel.ename
		panel.txtDes.text = panel.des

		panel.menuContainer.addChild(panel.menu)

		if(panel.npcs.length == 0){
			panel.npcPanel.visible = false
		}else{
			panel.npcPanel.setNpcs(panel.npcs)
		}
		
	}

	private createTween(){
		const panel = this
		panel._oriLogBottom = panel.logContainer.bottom
		panel._oriMenuLeft = panel.menuContainer.left
		panel.alpha=0,
		panel.menuContainerLeft=panel._oriMenuLeft - 100,
		panel.logContainerBottom=panel._oriLogBottom - 100

		egret.Tween.get(panel)
		.to({
			alpha:1,
			menuContainerLeft:panel._oriMenuLeft,
			logContainerBottom:panel._oriLogBottom
		},200)
	}

	private set menuContainerLeft(v:number){
		this.menuContainer.left = v
	}

	private get menuContainerLeft(){
		return this.menuContainer.left
	}

	private set logContainerBottom(v:number){
		this.npcPanel.bottom = v
		this.logContainer.bottom = v
	}
	private get logContainerBottom(){
		return this.logContainer.bottom 
	}
	
}