/**防止炎上，一次直播全程有效 */
class EnjoGuard extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '神的加运(炎)'
		this.des = '直播中不会发生炎上'
		this.iconUrl = "icons_json#fireguard"
		this.time = [t,'S']
	}
}

/**防止炎上，生效一次 */
class EnjoGuardLite extends Buff{
	public constructor(mc:MainCharacter, t:number=1) {
		super(mc, t)
		this.name = '防火盾'
		this.des = '直播中防止一次炎上'
		this.iconUrl = ""
		this.time = [t,'E']
	}
}