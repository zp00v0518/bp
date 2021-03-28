function addStatisticToForkResult(result, stat){
	result.forEach(item => {
		item.parseCount = stat.parseCount
	})
	return result
}

module.exports = addStatisticToForkResult;
