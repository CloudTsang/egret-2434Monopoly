/**选择玩家的面板 */
class StartSelectPanel extends eui.Component{
	private TURNS:number[] = [10,20,30,50,100]
	private livers:string[] = ['mito_json', 'toya_json', 'rion_json', 'sasaki_json',
								'lize_json', 'chaika_json', 'umeo_json', 'siina_json']
	private btnStart:eui.Button
	private tagBtns:eui.Button[]
	private useLivers:PlayerIcon[]
	private tslider:eui.HSlider
	private txtTurn:eui.Label
	private curTurn:number

	private dragging:eui.Button
	private oriIcon:PlayerIcon

	private cpn2Hide0:eui.Component
	private cpn2Hide1:eui.Component
	public constructor() {
		super()
		this.curTurn = this.TURNS[0]
		this.skinName = 'resource/eui_skins/gameStartSetting.exml'
		this.once(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
	}

	protected async onAdded(e:any){
		const p = this
		const livers = p.livers
		p.btnStart.visible = false
		p.cpn2Hide0.visible = false
		p.cpn2Hide1.visible = false

		const useLivers:PlayerIcon[] = []
		for(let i=0;i<livers.length; i++){
			const obj = RES.getRes(livers[i])
			const icon:PlayerIcon = p[`liver${i}`]
			const able = obj['disable'] != true
			await icon.setPlayer(obj['iconUrl'], able, i)
			icon.touchEnabled = true
			icon.touchChildren = true
			if(able) useLivers.push(icon)
		}
		p.useLivers = useLivers

		let btns:eui.Button[] = []
		let num = 4
		if(WorldData.gameMode == GameMode.SINGLE) num = 1
		for(let i=0;i<num;i++){
			const b = new eui.Button()
			b.label = `${i+1}P`
			btns.push(b)
			useLivers[i].setP(b)
			b.addEventListener("touchBegin", p.onStartDrag, p)
		}
		p.tagBtns = btns

		p.btnStart.addEventListener("touchTap", p.onStartClick, p)
		p.tslider.addEventListener(egret.Event.CHANGE, p.onTurnSliderChange, p)

		p.btnStart.visible = true
		p.cpn2Hide0.visible = true
		p.cpn2Hide1.visible = true
	}

	protected onStartDrag(e:egret.TouchEvent){
		if(this.dragging)return
		const b = e.currentTarget
		this.dragging = b
		this.oriIcon = b.parent.parent as PlayerIcon
		b.parent.removeChild(b)
		
		b.x = e.stageX-b.width/2
		b.y = e.stageY-b.height/2
		this.addChild(b)
		this.addEventListener("touchMove", this.onDragging, this)
		this.addEventListener("touchEnd", this.onCancelDrag, this)
	}

	private onDragging(e:egret.TouchEvent){
		const b = this.dragging
		if(!b) return
		b.x = e.stageX-b.width/2
		b.y = e.stageY-b.height/2
	}

	private onCancelDrag(e:egret.TouchEvent){
		const b = this.dragging
		if(!b) return
		this.removeEventListener("touchMove", this.onDragging, this)
		this.removeEventListener("touchEnd", this.onCancelDrag, this)

		let hitIcon:PlayerIcon
		for(let icon of this.useLivers){
			if(!icon.useAble) continue
			if(icon.hitTestPoint(e.stageX, e.stageY)){
				hitIcon = icon
				break
			}
		}
		
		if(hitIcon){
			const b1 = hitIcon.setP(this.dragging)
			if(b1 && this.oriIcon) this.oriIcon.setP(b1)
		}else{
			this.oriIcon && this.oriIcon.setP(this.dragging)
		}
		this.oriIcon = null
		this.dragging = null
	}

	protected onStartClick(e:any){
		let jsonDatas:string[] = []
		const livers:string[] = this.livers
		for(let b of this.tagBtns){
			const icon:PlayerIcon = b.parent.parent as PlayerIcon
			jsonDatas.push(livers[icon.index])
		}
		let evt:egret.Event = new egret.Event(GameEvents.GAME_START)
		evt.data = {
			livers:jsonDatas,
			turn:this.curTurn
		}
		this.dispatchEvent(evt)
	}

	protected onTurnSliderChange(e:any){
		const i = this.tslider.value
		this.curTurn = this.TURNS[i]
		this.txtTurn.text = `${this.curTurn}`
	}
}