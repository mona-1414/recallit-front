export function parseQueryString() {
	var str = window.location.search;
	var objURL = {};

	str.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
		if ($3){
		if ($3.includes("%%20")) {
			$3 = $3.split("%%20").join("%25%20");
		}
		if ($3[$3.length - 1].includes("%")) {
			const mod = [...$3];
			mod.push("25");
			$3 = mod.join("");
			objURL[$1] = $3;
		}
	}
			objURL[$1] = $3;
	});
	
	return objURL;
}





