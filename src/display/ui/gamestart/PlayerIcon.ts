class PlayerIcon extends eui.Component{
	private pcontainer:eui.Group
	private img:eui.Image
	private url:string
	private useable:boolean
	private _btn:eui.Button
	private _index:number
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/playerstartselect.exml'
		// this.addEventListener("touchEnd", (e)=>{
		// 	console.log(this.url)
		// }, this)
	}

	public setPlayer(iconUrl:string, useAble:boolean, index:number):Promise<void>{
		const icon = this
		icon.url = iconUrl
		icon.useable = useAble
		icon.img.source = iconUrl
		icon.currentState = useAble?"normal":"disable"
		icon.touchEnabled = useAble
		icon._index = index
		return new Promise<void>((resolve, reject)=>{
			egret.Tween.get(icon.img)
			.set({
				alpha:0,
				scaleX:1.2,
				scaleY:1.2
			})
			.to({
				alpha:1,
				scaleX:1,
				scaleY:1
			}, 200)
			.call(resolve)	

		})
		
	}

	public setP(p:eui.Button){
		const orib = this._btn
		this._btn = p
		if(p)this.pcontainer.addChild(p)
		return orib
	}

	public get useAble(){
		return this.useable
	}

	public get index(){
		return this._index
	}


}