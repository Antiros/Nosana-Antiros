mod.command.add('valk', () => {
		enabled = !enabled
		mod.command.message(`valk mod is now ${(enabled) ? 'en' : 'dis'}abled.`)
	})
	
	mod.hook('S_LOGIN', 14, (event) => {
		cid = event.gameId
	})
	
	mod.hook('S_WEAK_POINT', 1, (event) => {
		runes = event.runemarksAdded
	})	
	
	mod.hook('S_SKILL_CATEGORY', 4, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'glaiver') return
		if(event.category==category) {
			category_enabled = event.enabled
		}
		if(event.category==gun_cat) {
			gun_enab = event.enabled
		}		
		
	})
	
	mod.hook('S_START_COOLTIME_SKILL', 3, {order: -999999}, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'glaiver') return
		if(event.skill.id==overhead_id) {
			clearTimeout(isCD_overhead_timeOut)
			isCD_overhead = true
			isCD_overhead_timeOut = setTimeout(function () {
				isCD_overhead = false
			}, event.cooldown)
		}
