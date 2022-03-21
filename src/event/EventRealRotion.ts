/**简单的得到指定neta的事件 */
class EventRealGetSpecNeta extends MapEvent {

	public constructor(obj:any) {
		super(obj)
	}

	protected onLogTap(e:egret.Event){
		const lp:EvtLog = e.currentTarget
		lp.dispose()

		const neta = NetaFactory.getNetaFromObj(this.netas[0])
		const ngp:NetaGetPanel = this._mc.netaBag.modifyNeta(neta, "get", true)
		ngp.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onNetaRemoved, this)
	}

	private onNetaRemoved(e:eui.UIEvent){
		this._mc = null
		const ngp:NetaGetPanel = e.currentTarget
		ngp.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onNetaRemoved, this)
		this.dispatchEvent(new egret.Event(GameEvents.EVENT_FINISH))
	}
}