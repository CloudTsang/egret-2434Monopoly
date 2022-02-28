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

	public setPlayer(iconUrl:string, useAble:boolean, index:number){
		this.url = iconUrl
		this.useable = useAble
		this.img.source = iconUrl
		this.currentState = useAble?"normal":"disable"
		this.touchEnabled = useAble
		this._index = index
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