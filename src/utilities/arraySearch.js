export default (arr, property, value) => {
    let element;
    arr.forEach((obj) => {
        if(obj[property] == value){
            element = obj;
            return;
        } 
    })
    return element;
}