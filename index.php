<!DOCTYPE html>
<html>
	<head>
	</head>
	<body style="margin:0px; background-color:blue;">
		<center>
			<div>
				<span style="font-size:100px; margin:5px; color:white;">Live Sub Counter</span><br><br><br><br>
			</div>
			<div>
				<form>
					<input type="text" name="results" placeholder="Enter the Name of Channel..." style="width:500px; height:40px; padding-left:7px;">
					<button onclick="sub()" style="width:180px; height:50px;">Show Realtime Sub Count</button>
				</form><br><br><br><br><br>
				<div style="background-color:red; color:white;">
					<span id='sub' style="font-size:70px; "></span>
				</div>
			</div>
		</center>
		<script>
			function sub(){
				'<?php
					require_once('simple_html_dom.php');
					
					$search = $_GET["results"]; 
					$ch = curl_init();
					$url = "https://www.youtube.com/results?sp=EgIQAg%253D%253D&search_query=".$search;
					curl_setopt($ch, CURLOPT_URL, $url);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
					//curl_setopt($ch, CURLOPT_HEADER, 1);
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
					$data = curl_exec($ch);
					curl_close($ch);
					
					//echo $data;
					//$html = str_get_html($data);
					$html = new simple_html_dom();
					$html->load($data);
					$list = $html -> find('ol[class=item-section]')[0];
					$channel = $list -> find('div[class=yt-lockup]')[0];
					$channel = $channel -> find('div[class=yt-lockup-content]')[0];
					$channel = $channel -> find('h3')[0];
					$channel_link = $channel -> find('a')[0];
					$channel_link = $channel_link -> href;
					$url2 = "https://www.youtube.com".$channel_link;
					
					$ch2 = curl_init();
					curl_setopt($ch2, CURLOPT_URL, $url2);
					curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
					curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, 0);
					$data2 = curl_exec($ch2);
					curl_close($ch2);
					
					//echo $data2;
					
					$html2 = new simple_html_dom();
					$html2->load($data2);
					//$html2 = str_get_html($data2);
					//echo $html2;
					$body = $html2 -> find('div[id=body-container]')[0];
					$body = $body -> find('div[id=content]')[0];
					$body = $body -> find('div[class=branded-page-v2-top-row]')[0];
					$body = $body -> find('div[id=c4-primary-header-contents]')[0];
					$subscriber_count = $body -> find('span[class=yt-subscription-button-subscriber-count-branded-horizontal]')[0];
					$subscriber_count = $subscriber_count -> title;
					//echo $subscriber_count;
				?>'
			}
		var a = '<?php echo $subscriber_count; ?>';
		
		document.getElementById("sub").innerHTML = a;
		</script>
	</body>
</html>
