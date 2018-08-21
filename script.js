function result(){
	var channel_name = "";
	var sub_count = "";
	var channel_id = document.getElementById("channel_id").value;
	var xhttp = new XMLHttpRequest();
				
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
				var output = this.responseText;
				output = JSON.parse(output);
				channel_name = output.items[0].snippet["title"];
				sub_count = output.items[0].statistics["subscriberCount"];
				document.getElementById("channel_name").innerHTML = channel_name;
				document.getElementById("sub_count").innerHTML = sub_count;
			}
		};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id="+channel_id+"&key=AIzaSyCBgy9GTrM6PCPAgYwnX_vqZpjiVa5TtC8", true);
	xhttp.send();
	setTimeout(result,1000);
}
