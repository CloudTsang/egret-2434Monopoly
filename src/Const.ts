class GameEvents{
	/**前往角色选择页面 */
	public static readonly TO_PLAYER_SELECT:string = 'TO_PLAYER_SELECT'
	/**游戏开始 */
	public static readonly GAME_START:string = 'GAME_START'
	/**游戏结束 */
	public static readonly GAME_FINISH:string = 'GAME_FINISH'
	/**返回标题 */
	public static readonly BACK2TITLE:string = 'BACK2TITLE'

	public static readonly VR_SWITCH:string = 'VR_SWITCH'
	public static readonly START_ROLL:string = 'START_ROLL'
	public static readonly ACTION_CONFIRM:string = 'ACTION_CONFIRM'
	public static readonly SHOW_LIVER_DETAIL:string = 'SHOW_LIVER_DETAIL'
	public static readonly SHOW_NETA_BAG:string = 'SHOW_NETA_BAG'
	public static readonly FOCUS2LIVER:string = 'FOCUS2LIVER'
	public static readonly PLAYER_READY:string = 'PLAYER_READY'

	public static readonly GAME:string = 'GAME'
	public static readonly SING:string = 'SING'
	public static readonly STUDY:string = 'STUDY'
	public static readonly WORK:string = 'WORK'
	public static readonly HANGOUT:string = 'HANGOUT'
	public static readonly REST:string = 'REST'
	public static readonly GAME_STREAM:string = 'GAME_STREAM'
	public static readonly SING_STREAM:string = 'SING_STREAM'
	public static readonly TALK_STREAM:string = 'TALK_STREAM'
	public static readonly PRESENT_STREAM:string = 'PRESENT_STREAM'
	public static readonly STREAM_PREPARE:string = 'STREAM_PREPARE'
	public static readonly STREAM_START:string = 'STREAM_START'
	public static readonly STREAM_END:string = 'STREAM_END'
	public static readonly WATCH:string = 'WATCH'

	public static readonly MENU_CANCEL:string = 'MENU_CANCEL'
	public static readonly STAT_CHANGE:string = 'STAT_CHANGE'
	/**触发技能 */
	public static readonly SKILL_TRIGGERED:string = 'SKILL_TRIGGERED'
	/**开始处理事件 */
	public static readonly EVENT_START:string = 'EVENT_START'
	/**事件处理完毕 */
	public static readonly EVENT_FINISH:string = 'EVENT_FINISH'
	public static readonly NETA_INFO_FINISH:string = 'NETA_INFO_FINISH'
	public static readonly NETA_CONFIRM:string = 'NETA_CONFIRM'

	/**道具效果处理完毕 */
	public static readonly DEVICE_FINISH:string = 'DEVICE_FINISH'
	public static readonly PLAYER_SELECTED:string = 'PLAYER_SELECTED'
	public static readonly PLAYER_SELECT_CANCEL:string = 'PLAYER_SELECT_CANCEL'

	/**直播炎上 */
	public static readonly STREAM_ENJO:string = 'STREAM_ENJO'
	/**直播事故 */
	public static readonly STREAM_ACCIDENT:string = 'STREAM_ACCIDENT'
}

class GamePhrase{
	/**回合开始 */
	public static readonly TURN_START = 'TURN_START'
	/**回合结束 */
	public static readonly TURN_END = 'TURN_END'
	/**滚骰子 */
	public static readonly DICE_ROLL = 'DICE_ROLL'
	/**使用道具 */
	public static readonly USE_ITEM = 'USE_ITEM'
	/**获得neta */
	public static readonly GET_NETA = 'GET_NETA'
	/**选择前 */
	public static readonly BEFORE_SELECT = 'BEFORE_SELECT'
	/**选择后*/
	public static readonly AFTER_SELECT = 'AFTER_SELECT'

	/**行动前 */
	public static readonly BEFORE_ACTION = 'BEFORE_ACTION'
	/**行动中 */
	public static readonly IN_ACTION = 'IN_ACTION'
	/**行动后 */
	public static readonly AFTER_ACTION = 'AFTER_ACTION'

	/**直播前 */
	public static readonly BEFORE_STREAM = 'BEFORE_STREAM'
	/**直播中 */
	public static readonly IN_STREAM = 'IN_STREAM'
	/**直播中使用neta */
	public static readonly USE_NETA = 'USE_NETA'
	/**联动直播中 */
	public static readonly IN_STREAM_COLLABO = 'IN_STREAM_COLLABO'
	/**solo直播中 */
	public static readonly IN_STREAM_SOLO = 'IN_STREAM_SOLO'
	/**直播后 */
	public static readonly AFTER_STREAM = 'AFTER_STREAM'
	/**发生直播事故时 */
	public static readonly STREAM_ACCIDENT = 'STREAM_ACCIDENT'
	/**发生炎上时 */
	public static readonly STREAM_ENJO = 'STREAM_ENJO'

	/**npc好感度上升 */
	public static readonly NPC_UP = 'NPC_UP'
	/**npc好感度下降 */
	public static readonly NPC_DOWN = 'NPC_DOWN'
	/**触发商店事件 */
	public static readonly GO_SHOPPING = 'GO_SHOPPING'
	/**随机结果判定 */
	public static readonly ROLL_RESULT = 'ROLL_RESULT'

}

class EffectType{
	/**获得neta */
	public static readonly GET_NETA = "GET_NETA"
	/**获得neta */
	public static readonly LOSE_NETA = "LOSE_NETA"
	/**获得buff */
	public static readonly GET_BUFF = 'GET_BUFF'
	/**移除buff */
	public static readonly REMOVE_BUFF = 'REMOVE_BUFF'
	/**数值变化 */
	public static readonly STAT_CHANGE = 'STAT_CHANGE'
	/**临时性数值变化 */
	public static readonly TEMP_STAT_CHANGE = 'TEMP_STAT_CHANGE'
	/**显示选项 */
	public static readonly SHOW_MENU = 'SHOW_MENU'
	/**显示对话框 */
	public static readonly SHOW_LOG = 'SHOW_LOG'
	/**粉丝转移 */
	public static readonly SUBS_TRAN = 'SUBS_TRAN'
	/**播放音效 */
	public static readonly PLAY_BGS = 'PLAY_BGS'
}

enum LiverStat{
	NORMAL,
	FIRE,
	BAN,
}

enum NetaType{
	TALK,
	GAME,
	SONG,
	SPEC,
	PRESENT,
	DEVICE
}

/**neta菜单使用场景 */
enum PanelType{
	/**配信neta */
	STREAM,
	/**商店*/
	SHOP,
	/**稻草人商店 */
	SHOP2,
	/**一览*/  
	NORMAL
}

class SkillType{
	public static readonly POSITIVE:string = 'POSITIVE'
	public static readonly NEGATIVE:string = 'NEGATIVE'
	public static readonly HIDDEN:string = 'HIDDEN'
}

class RollResult{
	public static readonly BIG_SUCCESS = 'BIG_SUCCESS'
	public static readonly SUCCESS = 'SUCCESS'
	public static readonly NORMAL = 'NORMAL'
	public static readonly FAIL = 'FAIL'
	public static readonly BIG_FAIL = 'BIG_FAIL'
	
}

class StreamType{
	/**歌回，选取至少5个歌neta，事故和炎上率降低*/
	public static readonly SING='SING'
	/**游戏直播,选取1个游戏neta，其他neta不限,事故率上升炎上率降低*/
	public static readonly GAME='GAME'
	/**杂谈直播，选取至少3个游戏、歌以外的neta，事故率降低炎上率上升*/
	public static readonly TALK='TALK'
	/**披露回，选取一个披露neta，事故和炎上率降低，直播效果上升*/
	public static readonly PRESENT='PRESENT'
}

/**道具效果对象 */
class EffectTarget{
	/** 使用者*/
	public static readonly SELF = 'SELF'
	/** 使用者(需要隐藏菜单)*/
	public static readonly SELF_ROLL = 'SELF_ROLL'
	/** 全玩家*/
	public static readonly ALL = 'ALL'
	/** 选择一个其他玩家*/
	public static readonly SELECT_ONE = 'SELECT_ONE'	
	/** 所有玩家中选择一个*/
	public static readonly ALL_SELECT_ONE = 'ALL_SELECT_ONE'	
	/** 全部其他玩家*/
	public static readonly OTHER_ALL = 'OTHER_ALL'
	/** 全玩家中随机一个*/
	public static readonly RANDOM_ONE = 'RANDOM_ONE'
	/** 其他玩家中随机一个*/
	public static readonly OTHER_RANDOM_ONE = 'OTHER_RANDOM_ONE'
	/** 选择一个NPC*/
	public static readonly SELECT_ONE_NPC = 'SELECT_ONE_NPC'
	/** 随机一个NPC*/
	public static readonly RANDOM_ONE_NPC = 'RANDOM_ONE_NPC'
	/** 一格内全部NPC*/
	public static readonly ALL_NPC = 'ALL_NPC'
}

enum GameMode{
	/**本地多人 */
	LOCAL_MULTI,
	/**单人*/
	SINGLE 
}
