class RollBtn extends eui.Component{
	private txtRollNum:eui.Label
	private result:RollResultLabel
	private _tw:egret.Tween
	private btn:eui.Image

	private singleRollNetaPanel:eui.Group
	private rollNeta0:eui.Group
	private rollNeta1:eui.Group
	private rollNeta2:eui.Group
	private rollNetaImg0:eui.Image
	private rollNetaImg1:eui.Image
	private rollNetaImg2:eui.Image
	private rollNetaTxt0:eui.Label
	private rollNetaTxt1:eui.Label
	private rollNetaTxt2:eui.Label
	private rollNetaName0:eui.Label
	private rollNetaName1:eui.Label
	private rollNetaName2:eui.Label


	public constructor() {
		super()
		this.$addListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = "resource/eui_skins/rollbtn.exml"
		
	}

	addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):any{
		if(type == egret.TouchEvent.TOUCH_TAP){
			this.btn.addEventListener(type,listener, thisObject, useCapture, priority)
		}else{
			super.$addListener(type,listener, thisObject, useCapture, priority)
		}
	}

 
	private onComplete(e:any){
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.result.touchEnabled = false
		this.txtRollNum.touchEnabled = true
	}

	public showRolledNum(n:number, r:string){
		let txt = this.txtRollNum
		this.result.currentState = r
		if(r == RollResult.BIG_SUCCESS){
			SoundManager.instance.playBgs('success_mp3')
		}else if(r == RollResult.BIG_FAIL){
			// SoundManager.instance.playBgs('dededon_short_mp3')
		}
		
		if(this._tw){
			this._tw.pause()
			this._tw = null	
		}
		this._tw = egret.Tween.get(txt)
		.set({
			bottom:-100,
			text:''+n
		})
		.to({
			bottom:this.height
		}, 200)
		.wait(1000)
		.set({
			bottom:-100,
		})
		.call(()=>{
			this.result.currentState = RollResult.NORMAL
		})
	}

	private rollNetaArr:number[]
	public setRollNeta(arr:Neta[]){
		const t = this
		if(!arr){
			t.singleRollNetaPanel.visible = false
			return 
		}
		t.rollNetaArr = []
		t.singleRollNetaPanel.visible = true
		for(let i=0; i<arr.length; i++){
			const n = arr[i]
			switch(i){
				case 0:
				t.rollNetaImg0.source = n.iconUrl
				t.rollNetaName0.text = n.name
				t.rollNetaTxt0.text = ''+n.pop
				t.rollNetaArr.push(n.pop)
				break
				case 1:
				t.rollNetaImg1.source = n.iconUrl
				t.rollNetaName1.text = n.name
				t.rollNetaTxt1.text = ''+n.safe
				t.rollNetaArr.push(n.safe)
				break
				case 2:
				t.rollNetaImg2.source = n.iconUrl
				t.rollNetaName2.text = n.name
				t.rollNetaTxt2.text = ''+n.meme
				t.rollNetaArr.push(n.meme)
				break
			}
		}
		t.once(egret.TouchEvent.TOUCH_TAP, t.onRollNetaClick, t)
	}

	private onRollNetaClick(e:egret.TouchEvent){
		const t = this
		t.singleRollNetaPanel.visible = false
		let evt = new egret.Event(GameEvents.ROLL_NETA)
		let tmp:number = 0
		switch(e.target){
			case t.rollNeta0:
				tmp = t.rollNetaArr[0]
				break
			case t.rollNeta1:
				tmp = t.rollNetaArr[1]
				break
			case t.rollNeta2:
				tmp = t.rollNetaArr[2]
				break
		}
		evt.data = {p: tmp}
		t.dispatchEvent(evt)
	}
	
}