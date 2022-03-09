class Roll {
	/**使用liver的luck值roll */
	public static random(mc:MainCharacter, prop:string='luck'){
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
