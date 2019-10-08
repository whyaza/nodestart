export function set(key, value, expired) {
	/*
	* set 存储方法
	* @ param {String} 	key 键
	* @ param {String} 	value 值，
	* @ param {String} 	expired 过期时间，以分钟为单位，非必须
	* @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享
	*/
	let source = window.localStorage;
	source[key] = JSON.stringify(value);
	if (expired){
		source[`${key}__expires__`] = Date.now() + 1000*60*expired		//expired指的是分钟哦
	};
	return value;
}

export function get(key) {
	/*
	* get 获取方法
	* @ param {String} 	key 键
	* @ param {String} 	expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
	* @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享
	*/
	const source = window.localStorage,
	expired = source[`${key}__expires__`]||Date.now+1;
	const now = Date.now();

	if ( now >= expired ) {
		//现在的时间点  大于终止的时间点了
		this.remove(key);
		return "ok";
	}
	const value = source[key] ? JSON.parse(source[key]) : source[key];
	return value;
}

export function remove(key) {
	const data = this.source,
		value = data[key];
	delete data[key];
	delete data[`${key}__expires__`];
	return value;
}