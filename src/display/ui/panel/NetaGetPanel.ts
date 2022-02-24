class NetaGetPanel extends eui.Component  implements IDisposable {
	private static netas:Neta[] = []
	private static panel:NetaGetPanel
	public static addNetaToShow(n:Neta){
		NetaGetPanel.netas.push(n)
		let p = NetaGetPanel.panel
		if(p==null){
			p = new NetaGetPanel()
			NetaGetPanel.panel = p
		}
		return p
	}


	private img:eui.Image
	private imgType:eui.Image
	private txtName:eui.Label
	private txtDes:eui.Label
	private txtPop:eui.Label
	private txtSafe:eui.Label
	private txtMeme:eui.Label
	private statContainer:eui.Group
	private iconGet:eui.Image
	private iconGift:eui.Group
	private oriX:number

	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/netapanel.exml'
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
	}

	protected createChildren(){
		super.createChildren()
		this.oriX = this.x
	}


	public dispose(){
		this.parent && this.parent.removeChild(this)
		this.dispatchEvent(new egret.Event( GameEvents.NETA_INFO_FINISH))
		NetaGetPanel.panel = null
	}

	private onAdded(e:any=null){
		this.onShowNeta()
	}

	private onShowNeta(){
		const panel = this
		if(NetaGetPanel.netas.length == 0){
			this.dispose()
			return
		}
		const n = NetaGetPanel.netas[0]
		panel.txtName.text = n.name
		panel.txtDes.text = n.des
		panel.iconGift.visible = n.owner!=null

		panel.imgType.source = RES.getRes(panel.getTypeIcon(n.type))
		if(n.iconUrl && n.iconUrl != ''){
			panel.img.source = RES.getRes(n.iconUrl)
		}
		const sw = panel.oriX
		egret.Tween.get(panel)
		.set({
			x: sw
		})
		.to({
			x: (sw - panel.width)/2
		}, 200)
		.wait(2000)
		.to({
			x: -panel.width
		}, 200)
		.set({
			x:sw
		})
		.call(()=>{
			NetaGetPanel.netas.shift()
			this.onShowNeta()
		})
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
		}
	}
}