export function getWhenTime():string   {
    const hour = new Date().getHours();
    if(hour < 8)                    return "早上";
    else if(hour>=8 && hour<12)     return "上午";
    else if(hour>=12 && hour<13)    return "中午";
    else if(hour>=13 && hour<18)    return "下午";
    else                            return "晚上";
}