/**对象基类 */
class BaseObj extends egret.EventDispatcher{
	public ID:string
	/**图标url */
	public iconUrl:string
	/**名字 */
	public name:string
	/**描述 */
	public des:string
	public constructor() {
		super()
	}
}