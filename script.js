function result(channel_id)
{
	if (channel_id === "")
	{
		return alert("Please enter the Channel ID");
	}
	document.getElementById("channel_id").value = "";
	
	//for the request
	request(channel_id);
}

function request(channel_id)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			var output = this.responseText;
			output = JSON.parse(output);
			document.getElementById("channel_name").innerHTML = output.items[0].snippet["title"];
			document.getElementById("sub_count").style.display = "inline";
			document.getElementById("sub_count").innerHTML = output.items[0].statistics["subscriberCount"];
		}
		else if(this.readyState == 4)
		{
			return console.log(JSON.parse(this.responseText)["error"]["message"])
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id="+channel_id+"&key=AIzaSyCBgy9GTrM6PCPAgYwnX_vqZpjiVa5TtC8", true);
	xhttp.send();
	setTimeout(request(), 1000);
}
