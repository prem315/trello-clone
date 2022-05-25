export const throttle = (callback, delay) => {
    let last = 0;
  
    return (...args) => {
      let now = new Date().getTime();
  
      if(now - last < delay ) {
        //console.log("here")
        return
      }
  
      last = now;
      callback(...args)
  
    }
}