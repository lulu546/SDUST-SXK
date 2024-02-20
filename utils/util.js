const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
//计算一周时间
const count_weekday = (cont) =>{
  
  var day2 = new Date();
  day2.setTime(day2.getTime());
  var data = day2.getFullYear()+"/" + (day2.getMonth()+1) + "/" + (day2.getDate());
  var weekList = [];
	var date_b = new Date(data);
	//判断本日期是否为周日，获取本周一日期
	if(date_b.getDay()=="0"){
		date_b.setDate(date_b.getDate() -6);
	}else {
		date_b.setDate(date_b.getDate() - date_b.getDay() + 1);
  }
  date_b.setDate(date_b.getDate() + cont*7);
	var thisday=date_b.getDate();
  var thismonth=date_b.getMonth() + 1;
  
	if(date_b.getDate()<10){
		thisday= '0'+ thisday;
	}
	if(date_b.getMonth() + 1<10){
		thismonth='0'+thismonth;
	}
	weekList.push({thismonth:thismonth, thisday:thisday});
	// 获取周二以后日期
	for(var i=0;i<6;i++) {
		date_b.setDate(date_b.getDate() + 1);
		thisday=date_b.getDate();
		thismonth=date_b.getMonth() + 1;
		if(date_b.getDate()<10){
			thisday= '0'+ thisday;
		}
		if(date_b.getMonth() + 1<10){
			thismonth='0'+thismonth;
		}
		weekList.push({thismonth:thismonth, thisday:thisday});
	}
	
	return weekList

  }
module.exports = {
  formatTime,
  formatNumber,
  count_weekday
}
