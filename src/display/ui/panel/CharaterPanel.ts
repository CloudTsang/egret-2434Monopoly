class CharaterPanel extends eui.Component  implements IDisposable{
	public btnClose:eui.Image
	private img:eui.Image

	private txtName:eui.Label
	private txtSubs:eui.Label
	private txtIncrease:eui.Label
	private txtStream:eui.Label
	private txtPrevStream:eui.Label
	private txtMoney:eui.Label

	private txts1:eui.Label
	private txts2:eui.Label
	private txts3:eui.Label
	private txts4:eui.Label

	private txteq:eui.Label

	private txtluck:eui.Label
	private txtSense:eui.Label
	private txtCommu:eui.Label
	private txtStrength:eui.Label
	private txtTalk:eui.Label
	private txtGame:eui.Label
	private txtSing:eui.Label
	private txtTech:eui.Label

	private containerTips:eui.Group
	private buffContainer:eui.Group
	private txtTips:eui.Label

	private tips:any;
	private _mc:MainCharacter	

	public constructor(mc:MainCharacter) {
		super()
		this.touchEnabled = true
		this._mc = mc
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = "resource/eui_skins/maincharacter.exml"
		this.tips = RES.getRes("liver_readme_json")
	}

	public dispose(){
		this.removeEventListener("touchTap", this.onClick, this)
		this.btnClose.removeEventListener("touchTap", this.onClose, this)
		if(this.parent){
			this.parent.removeChild(this)
		}
	}

	public refresh(){
		const panel = this
		const mc:MainCharacter = panel._mc
		panel.img.texture = RES.getRes(mc.iconUrl) as egret.Texture
		panel.txtName.text = mc.name
		panel.txtSubs.text = ""+mc.subscribe
		panel.txtIncrease.text = ""+mc.increase
		panel.txtStream.text = ""+mc.stream.length
		if(mc.stream.length == 0){
			panel.txtPrevStream.text = '--'
		}else{
			panel.txtPrevStream.text = mc.stream[mc.stream.length-1].startTurn + 'T'
		}
		panel.txtMoney.text = ""+mc.money

		panel.txts1.text = mc.skills[0].name
		panel.txts2.text = mc.skills[1].name
		panel.txts3.text = mc.skills[2].name
		panel.txts4.text = mc.skills[3].name
		panel.txteq.text = mc.equipment?mc.equipment.name:"无装备"

		panel.txtluck.text = ""+Math.floor(mc.luck)
		panel.txtSense.text = ""+Math.floor(mc.sense)
		panel.txtCommu.text = ""+Math.floor(mc.commu)
		panel.txtStrength.text = ""+Math.floor(mc.strength)
		panel.txtTalk.text = ""+Math.floor(mc.talk)
		panel.txtGame.text = ""+Math.floor(mc.game)
		panel.txtSing.text = ""+Math.floor(mc.sing)
		panel.txtTech.text = ""+Math.floor(mc.tech)
		panel.setTextColor(panel.txtluck, "luck")
		panel.setTextColor(panel.txtSense, "sense")
		panel.setTextColor(panel.txtCommu, "commu")
		panel.setTextColor(panel.txtStrength, "strength")
		panel.setTextColor(panel.txtTalk, "talk")
		panel.setTextColor(panel.txtGame, "game")
		panel.setTextColor(panel.txtSing, "game")
		panel.setTextColor(panel.txtTech, "tech")

		let bufficonX = 0
		for(let i=0;i<mc.buffs.length;i++){
			const b:Buff = mc.buffs[i]
			if(b.iconUrl && b.iconUrl!=''){
				bufficonX = panel.buffIcon(b.iconUrl, i, bufficonX)
			}
		}
	}

	private setTextColor(t:eui.Label, prop:string){
		const tmp = this._mc.ddata[prop]
		if(tmp > 0){
			t.textColor = 0x00e677
		}else if(tmp == 0){
			t.textColor = 0xFFFFFF
		}else if(tmp < 0){
			t.textColor = 0xdd2c00
		}
	}

	private onComplete(e:any=null){
		const panel = this
		panel.removeEventListener(eui.UIEvent.COMPLETE, panel.onComplete, panel)
		panel.btnClose.addEventListener("touchTap", panel.onClose, panel)
		panel.addEventListener("touchTap", panel.onClick, panel)
		panel.refresh()
	}

	private onClick(e:egret.TouchEvent){
		const panel = this
		const t = e.target
		let s:string = ''
		switch(t.name){
			case "containers1":
				s = panel._mc.skills[0].des
				break
			case "containers2":
				s = panel._mc.skills[1].des
				break
			case "containers3":
				s = panel._mc.skills[2].des
				break
			case "containers4":
				s = panel._mc.skills[3].des
				break
			case "container0":
				s = panel.tips["luck"]
				break
			case "container1":
				s = panel.tips["sense"]
				break
			case "container2":
				s = panel.tips["commu"]
				break
			case "container3":
				s = panel.tips["strength"]
				break
			case "container4":
				s = panel.tips["talk"]
				break
			case "container5":
				s = panel.tips["game"]
				break
			case "container6":
				s = panel.tips["sing"]
				break
			case "container7":
				s = panel.tips["tech"]
				break
			case "containereq":
				panel.dispatchEvent(new egret.Event(GameEvents.TO_CHOOSE_EQUIPMENT))
				return

			default:
				if(t.name.indexOf("buff_")>=0){
					const arr = t.name.split("_")
					const i =parseInt( arr[1])
					s = panel._mc.buffs[i].desStr
					break
				}

				panel.containerTips.visible = false
				return
		}
		panel.txtTips.text = s
		panel.containerTips.visible = true
		panel.containerTips.x = e.stageX - this.x
		panel.containerTips.y = e.stageY - this.y
	}

	private buffIcon(url:string, i:number, curx:number=0):number{
		let bmp = new egret.Bitmap()
		bmp.texture = RES.getRes(url) as egret.Texture
		bmp.name = 'buff_'+i
		this.buffContainer.addChild(bmp)
		const ch = this.height * (this.buffContainer.percentHeight/100)
		const scale = bmp.height/bmp.width
		bmp.height = ch * 0.8
		bmp.width = bmp.height/scale
		bmp.x = curx + 10
		bmp.y = (ch-bmp.height)/2
		bmp.touchEnabled = true
		return bmp.x + bmp.width
	}


	private onClose(e:egret.TouchEvent=null){
		this.dispatchEvent(new egret.Event(GameEvents.MENU_CANCEL))
		this.dispose()
	}
}