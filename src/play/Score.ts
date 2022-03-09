class Score {
	public constructor() {
	}
}

interface IScore{
	/**名字 */
	name:string
	/**头像 */
	iconUrl:string
	/**订阅数 */
	sub:number
	/**直播次数 */
	stream:number
	/**最要好的npc */
	cpLiver?:string
	/**手游氪金单数 */
	gacha?:number
	/**帕青哥收入 */
	pckWin?:number
	/**召唤恶魔次数 */
	devil?:number
}