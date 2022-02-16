class MechLock extends Buff{
	public constructor(mc:MainCharacter,t:number=1) {
		super(mc,t)
		this.name = "设备无效"
		this.time = [t,"S"]
	}
}