"use strict";

const timeFunction = {
    getCurrentDate: function(){
        return (new Date()).toLocaleDateString().split('.').reverse().join('-');
    },
    getYesterdayDate: function(){
        const date = new Date().toLocaleDateString().split('.');
        const year = date[2];
        const month = date[1];
        const day = date[0] - 1;

        return `${year}-${month}-${day}`;
    },
    createDate: function(strDate){
        return strDate.split(strDate[4]).map((value, index)=>{
            if(value.length === 1){
                return '0' + value;
            }
            else return value;
        }).join('-');
    }
}

module.exports = timeFunction;
