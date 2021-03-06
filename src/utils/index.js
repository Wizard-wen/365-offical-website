/**
 * 
 */
import Vue from 'vue'


export var $utils =  {
    /**
     * 时间戳格式转换
     * @param date date类型的时间
     * @param fmt 日期格式 "yyy-MM-dd hh:mm:ss"
     */
    formatDate(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        

        for (var k in o){
            if (new RegExp("(" + k + ")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? 
                    (o[k]) : 
                    (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    //获取字符串长度（汉字算两个字符，字母数字算一个）
    getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {//\x00-\xff→GBK双字节编码范围
                len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    },
    /**
     * 将对象转换成get查询参数
     * @param searchForm 
     */
    changeObjectToPathString(searchForm){
        let url = '?'
        Object.keys(searchForm).forEach(element => {

            if(typeof searchForm[element] == 'string' || typeof searchForm[element] == 'number'){
                url = url + element + '=' + searchForm[element] + '&'
            }
        });
        return url
    }
}
