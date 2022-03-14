/**手游抽卡事件 
 * 氪一单 → 金钱减10000
 * 一单出货 → 离开 → 欧皇抽卡
 * 		   → 继续抽
 * 二-四单出货 → 离开 → 亚洲抽卡
 * 			 → 继续抽
 * 五单以上出货 → 离开 → 非酋抽卡
 * 			 → 继续抽
 * 十单以上出货 → 离开 → 泥沼抽卡
 * 			 → 继续抽
 * 恶魔计数>=3 → 禁止离开直至出货或氪十单以上
*/
class EventRealGacha extends MapEvent{
	/**出货率 */
	private _rate:number
	/**gacha回数 */
	private _gachaCounter:number
	/**首次出货时的gacha回数 */
	private _successed:number 
	/**恶魔逼氪后的出货时的gacha回数 */
	private _devilSuccessed:number
	/**是否恶魔逼氪中 */
	private _isdevil:boolean

	protected _ep:EvtPanel
	public constructor(obj:any) {
		super(obj)
	}

	public trigger(mc:MainCharacter, cell:CellData):EvtPanel|IDisposable{
		const ep = super.trigger(mc, cell) as EvtPanel
		const mp = this
		// ep.addEventListener(GameEvents.ACTION_CONFIRM, mp.onSelected, mp)
		mp._ep = ep as EvtPanel
		mp._gachaCounter = 0
		mp._rate = 5
		mp._successed = -1
		mp._devilSuccessed = -1
		mp._isdevil = false

		const cm:CustomMenu = ep.customMenu
		if(cm && mp._mc.money < 10000){
			cm.setItemsDisable(0, true)
			cm.setItemsDisable(1, false)
		}

		return ep
	}

	protected onSelected(e:egret.Event){
		const i = e.data.index
		switch(i){
			case 0:
				//氪一单
				this.gachaHandler()
				break
			case 1:
				//这次就算了
				this.onLeave()
				break
				
		}
	}

	protected gachaHandler(){
		const mp:EventRealGacha = this
		mp._gachaCounter ++
		if(mp._rate < 10) mp._rate += 1

		egret.Tween.get(this)
		.set({
			panelVisible:false
		})
		.call(()=>{
			const rollEvt = mp.selections[0].roll
			const evts:any[] = rollEvt.evt
			// mp._mc.money -= 10000
			let r:number = Roll.random2(rollEvt.range as number)

			let gachaResult
			let log
			if(r < mp._rate){
				if(mp._successed == -1)mp._successed = mp._gachaCounter
				if(mp._isdevil && mp._devilSuccessed == -1)mp._devilSuccessed = mp._gachaCounter
				gachaResult = evts[1].data
				log = evts[1].log
			}else{
				gachaResult = evts[0].data
				log = evts[0].log
			}
			const cm = mp._ep.customMenu
			if(cm && mp._mc.money<10000){
				cm.setItemsDisable(0, true)
				cm.setItemsDisable(1, false)
				log = evts[3].log
				mp._ep.modiflyContents(mp.name, log)
			}else{
				if(mp._isdevil){
					if(mp._gachaCounter >= 10 || mp._devilSuccessed != -1){
						cm.setItemsDisable(0, false)
						cm.setItemsDisable(1, false)
					}
				}else{
					mp._ep.modiflyContents(mp.name, log)
				}
			}

			// WorldMap.showRollNum(r, gachaResult)
			this.dispatchEvent(new RollEvent(r, gachaResult))
		})
		.wait(500)
		.set({
			panelVisible: true
		})
	}

	private onLeave(){
		const mp = this
		// console.log(mp._mc.edata.devil, mp._gachaCounter, mp._mc.money)
		const check1 = mp._gachaCounter>=10 || mp._devilSuccessed!=-1
		if(mp._mc.edata.devil >= 3
		&& mp._gachaCounter >= 1 
		&& mp._mc.money>=10000
		&& !check1
		){
			//恶魔逼氪处理
			mp._isdevil = true
			egret.Tween.get(mp)
			.to({
				panelVisible:false
			})
			.wait(200)
			.call(()=>{
				const cm = mp._ep.customMenu
				const log = mp.selections[0].roll.evt[2].log
				mp._ep.modiflyContents(mp.name, log)
				if(cm){
					cm.setItemsDisable(0, false)
					cm.setItemsDisable(1, true)
				}
			})
			.set({
				panelVisible: true
			})
			return
		}
		const getNeta = mp.getGachaNeta()
		if(!getNeta){
			mp._ep.dispose()
			mp._ep = null
			mp._mc = null
			mp.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
		}else{
			egret.Tween.get(mp)
			.set({
				panelVisible:false
			})
			.wait(200)
			.call(()=>{
				mp._mc.netaBag.modifyNeta(getNeta, "get", true)
			})
			.wait(1000)
			.call(()=>{
				mp._ep.dispose()
				mp._ep = null
				mp._mc = null
				mp.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
			})
		}
		
	}

	private getGachaNeta(){
		const ep = this
		if(ep._gachaCounter == 0){
			return null
		}
		if(ep._gachaCounter >= 10){
			return new Neta(ep.netas[3])
		}
		if(ep._successed == 1 && ep._gachaCounter == 1){
			return new Neta(ep.netas[0])
		}
		if(ep._successed != -1 && ep._gachaCounter < 5){
			return new Neta(ep.netas[1])
		}
		if(ep._successed == -1 && ep._gachaCounter < 10){
			return new Neta(ep.netas[2])
		}
		if(ep._successed != -1 && ep._gachaCounter >= 5){
			return new Neta(ep.netas[2])
		}
	}

	private set panelVisible(v:boolean){
		if(this._ep) this._ep.visible = v
	}
	private get panelVisible(){
		return this._ep && this._ep.visible
	}
}