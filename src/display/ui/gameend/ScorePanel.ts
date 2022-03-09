class ScorePanel extends eui.Component {
	private data:IScore[]
	private btnTitle:eui.Button
	public constructor(data:IScore[]) {
		super()
		this.data = data
		this.skinName = "resource/eui_skins/scorePanel.exml"
		this.once(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
	}

	private onAdded(e:egret.Event){
		const panel = this
		const data = this.data
		for(let i=0;i<data.length;i++){
			let img = panel[`img${i}`] as eui.Image
			
			img.source = data[i].iconUrl
			let txt1 = panel[`txtStream${i}`] as eui.Label 
			txt1.text = `${data[i].stream} 次`
			let txt2 = panel[`txtSub${i}`] as eui.Label 
			txt2.text = `${data[i].sub} 人`
		}
		panel.btnTitle.once(egret.TouchEvent.TOUCH_TAP, panel.onBtnClicked, panel)
		SoundManager.instance.play('vtl3_mp3', true)
	}

	private onBtnClicked(e:any){
		this.dispatchEvent(new egret.Event(GameEvents.BACK2TITLE))
	}
}