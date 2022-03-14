class SkillEvent extends egret.Event{
	constructor(skill:Skill){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'skill',
			skill:skill
		}
	}
}

class SkipEvent extends egret.Event{
	constructor(){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'skip'
		}
	}
}

class SubscribeEvent extends egret.Event{
	constructor(){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'subscribe'
		}
	}
}

class MoneyEvent extends egret.Event{
	constructor(){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'money'
		}
	}
}

class NpcEvent extends egret.Event{
	constructor(npcs:NpcObj[], cb?:()=>void){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'npc',
			npc:npcs,
			callback:cb
		}
	}
}

class RollEvent extends egret.Event{
	constructor(n:number, r:RollResult=''){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'roll',
			number:n,
			result:r
		}
	}
}

class ShowEvent extends egret.Event{
	constructor(obj:egret.DisplayObject|IDisposable|eui.Component, layer:"menu"|"top"){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'show',
			disp:obj,
			layer:layer
		}
	}
}

class GetNetaEvent extends egret.Event{
	constructor(n:Neta){
		super(GameEvents.STAT_CHANGE)
		this.data = {
			type:'neta',
			disp:n,
		}
	}
}