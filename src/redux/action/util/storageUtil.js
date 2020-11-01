export function saveItems(items) {
	for (const [ key, value ] of Object.entries(items)) {
		localStorage.setItem(key, value);
	}
}

export function removeItems(keys){
    for (const key of keys){
        localStorage.removeItem(key);
    }
}
