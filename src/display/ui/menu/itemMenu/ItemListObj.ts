class ItemListObj extends eui.ItemRenderer{
	protected itemIcon:eui.Image
	protected txtName:eui.Label
	protected txtNum:eui.Label
	protected checkbox:eui.CheckBox
	public constructor() {
		super();
		this.touchEnabled  = true
		this.skinName = 'resource/eui_skins/itemListObj.exml';
	}

	protected dataChanged(){
		super.dataChanged()
		if(this.txtNum.text == '-1'){
			this.txtNum.text = '∞'
		}
		const neta:Neta = this.data.neta
		if(neta.type == NetaType.SONG){
			if((neta as SongNeta).usable){
				this.currentState = 'up'
				this.checkbox.enabled = true
			}else{
				this.currentState = 'disabled'
				this.checkbox.enabled = false
			}
		}else{
			this.enabled = neta.times != 0
		}
	}
}


class ItemListNormalObj extends ItemListObj{
	protected checkboxContainer:eui.Group
	public constructor() {
		super();	
	}

	protected createChildren(){
		super.createChildren()
		this.checkboxContainer.removeChild(this.checkbox)
		this.checkboxContainer.percentWidth = 3
	}
}

class ItemListBuyObj extends ItemListNormalObj{
	public constructor() {
		super();	
	}
	protected dataChanged(){
		super.dataChanged()
		this.txtNum.text = '$'+this.data.neta.value
		const v = this.data.holded && this.data.neta.times == -1 || this.data.neta.times == 0 || this.data.valueLock
		this.currentState = v?"disabled":'up'
	}
}

