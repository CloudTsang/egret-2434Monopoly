class Roll {
	/**使用liver的luck值roll 
	 * @param prop 影响roll数值的属性名
	 * @param resultNeeded 是否使用结果判定，传入true的场合将触发liver的结果判定相关技能
	*/
	public static random(mc:MainCharacter, prop:string='luck', resultNeeded:boolean = false){
		if(!prop || prop == "") prop="luck"
		//test
		// if(window['lock'] == true){
		// 	return {n:19, r:RollResult.BIG_FAIL}
		// }
		// if(mc.ID != 'sasaki'){
		// 	return {n:5, r:RollResult.BIG_FAIL}
		// }
		// return {n:1,r:RollResult.BIG_FAIL}
		const n = Math.floor(Math.random() * (4+mc.data[prop]))+1
		let r = ""
		if(n >= 10){
			r = RollResult.BIG_SUCCESS
		}else if(n >= 6){
			r = RollResult.SUCCESS
		}else if(n >= 3){
			r = RollResult.NORMAL
		}else if(n == 2){
			r = RollResult.FAIL
		}else if(n == 1){
			r = RollResult.BIG_FAIL
		}
		if(resultNeeded){
			const trigger = mc.checkIfSkillsTriggered(GamePhrase.ROLL_RESULT, Roll.random3())
			r = trigger.triggerRollResult(r)
		}
		
		return {
			n, r
		}
	}

	/**普通的roll 1-6 */
	public static random2(n:number=6){
		return Math.round(Math.random()*n)
	}

	/**最普通的roll */
	public static random3(){
		return Math.random()
	}
}
