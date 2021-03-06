class EvtLog extends eui.Component{
	private txtDes:eui.Label
	private img:eui.Image

	private url:string;
	private des:string;
	private cb:(any)=>void
	/**事件结果对话框
	 * @param des 事件描述
	 * @param url 图片url
	 * @param cb 点击回调
	 */
	public constructor(des:string, url:string='', cb:(any)=>void=null) {
		super()
		
		this.des = des
		this.url = url
		this.cb = cb
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.skinName = 'resource/eui_skins/logpanel.exml'
	}

	protected createChildren(){
		super.createChildren()
		this.scaleX = 0
		this.scaleY = 0
	}

	public dispose(){
		// this.removeEventListener("touchTap", this.onClick, this)
		egret.Tween.get(this)
		.to({
			scaleX:0,
			scaleY:0
		}, 200)
		.call(()=>{
			this.cb && this.cb(null)
		})
		
	}

	protected onAdded(e:any=null){
		const panel = this
		panel.x = (WorldData.STAGE_W - panel.width)/2
		panel.y = (WorldData.STAGE_H - panel.height)/2
		panel.touchEnabled = true
		panel.touchChildren = true
		panel.txtDes.text = panel.des
		panel.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, panel.onAdded, panel)
		// this.addEventListener("touchTap", this.onClick, this)

		egret.Tween.get(panel)
		.set({
			scaleX:0,
			scaleY:0
		})
		.to({
			scaleX:1,
			scaleY:1
		}, 200)
	}

	private onClick(e:egret.TouchEvent){
		// this.dispose()
	}
}