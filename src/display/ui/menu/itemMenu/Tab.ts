class Tab extends egret.Sprite{
	private selected:boolean;
	private _mask:egret.Shape;
	private _icon:egret.Bitmap;
	private _w:number;
	public index:number;
	private _ty:NetaType

	public get type(){
		return this._ty
	}
	public constructor(w:number, i:number, ty:NetaType) {
		super()
		this.touchEnabled = true
		this.index = i
		this._ty = ty
		w = w > 60?60:w
		this._w = w
		this.width = w
		this.createIcon();
		this.createTab();
	}

	public setSelected(v:boolean){
		if(v == this.selected){
			return;
		}
		this.selected = v;
		if(!v){
			this.addChild(this._mask)
		}else{
			this.removeChild(this._mask)
		}
	}

	protected createTab(){
		const w = this._w
		let h = w*1.5
		this.graphics.beginFill(0x000000, 0.75)
		this.graphics.drawRoundRect(0,0,w,h, 30)
		this.graphics.endFill() 	
		let m = new egret.Shape();
		m.graphics.beginFill(0x000000, 0.5)
		m.graphics.drawRoundRect(0,0,w,h, 30)
		m.graphics.endFill() 
		this.addChild(m)
		this._mask = m
	}

	protected createIcon(){
		const iconSize = this._w *0.8
		const padding = this._w *0.1
		let b = new egret.Bitmap() 
		const tex = RES.getRes(this.iconUrl) as egret.Texture
		b.texture = tex
		b.x = padding
		b.y = padding
		b.width = iconSize
		b.height = iconSize
		this.addChild(b)
	}
	
	private get iconUrl(){
		switch(this._ty){
			case NetaType.GAME:
				return "icons_json#game"
			case NetaType.SONG:
				return "icons_json#song"
			case NetaType.TALK:
				return "icons_json#daily"
			case NetaType.PRESENT:
				return "icons_json#present"
			case NetaType.SPEC:
				return "icons_json#spec"
			case NetaType.DEVICE:
				return "icons_json#device"
		}
	}
}