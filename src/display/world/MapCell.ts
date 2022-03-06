class MapCell extends egret.Sprite{
	private _cellSize:number

	protected v:egret.Sprite
	protected r:egret.Sprite
	public cx:number
	public cy:number
	public constructor(vUrl:string = '', rUrl:string='') {
		super()
		const s = WorldData.cellSize
		this._cellSize = s
		this.width = s
		this.height = s
		this.loadPic(vUrl, rUrl)
	}

	private loadPic(vUrl:string = '', rUrl:string=''){
		const thick = 8
		const size = this._cellSize - thick*2
		let v = new egret.Sprite()
		v.graphics.lineStyle(thick,0x000000)
		// v.graphics.beginFill(0xfc755d)
		v.graphics.beginFill(0xfc4d53)
		v.graphics.drawRect(thick,thick,size,size)
		v.graphics.endFill()
		if(vUrl!=''){	
			let vicon = new egret.Bitmap()
			vicon.texture = RES.getRes(vUrl)
			vicon.x = thick
			vicon.y = thick
			vicon.width = size
			vicon.height = size
			v.addChild(vicon)
		}
		this.v = v

		let r = new egret.Sprite()
		r.graphics.lineStyle(thick,0x000000)
		r.graphics.beginFill(0x4e61f2)
		r.graphics.drawRect(thick,thick,size,size)
		r.graphics.endFill()
		if(rUrl!=''){
			let ricon = new egret.Bitmap()
			ricon.texture = RES.getRes(rUrl)
			ricon.x = thick
			ricon.y = thick
			ricon.width = size
			ricon.height = size
			r.addChild(ricon)
		}
		this.r = r

		this.setMode(true)
	}

	public setMode(isv:boolean, tw:boolean=false){
		let oriSp:egret.Sprite
		let newSp:egret.Sprite
		if(isv){
			oriSp = this.r
			newSp = this.v
		}else{
			oriSp = this.v
			newSp = this.r
		}
		oriSp.parent && this.removeChild(oriSp)
		this.addChild(newSp)
	}
}