class NetaPanel extends eui.Component  implements IDisposable{
	private img:eui.Image
	private imgType:eui.Image
	private txtName:eui.Label
	private txtDes:eui.Label
	private txtPop:eui.Label
	private txtSafe:eui.Label
	private txtMeme:eui.Label
	private txtHold:eui.Label
	private txtSongTip:eui.Label
	private statContainer:eui.Group
	private dataContainer:eui.Group
	private btn:eui.Button

	private _neta:Neta
	private _shop:boolean
	public constructor(isprepare:boolean=false, isShop:boolean=false) {
		super()
		this._shop = isShop
		this.skinName = 'resource/eui_skins/netapanel2.exml'
	}

	public setType(isShop:boolean){
		this._shop = isShop
		this.btn.labelDisplay.text = this._shop?'购买':'使用'
	}

	protected createChildren(){
		super.createChildren()
		if(!this._neta){
			this.visible = false
		}
		this.btn.labelDisplay.text = this._shop?'购买':'使用'
	}

	public dispose(){
		this.btn.addEventListener("touchTap", this.onBtnClicked, this)
		this.parent && this.parent.removeChild(this)
	}

	public setNeta(n:Neta){
		const panel = this
		panel.visible = true
		panel._neta = n
		panel.txtName.text = n.name
		if(n.name.length >= 9) panel.txtName.size = 24
		else panel.txtName.size = 30
		panel.txtDes.text = n.des
		if(n.type == NetaType.DEVICE || n.type == NetaType.EQUIPMENT){
			panel.statContainer.visible = false
		}else{
			panel.statContainer.visible = true
			panel.txtPop.text = ""+n.pop
			panel.txtSafe.text = ""+(n.safe==-1?'--':n.safe)
			panel.txtMeme.text = ""+n.meme
		}
		panel.imgType.source = RES.getRes(panel.getTypeIcon(n.type))
		if(n.iconUrl && n.iconUrl != ''){
			panel.img.source = RES.getRes(n.iconUrl)
		}
		if(n.type == NetaType.SONG){
			//歌曲neta是否冷却中
			panel.txtSongTip.visible = !(n as SongNeta).usable
		}else{
			panel.txtSongTip.visible = false
		}
	
		if(panel._shop){
			panel.btn.visible = true
			panel.txtHold.visible = true
		}else{
			if(n.type == NetaType.DEVICE){
				panel.btn.visible = (n as Device).useable
				panel.btn.enabled = n.times > 0
				panel.btn.labelDisplay.text = panel._shop?'购买':'使用'
			}
			else if(n.type == NetaType.EQUIPMENT){
				if(panel._shop){
					panel.btn.enabled = n.times > 0
					panel.btn.labelDisplay.text = '购买'
				}else if((n as Equipment).isEquipped){
					panel.btn.enabled = false
					panel.btn.labelDisplay.text = '已装备'
				}else{
					panel.btn.enabled = true
					panel.btn.labelDisplay.text = '装备'
				}
			}
			else{
				panel.btn.visible = false
			}
			panel.txtHold.visible = false
		}
		panel.btn.addEventListener("touchTap", panel.onBtnClicked, panel)
	}

	protected onBtnClicked(e:egret.Event){
		let evt = new egret.Event(GameEvents.NETA_CONFIRM)
		evt.data = {
			neta:this._neta
		}
		this.dispatchEvent(evt)
	}

	public setBtnEnable(v){
		if(v){
			this.btn.enabled = true
		}else{
			this.btn.enabled = false
		}
	}

	public setHold(n){
		if(n==0){
			this.txtHold.visible = false
		}else if(n == -1){
			this.txtHold.visible = true
			this.txtHold.text = '已持有'
		}else{
			this.txtHold.visible = true
			this.txtHold.text = `持有数\n${n}`
		}
	}

	private getTypeIcon(t:NetaType){
		switch(t){
			case NetaType.GAME:
				return "icons_json#game"
			case NetaType.TALK:
				return "icons_json#daily"
			case NetaType.SONG:
				return "icons_json#song"
			case NetaType.SPEC:
				return "icons_json#spec"
			case NetaType.DEVICE:
				return "icons_json#device"
			case NetaType.PRESENT:
				return "icons_json#present"
			case NetaType.EQUIPMENT:
				return "icons_json#equipment"
		}
	}
}