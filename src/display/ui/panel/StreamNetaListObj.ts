class StreamNetaListObj  extends eui.ItemRenderer{
	protected icon:eui.Image
	public constructor() {
		super();	
		this.skinName = 'resource/eui_skins/streamlistobj.exml';
	}

	protected childrenCreated(){
		super.childrenCreated()
	}

	protected dataChanged(){
		super.dataChanged()
	}

	public setIconScale(v:number){
		this.scaleX = v
		this.scaleY = v
	}

	public getIconScale(){
		return this.scaleX
	}
	
}