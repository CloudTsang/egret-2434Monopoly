class SkillBar extends eui.Component{
	public type:string
	public name:string
	private txtskillname:eui.Label
	private stayTime:number
	public constructor(s:Skill) {
		super()
		this.name = s.name
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded,this)
		if(s.type == SkillType.POSITIVE){
			this.type = 'positive'
		}else if(s.type == SkillType.NEGATIVE){
			this.type = 'negative'
		}else if(s.type == SkillType.HIDDEN){
			this.type = 'hidden'
		}
		this.stayTime = 1000
		this.skinName = 'resource/eui_skins/positiveskill.exml'	
	}

	protected onAdded(e:eui.UIEvent){
		const ori = this.x
		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded,this)
		egret.Tween.get(this)
		.to({
			x:ori - this.width
		}, 200)
		.wait(this.stayTime)
		.to({
			x:ori
		}, 200)
		.call(()=>{
			this.parent && this.parent.removeChild(this)
		})
	}

	protected createChildren(){
		super.createChildren()
		// const s = '我是谁？你又是谁？我可以是任何人，我也可以是你，我是你反过来说你是我，那么你也可以是任何人，所以任何人都可以是任何人。'
		const s = this.name
		if(s.length > 20){
			this.txtskillname.size = 20
			this.stayTime = 2500
		}
		this.txtskillname.text = s
		this.width = this.txtskillname.textWidth+80
		// console.log("this.txtskillname.textWidth : ", this.txtskillname.textWidth)
		this.currentState = this.type
	}
}