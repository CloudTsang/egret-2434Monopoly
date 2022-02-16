/**npc的liver基类 */
class Npc extends Liver{
	/**对4个玩家角色的好感度数组 */
	public fan:number[]
	public constructor() {
		super()
		this.fan = [1,1,1,1]
	}
}