<?php
	header('Content-Type: application/json charset=utf-8');
	header('Accept: application/json');
	header('Access-Control-Allow-Origin: *');  
    header('Authorization: Bearer ' . $jwt_token);
	
	
	$data = json_decode(fetchData(), true);
	
	$data = array_reverse($data);
	
	
	
	
	echo json_encode($data, JSON_PRETTY_PRINT);
		
	
	function c($data) {
		echo print_r($data);
	}
	
	//echo print_r($json);
	
	function fetchData() {
		$jwt_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJhdWQiOiJzYW5kYm94Iiwic3ViIjoicGFzY2FsLndlYmVyQHByb2R5bmEuY29tIiwiand0IjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKU1V6VXhNaUo5LmV5SmhkV1FpT2lKQlZrRk1UMUVpTENKemRXSWlPaUpTVXlJc0ltRjJjVjl5YjJ4bGN5STZXeUp5YjJ4bFgyRjNjMTkxYzJWeUlsMHNJbWx6Y3lJNklrcFhWRkJ5YjNacFpHVnlJaXdpWlhod0lqb3hOVFF4TnpjeE56QTFMQ0pwWVhRaU9qRTFOREUzTlRjek1EVXNJbUYyWVd4dmNWOWlkVjlwWkNJNklqa2lMQ0pxZEdraU9pSjRjelpyVEhwbGVITkhNVE5JVUZOM1pUVkNOVGxuSWl3aVlYWnhYMkoxSWpvaVFVRkJJbjAuSG1VXy1oS0dyZEhIdjlpNFNSSTFIaW9mWHNiVHNOZHAxTnZ2SVozNVI1aGRJMWhFQ0dIOElBbmhneWNPVGtYOUlDU253NmVxVWY4T3NMaWxZNkFyZTJJZXh6OUxUV3gyQ0dieURwS0dDcXVORVJhcFRrbkJxNFh4bHE1ZlpEMFM1SjVVZFhvOTljWTkwT2Q2eW1YX1FRR0c1Z2w5S3lyTHBidFphS01YRmdXdU1tQ1g1RFR2Q1ZGU3QyRk94d0N5U29GMno5VlFiNVg2T0IwOFlTMTZCMUo3WVNqR0lmRmFiOHdRU0NaSU5BMHhPRXc0N0o5bnlIN0M3Ti15eFZfRTR5VFY4d2FyajVYWTJoZDhEa2h1R055OEpRdjRMWDhCSnVqQ0FHT2VBVDZDYmdPemFSUG9NcGJRWlppQnlSMGFmTFlQd252QzhOeUVWVWg5Vk1weGh3IiwiaXNzIjoiSldUUHJvdmlkZXIiLCJzYi1pZCI6InhicmpkIiwiZXhwIjoxNTQxNzcxNzA1LCJpYXQiOjE1NDE3NTczMDUsImp0aSI6IjRZWFNDd09lWFluWi1lQjBhNENsUWcifQ.rH2UOhhriCy-RDIpohruvzSzZmiQQt9or77Qsh6o_U6j2lypziE8JWxeuK985zrKxQW5qM4dLYI2a5ZuI9ZA1Cd53EInHGtzOd2JTTxZwdzqYPctctP9KgwH7iAYcZOZDuHCH4aSmm_U6IHCPuOcTHaS_MXClvJv_OmHnntRVWK1KjP7fpANzROlFdpnFBZeTKd4KwYWGlw1x0-QkZEnxsGmXPJDtr-sUGpFgaVsGGs5ZLYndKSmmF68MI5qJgqUPO_Wd_fA_7nM_P14P51hloo9DdPtTpjR2dCoOly0UwczhTvQKSeFP87hENyx7JCPqskrICqTRX3jS1O6m13GGg';
		
		$base_url = 'https://api-xbrjd.emea.sandbox-test.avaloq.com';
		$url = $base_url . '/wholesale-trading/securities-orders/orders';
		
		$opts = array(
		  'http'=>array(
			'method'=>"GET",
			'header'=>"Authorization: Bearer " . $jwt_token . "\r\n" .
					  "Content-Type: application/json\r\n"
		  )
		);
		
		$context = stream_context_create($opts);
		
		return file_get_contents($url, false, $context);
	}
?>