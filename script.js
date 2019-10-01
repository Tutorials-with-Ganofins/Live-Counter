function result(channel_id)
{
	if (channel_id === "")
	{
		return alert("Please enter a Channel ID");
	}
	document.getElementById("channel_id").value = "";
	
	//for the request
	request_data(channel_id);
}

function request_data(channel_id)
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
			if(output.items[0].statistics["hiddenSubscriberCount"] === true)
			{
				console.log("Subscriber count is hidden by the channel");
			   	return document.getElementById("sub_count").innerHTML = "N/A";
			}
			document.getElementById("sub_count").innerHTML = output.items[0].statistics["subscriberCount"];
		}
		else if(this.readyState == 4)
		{
			return console.log(JSON.parse(this.responseText)["error"]["message"]);
		}
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id="+channel_id+"&key=AIzaSyAQ0PBQqW-kziiCIsOHwh8yCr6d-CzdJJc", true);
	xhttp.send();
	setTimeout(request_data(), 2500);
}


