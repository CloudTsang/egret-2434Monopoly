class StreamNetaPanel extends eui.Component  implements IDisposable{
	private txtTip:eui.Label
	private itemContainer:eui.List
	private txtNeta:eui.Label
	private txtPop:eui.Label
	private txtSafe:eui.Label
	private txtMeme:eui.Label
	private btnConfirm:eui.Button
	private btnCancel:eui.Component
	private btnContainer:eui.Group

	private streamResultContainer:eui.Group
	private txtSubAdd:eui.Label
	private txtSubSpd:eui.Label
	private txtDAdd:eui.Label
	private txtDSpd:eui.Label

	private commentList:eui.List

	private _data:Neta[]
	private _ty:string
	private _urls:string[]
	private _oritxtDY:number
	private _curNeta:any

	protected rawdata:Neta[];
	protected collectdata:eui.ArrayCollection
	private commentRawdata:string[]
	private commentCollectdata:eui.ArrayCollection
	private commentTimer:egret.Timer
	private commentIndex:number
	public constructor(t:string) {
		super()
		this._ty = t
		this._urls = []
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = 'resource/eui_skins/livenetapanel.exml'
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	public setStreamData(n:Neta[], pop:number, safe:number, meme:number, able:boolean){
		const panel = this
		panel.txtPop.text = ""+pop
		panel.txtSafe.text = ""+safe
		panel.txtMeme.text = ""+meme
		panel.txtNeta.text = ""+n.length
		panel.btnConfirm.currentState = able?"up":"disabled"
		panel.rawdata = n
		panel.collectdata = new eui.ArrayCollection(n)
		panel.itemContainer.dataProvider = panel.collectdata
	}

	public startStream(){
		const panel = this
		panel.currentState = 'onstream'
		panel.commentList.itemRenderer = CommentListObj

		panel.commentTimer = new egret.Timer(200)
		panel.commentTimer.addEventListener(egret.TimerEvent.TIMER, panel.omCommentRoll, panel)
		panel.commentIndex = 0
		panel.commentTimer.start()
	}

	public finishStream(){
		this.commentTimer.stop()
		this.commentTimer.removeEventListener(egret.TimerEvent.TIMER, this.omCommentRoll, this)
	}

	public setTotSub(n:number){
		this.txtSubAdd.text = ''+n
	}
	public setSubSpd(n:number){
		this.txtSubSpd.text = ''+n
	}

	/**
	 * 显示neta效果
	 * @param n 索引
	 * @param t1 总直播效果
	 * @param t2 直播效果增加量
	 * @param t3 总增长速度
	 * @param t4 增长速度增加量
	 * @param cb 使用neta动画播放完毕的回调
	 */
	public useNeta(n:number, t1:number, t2:number, t3:number, t4:number, accident:boolean, enjo:boolean, cb:()=>void, thisObj:any){
		const panel = this
		panel._curNeta = panel.itemContainer.getChildAt(0)
		let scale = 0
		if(accident){
			panel._curNeta.currentState = 'accident'
			scale = 1
		}else if(enjo){
			panel._curNeta.currentState = 'fire'
			scale = 1
		}
		panel.txtSubAdd.text = ''+t1
		panel.txtSubSpd.text = ''+t3
		panel.txtDAdd.text = '+'+t2
		panel.txtDSpd.text = '+'+t4
		panel.txtTip.text = ''
		const p1 = panel._oritxtDY - 30
		egret.Tween.get(panel)
		.set({
			txtDAlpha:0,
			txtDY:panel._oritxtDY,
		})
		.to({
			txtDAlpha:1,
			txtDY:p1,
			curNetaScale: scale 
		}, 400)
		.to({
			txtDAlpha:0
		}, 100)
		.call(()=>{
			panel.collectdata = new eui.ArrayCollection(this.rawdata.slice(n+1))
			this.itemContainer.dataProvider = this.collectdata
		})
		.call(cb, thisObj)
	}

	public showComment(n:string[]){
		if(!this.commentRawdata){
			this.commentRawdata = []
		}
		this.commentRawdata = this.commentRawdata.concat(n)
		// this.commentCollectdata = new eui.ArrayCollection(n)
		// this.commentList.dataProvider = this.commentCollectdata
	}

	private omCommentRoll(e:egret.TimerEvent){
		const panel = this
		if(!panel.commentRawdata){
			return
		}
		const startI = panel.commentIndex
		if(startI+5 > panel.commentRawdata.length){
			return
		}
		const endI = startI+5
		
		const arr = panel.commentRawdata.slice(startI, endI)
		panel.commentCollectdata = new eui.ArrayCollection(arr)
		panel.commentList.dataProvider = panel.commentCollectdata
		panel.commentIndex++
	}

	private onComplete(e:any){
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.btnCancel.addEventListener("touchTap", this.onCancel, this)
		this.btnConfirm.addEventListener("touchTap", this.onConfirm, this)
		this.txtTip.text = this.getTip(this._ty)
		this.itemContainer.itemRenderer = StreamNetaListObj
		this._oritxtDY = this.txtDAdd.y
	}

	private onConfirm(e:any=null){
		this.dispatchEvent(new egret.Event(GameEvents.STREAM_START))
	}

	private onCancel(e:any=null){
		this.dispatchEvent(new egret.Event(GameEvents.MENU_CANCEL))
	}

	private getTip(t:string){
		switch(t){
			case StreamType.TALK:
				return "杂谈直播需要选择至少3个杂谈或特殊neta"
			case StreamType.SING:
				return "歌回直播需要选择至少3个歌曲neta"
			case StreamType.GAME:
				return "游戏直播需要选择1个游戏neta"
			case StreamType.PRESENT:
				return "披露直播需要选择1个披露neta"
		}
	}

	private get curNetaScale(){
		return this._curNeta.getIconScale()
	}

	private set curNetaScale(v:number){
		this._curNeta.setIconScale(v)
	}

	private get txtDAlpha(){
		return this.txtDAdd.alpha
	}
	private set txtDAlpha(v:number){
		this.txtDAdd.alpha = v
		this.txtDSpd.alpha = v
	}
	private get txtDY(){
		return this.txtDAdd.y
	}
	private set txtDY(v:number){
		this.txtDAdd.y = v
		this.txtDSpd.y = v
	}
}