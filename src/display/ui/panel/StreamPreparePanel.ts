class StreamPreparePanel extends egret.Sprite  implements IDisposable{
	public netaPanel:NetaPanel
	public streamPanel:StreamNetaPanel
	public netaSelectPanel:NetaSelectPanel
	private collaboPanel:CollaboPanel
	private sH:number
	private sW:number
	private store:NetaBag

	private prepare:boolean
	/**
	 * 直播准备面板
	 * @param store neta集合
	 * @param ty 直播类型
	 */
	public constructor(store:NetaBag, ty:string, pty:PanelType=PanelType.STREAM) {
		super()
		const sH = egret.MainContext.instance.stage.stageHeight
		const sW = egret.MainContext.instance.stage.stageWidth
		this.store = store

		this.prepare = ty!=''

		let dwidth:number = 800
		let dx = (sW - dwidth)/2
		if(this.prepare){
			let streamPanel = new StreamNetaPanel(ty)
			streamPanel.x = (sW - streamPanel.width)/2
			streamPanel.y = sH - streamPanel.height - 20
			this.addChild(streamPanel)
			this.streamPanel = streamPanel

			dwidth = streamPanel.width
			dx = streamPanel.x
		}
		

		let netaPanel = new NetaPanel(true)
		netaPanel.x = dx + (dwidth - netaPanel.width)
		netaPanel.y = 30//streamPanel.y - netaPanel.height - 20
		this.addChild(netaPanel)
		this.netaPanel = netaPanel


		let netaSelectPanel = new NetaSelectPanel(this.store, pty, ty, dwidth-netaPanel.width - 30,netaPanel.height)
		netaSelectPanel.x = dx
		netaSelectPanel.y = 30
		this.addChild(netaSelectPanel)
		this.netaSelectPanel = netaSelectPanel
		if(!this.prepare){
			this.addEventListener(ItemList.ITEM_SELECTED, this.onItemClick, this)
		}
		this.createTween()

	}

	public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): any{
		if(type == GameEvents.MENU_CANCEL||type == GameEvents.STREAM_START){
			this.streamPanel && this.streamPanel.addEventListener(type, listener, thisObject, useCapture, priority)
			this.netaSelectPanel && this.netaSelectPanel.addEventListener(type, listener, thisObject, useCapture, priority)
		}else if(type == ItemList.ITEM_SELECTED){
			this.netaSelectPanel.addEventListener(type, listener, thisObject, useCapture, priority)
		}else if(type == GameEvents.NETA_CONFIRM){
			this.netaPanel.addEventListener(type, listener, thisObject, useCapture, priority)
		}
	}

	public setNeta(n:Neta){
		this.netaPanel.setNeta(n)
	}

	public setStreamData(n:Neta[], pop:number, safe:number, meme:number, able:boolean){
		this.streamPanel.setStreamData(n,pop,safe,meme,able)
	}

	public startStream(liver:MainCharacter){
		this.createTween2()
		this.streamPanel.startStream(liver)
	}

	public setCollabo(mems:string[]){
		let cp:CollaboPanel = new CollaboPanel(mems)
		this.collaboPanel = cp
	}

	public finishStream(){
		this.streamPanel.finishStream()
	}

	public showComment(n:string[]){
		this.streamPanel.showComment(n)
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	private onItemClick(e:any){
		const obj:INetaSelectObj = e.data
		this.setNeta(obj.neta)
	}


	//#region 菜单浮现动画
	private _oriNetaPanelX:number
	private _oriSelPanelX:number
	private _oriStreamPanelY:number
	/**打开菜单时的动画 */
	private createTween(){
		const panel = this
		panel._oriNetaPanelX = panel.netaPanel.x
		panel._oriSelPanelX = panel.netaSelectPanel.x
		panel._oriStreamPanelY = panel.prepare?panel.streamPanel.y:0
		panel.alpha = 0
		panel.NetaPanelX = panel._oriNetaPanelX + 100
		panel.SelPanelX = panel._oriSelPanelX - 100
		panel.StreamPanelY = panel._oriStreamPanelY + 100
		egret.Tween.get(this)
		.to({
			alpha:1,
			NetaPanelX:panel._oriNetaPanelX,
			SelPanelX:panel._oriSelPanelX,
			StreamPanelY:panel._oriStreamPanelY
		}, 200)
	}
	/**开始直播时的动画，neta选择菜单和neta面板消去，直播面板移到中间 */
	private createTween2(){
		const panel = this
		egret.Tween.get(this)
		.to({
			NetaPanelAlpha:0,
			NetaPanelX:panel._oriNetaPanelX + 100,
			SelPanelX:panel._oriSelPanelX - 100,
			StreamPanelY:200//panel._oriStreamPanelY - 500
		}, 200)
		.call(()=>{
			const cp = this.collaboPanel
			const sp = this.streamPanel
			if(cp){
				cp.x = sp.x 
				cp.y = sp.y - cp.height
				this.addChild(cp)
			}
		})
	}
	private get NetaPanelAlpha(){
		return this.netaPanel.alpha
	}
	private set NetaPanelAlpha(v:number){
		this.netaPanel.alpha = v
		this.netaSelectPanel.alpha = v
	}
	private get NetaPanelX(){
		return this.netaPanel.x
	}
	private set NetaPanelX(v:number){
		this.netaPanel.x = v
	}
	private get SelPanelX(){
		return this.netaSelectPanel.x
	}
	private set SelPanelX(v:number){
		this.netaSelectPanel.x = v
	}
	private get StreamPanelY(){
		if(!this.prepare) return 0
		return this.streamPanel.y
	}
	private set StreamPanelY(v:number){
		if(!this.prepare) return
		this.streamPanel.y = v
	}
	//#endregion
}