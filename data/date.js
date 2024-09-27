"use strict";

const timeFunction = {
    getCurrentDate: function () {
        const date = new Date();

        const year = date.getFullYear();
        
        const month =
            (date.getMonth() + 1).toString().length === 1
                ? `0${date.getMonth() + 1}`
                : 
date.getMonth() + 1;
        
        const day =
            (date.getDate() + 1).toString().length === 1 ? `0${date.getDate()}` : date.getDate();

        return `${year}-${month}-${day}`;
    },
    getYesterdayDate: function () {
        const date = new Date();

        const year = date.getFullYear();
        
        const month =
            (date.getMonth() + 1).toString().length === 1
    ? 
`0${date.getMonth() + 1}`
: date.getMonth() + 1;
        const day =
            date.getDate().toString().length === 1
                ? `0${date.getDate() - 1}`
                : 
date.getDate() - 1;

        return `${year}-${month}-${day}`;
    },
    createDate: function (strDate) {
        return strDate
            .split(strDate[4])
            .map((value, index) => {
                if (value.length === 1) {
                    return "0" + value;
                } else return value;
            })
            .join("-");
    },
};

export default timeFunction;
