


function processTableOrd(tableOrd) {

  const tableSame = [...Array(35)].map(() => Array(2).fill(-1)); // 课程名表，用于比对相同课程名
  const tableColor = ["#ebb5cc", "#b2c196", "#edd492", "#fee5a3", "#e9daa3", "#ea7375", "#a286ea", "#776fdf", "#7bc6e6", "#efb293"]; // 颜色表，用于为不同课程名对应不同颜色
  const table = Array.from({length: 7}, () => Array.from({length: 5}, () => Array(5).fill([]))); // 课表，最外层是星期数，中间层是上课节数，最内层是课程信息数组
  
  let flagIColor = 0; // 颜色表下标，用于选取不同颜色
  
  for (let i = 0; i < tableOrd.length; i++) {
    // 如果这个元素是null，那么我们直接跳过这个元素，处理下一个元素
    if (tableOrd[i] === null) continue;
    
    // 我们还可以检查这个元素是否具有我们需要的所有属性
    if (!('kcmc' in tableOrd[i] && 'jsmc' in tableOrd[i] && 'jsxm' in tableOrd[i] && 'kcsj' in tableOrd[i])) continue;

    try {
      const kcmc = tableOrd[i]["kcmc"]; // 课程名称
      const jsmc = tableOrd[i]["jsmc"]; // 上课教室
      const jsxm = tableOrd[i]["jsxm"]; // 老师名称
      const kcsj = tableOrd[i]["kcsj"]; // 上课时间
      const kcsjDay = parseInt(kcsj[0]) - 1; // 上课星期数
    const kcsjTime = parseInt(kcsj.substring(3, 5)) / 2 - 1; // 上课节数
    
    // 将课程信息存入表格
    table[kcsjDay][kcsjTime][0] = kcmc; // 课程名称
    table[kcsjDay][kcsjTime][1] = jsmc; // 上课地址
    table[kcsjDay][kcsjTime][2] = jsxm; // 老师名称
    
    // 比对课程名，给不同课程名赋不同颜色
    for (let j = 0; j < tableSame.length; j++) {
      if (tableSame[j][0] === kcmc) {
        table[kcsjDay][kcsjTime][3] = tableSame[j][1];
        break;
      }
      if (tableSame[j][0] === -1) {
        tableSame[j][0] = kcmc;
        tableSame[j][1] = tableColor[flagIColor];
        flagIColor = (flagIColor + 1) % 10; // 颜色表长度为 10
        table[kcsjDay][kcsjTime][3] = tableSame[j][1];
        break;
      }
    }} catch (e) {
      // 异常处理
      console.error(e);
      }
}


  return table;

}

module.exports = {
  processTableOrd
};