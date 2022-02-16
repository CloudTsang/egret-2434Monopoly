/**世界地图拖动控制 */
class DragController {
	private wm:egret.DisplayObject
	private lastX:number
	private lastY:number
	private stageW:number = egret.MainContext.instance.stage.stageWidth
	private stageH:number = egret.MainContext.instance.stage.stageHeight
	private dragcb:(v:boolean)=>void
	public constructor(wm:egret.DisplayObject, dragCB:(v:boolean)=>void=null) {
		this.wm = wm
		this.lastX = -1
		this.lastY = -1
		this.dragcb = dragCB
		wm.addEventListener("touchBegin", this.onDragStart, this)
	}

	private onDragStart(e:egret.TouchEvent){
		const wdc = this
		wdc.wm.addEventListener("touchMove", wdc.onDragging, wdc)
		wdc.wm.addEventListener("touchEnd", wdc.onDragEnd, wdc)
		wdc.lastX = e.stageX
		wdc.lastY = e.stageY
		wdc.dragcb && wdc.dragcb(true)
	}
	private onDragging(e:egret.TouchEvent){		
		const wdc = this
		if(wdc.lastX == -1){
			return
		}
		let wm = this.wm
		const dx = e.stageX - wdc.lastX
		const dy = e.stageY - wdc.lastY
		let nx = wm.x + dx
		let ny = wm.y + dy
		// if(nx<0)nx = 0
		// if(ny<0)ny = 0
		wm.x = nx
		wm.y = ny
		wdc.lastX = e.stageX
		wdc.lastY = e.stageY
	}
	private onDragEnd(e:egret.TouchEvent){
		let wm = this.wm
		const wdc = this
		wm.removeEventListener("touchMove", wdc.onDragging, wdc)
		wm.removeEventListener("touchEnd", wdc.onDragEnd, wdc)
		wm.addEventListener("touchBegin", wdc.onDragStart, wdc)
		wdc.lastX = -1
		wdc.lastY = -1
		wdc.dragcb && wdc.dragcb(false)
	}
}