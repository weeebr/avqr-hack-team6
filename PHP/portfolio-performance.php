<?php
	header('Content-Type: application/json charset=utf-8');
	header('Accept: application/json');
	header('Access-Control-Allow-Origin: *');  
    header('Authorization: Bearer ' . $jwt_token);
	
	
	$data = json_decode(fetchData(), true);
	
	
	$value = $data['mwrrPeriods'][0]['value'];
	
	$map = array();
	
	if ($value < 0) {
		$map['status'] = 'loss';
	} else {
		$map['status'] = 'gain';
	}
	
	$map['value'] = abs($value);
	
	echo json_encode($map, JSON_PRETTY_PRINT);
		
	
	function c($data) {
		echo print_r($data);
	}
	
	//echo print_r($json);
	
	function fetchData() {
		$jwt_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJhdWQiOiJzYW5kYm94Iiwic3ViIjoicGFzY2FsLndlYmVyQHByb2R5bmEuY29tIiwiand0IjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKU1V6VXhNaUo5LmV5SmhkV1FpT2lKQlZrRk1UMUVpTENKemRXSWlPaUpTVXlJc0ltRjJjVjl5YjJ4bGN5STZXeUp5YjJ4bFgyRjNjMTkxYzJWeUlsMHNJbWx6Y3lJNklrcFhWRkJ5YjNacFpHVnlJaXdpWlhod0lqb3hOVFF4TnpZME9Ua3hMQ0pwWVhRaU9qRTFOREUzTlRBMU9URXNJbUYyWVd4dmNWOWlkVjlwWkNJNklqa2lMQ0pxZEdraU9pSm5jQzFXZEdWSFFuVlJRVXBSU1ZST2VuVjRRVVJCSWl3aVlYWnhYMkoxSWpvaVFVRkJJbjAuZ1JxVDU4OG5fRkFQVnZIdUwzbjhWUFlaVXE1bmxKRkVhb2NmaGUtdVNqall5aDV4SWY1NXF4S0xmTFdZMmNxRjhzeVB2QWxCS180WDVrZkowUHI5azZnOWF0cVRKdFpBbjRVRV9DQm9DNDRXa0pjYzV6SnBuTklmbHMwcDhMYnVyeDVxR2xmellaUDhtQlhVTWt0Wlk4ZW1RNmpRRXZxdUxmUWNSLTA2Y29tWWlta1dGY1FnMWMyb1ZMallzVWF2VF9YUXpGQTlBSFQwRWhKdHAzUFpsd3dSRy1idXdBb2FyOEQzbGlCQXpCNzlqclk5NHpuOThsOWFZSTdJZmtXSzRJWmtQMmk5RW5zTHU1SngzajdteTFfZXZ5aUpQRDNpQlhPcFFIMWpZN0sxT0NlamVXU2V6QUxYV2xqNVRYUlNXN3hJQVZua0l0cnlyWC1JMmN3b2d3IiwiaXNzIjoiSldUUHJvdmlkZXIiLCJzYi1pZCI6InhicmpkIiwiZXhwIjoxNTQxNzY0OTkxLCJpYXQiOjE1NDE3NTA1OTEsImp0aSI6ImVUaTgxMVZKSS1Venp2MUUyZXJsbXcifQ.3bLAqcFTsDKiReXg340zc60DMIr2oeY_bJ0kh1UhyQGO3IQBvvV8wLEme3Y6RHDjVxkZl8IeRHI1qSoiL6a8SWXBElpkuRq1XLhExUjKLW5mRRLP1f1WeTzc1gqSaXzVY4flkqq39VFZ4Z-l0yUYzMaOJHchFuypU-96J0YRmdZbX_A4-4umrOzBTICgk7KrEl9D0TatfCF3C4gA1AgiK2lDt4sXpXbppIhccTcK3bBbkxFMdSOI8USUoORnY3OBYU4p9ms8G1iPJ8x6MUHq_ecyWYCYfU6svG5_eELfoD9f2-u8gW7KO1oGUpBRJ4l6OErt2PseD1AxxlsgJii8uw';
		
		$base_url = 'https://api-xbrjd.emea.sandbox-test.avaloq.com';
		$url = $base_url . '/investment-management/portfolios/168781/mwrr?end_date=2018-01-28&periodicity=once&start_date=2017-12-28';
		
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