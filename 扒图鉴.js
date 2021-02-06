//https://wiki.biligame.com/pcr/%E5%88%86%E7%B1%BB:%E8%A7%92%E8%89%B2
var a = document.querySelectorAll(".mw-content-ltr li");
var out = "";
for (i = 0;i<a.length;i++){
	out += '"'+a[i].innerText+'",';	
}
console.log(out);