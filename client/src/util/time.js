export default (time) => {
    let mins = Math.floor(time/60);
    mins = (mins < 10 ? '0':'') + mins 
    let secs = time%60;
    secs = (secs < 10 ? '0':'') + secs 
    return `${mins}:${secs}`
}