export function getDate(date){
    var d = new Date(date * 1000);
    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear() + ' / ';
};
