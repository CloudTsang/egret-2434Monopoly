class Rion extends MainCharacter{
	public data:RionData;
	public constructor(obj:any, index:number) {
		super(obj, index)
		this.data.niceClip = 0
	}
}

interface RionData extends CData{
	/**好用的切片计数 */
	niceClip:number
}