	//check internet connection of user thru server request
	function checkInternet(){
		//return true if internet is ok	
		//return false if intenet is not ok
		var x = false;
		$.ajax({
			url : 'http://rescuemakati.cloudapp.net/check',
			type : "GET",
			dataType: "JSON",
			async : false,
			success: function(data){
				x = true;

			},
			error : function(xhr, ajaxOptions, thrownError){
				x =  false;
			}
		});
		return x;
	}
	

	//show home tab
	function showTrack(x){
		$(".camera-div").hide();	
		$(".track-div").show();
		$(".tab").parent().removeClass("active");
		$(x).parent().addClass("active");
		initialize(); //map initialization
	}

	//show info tab
	function showCamera(x){
		$(".track-div").hide();	
		$(".camera-div").show();	
		$(".tab").parent().removeClass("active");
		$(x).parent().addClass("active");
	}


	//setting unit info
	function setUnitInfo(id, type, platenum){
		var unitinfo = {id : id, type : type, platenum : platenum};
		localStorage.unitinfo = JSON.stringify(unitinfo);
	}

	function setMapInfo(lat, lng, address){
		var mapinfo = {lat : lat, lng : lng, address : address};
		localStorage.mapinfo = JSON.stringify(mapinfo);
	}


	//retrieve unit info from localStorage.unitinfo
	function getUnitInfo(){
		return JSON.parse(localStorage.unitinfo);
	}


	function getMapInfo(){
		return JSON.parse(localStorage.mapinfo);
	}