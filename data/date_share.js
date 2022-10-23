const set_all = () => {
  var set_all_data={
    isbindshareflag:true,//是否绑定分享
    isshareshow:true,    //是否显示分享
    islogin:wx.getStorageSync('islogin')         //是否绑定课表
  };

  return  set_all_data
}

const weekord_schedule = () => {
  var week_ordinal=2    //周数
  return  week_ordinal
}
module.exports = {
  set_all,
  // table_schedule,
  weekord_schedule
}