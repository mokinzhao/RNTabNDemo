export default {
    /*检查对象是否为空*/
     isEmpty(obj){
        for (var r in obj){return false;}
        return true;
    },
  
    /*把String转化成对象*/
    toObj(obj){
      if(typeof obj === 'object'){
          return obj;
      }else{
          return eval('('+obj+')');
      }
    },
  
    /*判断对象是否为空*/
    isNull(obj){
      return (!obj && typeof(obj)!="undefined" && obj!=0)?true:false;
    },
  
  }