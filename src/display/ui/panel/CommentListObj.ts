class CommentListObj extends eui.ItemRenderer {
	private txt:eui.Label
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/comment.exml'
	}

	protected childrenCreated(){
		super.childrenCreated()
	}

	protected dataChanged(){
		super.dataChanged()
		let s:string = this.data
		if(s.indexOf("{fire}")>=0){
			this.currentState = 'fire'
		}else{
			this.currentState = 'normal'
		}
		s = s.replace("{fire}","")
		this.txt.text = s
		
	}
}