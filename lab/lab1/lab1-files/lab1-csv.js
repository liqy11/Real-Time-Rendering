
var has_data = false;
var data;
var has_avgs = false;
var avgs = [];

var avgs_all = new Array(15);
function set_data(lines) {
    data = lines;
    has_data = true;
} 
function draw_bars(draw_k)
{
	avgs = [];  
	kind = draw_k;
	for (var i=0; i<data.length; i++) {
	for (var j=0; j<data[i].length; j++) {
		 if (i==0) { tmp = 0; avgs.push(tmp); }
	    else {
		if (j==0) avgs[j] = 0; 
		else 
			{
				if(draw_k == 0)
				{
					if(data[i][0] == "setosa")
					avgs[j]+=Number(data[i][j]); 
				}
				 if(draw_k == 1)
				{
					if(data[i][0] == "versicolor")
					avgs[j]+=Number(data[i][j]); 
				}
				if(draw_k = 2)
				{
					if(data[i][0] == "virginica")
					avgs[j]+=Number(data[i][j]); 

				}
				
	   		} 
		} 
    }
}
    for (var j = 0; j <data[0].length; j++) {
	avgs[j] = avgs[j]/(data.length-1); 
	console.log(" column "+j+" Avg = "+avgs[j]); 

    }

    has_avgs = true;

    createBarVertices(avgs); 
}

function draw_all()
{	 var total = [0,0,0];
	 for(var i = 0; i < avgs_all.length; i++)
	 	avgs_all[i] = 0;
	 console.log("avgs num"+ avgs_all.length);
	 for (var i=0; i<data.length; i++) {
		for (var j= 0; j< data[i].length; j++) {
				if (j == 0) continue; 
				if(data[i][0] == "setosa")
				{
					total[0]++;
					avgs_all[0 * 5 + j] += Number(data[i][j]);
				}
				 
				if(data[i][0] == "versicolor")
				{
					total[1]++;
					avgs_all[1* 5 + j] += Number(data[i][j]); 
				}
				
				if(data[i][0] == "virginica")
				{
					total[2]++;
					avgs_all[2 * 5 + j] += Number(data[i][j]);
				}
			}
		}
	for(var i = 0; i < 3; i++){
	    for (var j = 0; j <data[0].length; j++) {
			avgs_all[i * 5 + j] = avgs_all[i * 5 + j]/(total[i]); 
			console.log(" column "+j+" Avg = "+avgs_all[i * 4 + j]); 
	}

}
 console.log("avgs num"+ avgs_all.length);
    has_avgs = true;
    kind = 3;
    createBarVertices(avgs_all); 
}





