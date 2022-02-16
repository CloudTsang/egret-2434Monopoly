class CollaboPanel extends eui.Component{
	private iconContainer:eui.Group
	private txtTip:eui.Label
	private icons:CollaboIcon[]
	private urls:string[]
	private tw:egret.Tween
	public constructor(urls:string[]) {
		super()
		this.icons = []
		this.urls = urls
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.skinName = 'resource/eui_skins/collabopanel.exml'
	}

	public dispose(){
		if(this.tw){
			this.tw.pause()
			this.tw = null
		}
		for(let icon of this.icons){
			icon.dispose()
		}
		this.icons = null
	}

	private onAdded(e:egret.Event){
		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		const oriW = this.width
		const oriH = this.height

		egret.Tween.get(this)
		// .set({
		// 	width:0,
		// 	height:0
			
		// })
		// .to({
		// 	width:oriW,
		// 	height:oriH
		// }, 500)
		.set({
			tipVisible:true
		})
		.call(()=>{
			this.initIcons()
		})
	}

	private initIcons(){
		let curX = 0
		for(let u of this.urls){
			const icon = new CollaboIcon(u)
			icon.x = curX
			this.iconContainer.addChild(icon)
			curX += icon.width + 15
			this.icons.push(icon)
		}
	}

	public set tipVisible(v:boolean){
		this.txtTip.visible = v
	}
	public get tipVisible(){
		return this.txtTip.visible
	}
}