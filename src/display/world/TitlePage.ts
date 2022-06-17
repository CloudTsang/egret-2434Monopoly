class TitlePage extends eui.Component{
	private img1:eui.Image
	private img2:eui.Image

	private btnStart:eui.Button
	private btnStart2:eui.Button
	private btnDes:eui.Button

	private dp:DescriptPanel
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/titlePage.exml'
		this.once(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
	}

	protected onAdded(e:any){
		egret.Tween.get(this)
		.set({
			imgScale:0
		})
		.to({
			imgScale:1
		}, 500, egret.Ease.elasticOut)
		
		this.btnDes.addEventListener("touchTap", this.onDesClick, this)
		this.btnStart.addEventListener("touchTap", this.onStartClick, this)
		this.btnStart2.addEventListener("touchTap", this.onStartClick2, this)
	}

	protected onStartClick(e:any=null){
		let evt:egret.Event = new egret.Event(GameEvents.TO_PLAYER_SELECT)
		evt.data = {
			mode:GameMode.LOCAL_MULTI
		}
		this.dispatchEvent(evt)
	}

	protected onStartClick2(e:any=null){
		let evt:egret.Event = new egret.Event(GameEvents.TO_PLAYER_SELECT)
		evt.data = {
			mode:GameMode.SINGLE
		}
		this.dispatchEvent(evt)
	}

	protected onDesClick(e:any):void{
		if(this.dp) return
		const dp = new DescriptPanel()
		dp.x = (this.width - dp.width)/2
		dp.y = (this.height - dp.height)/2
		dp.addEventListener(GameEvents.MENU_CANCEL, this.onDesCancel, this)
		this.dp = dp
		this.addChild(dp)
	}

	protected onDesCancel(e:any){
		if(!this.dp) return
		this.dp.removeEventListener(GameEvents.MENU_CANCEL, this.onDesCancel, this)
		this.removeChild(this.dp)
		this.dp = null
	}

	protected set imgScale(v:number){
		this.img1.scaleX = v
		this.img2.scaleX = v
		this.img1.scaleY = v
		this.img2.scaleY = v
	}

	protected get imgScale(){
		return this.img1.scaleX
	}
}