/**
 * target 时间轨上的目标对象
 * parent 父对象 只能是合成对象
 * start 时间轨开始时间
 * timeLen 时间轨总时长
 * loop 是否循环
 * keyMap 关键帧集合，结构如下：
 * [
    * ['对象属性1',
    * [
    *   [时间1,值1], // 关键帧
    *   [时间2,值2]] // 关键帧
    * ],
    * ['对象属性2',
    * [
    *   [时间1,值1], // 关键帧
    *   [时间2,值2]] // 关键帧
    * ],
 * []
 * ]
 */
export default class Track{
    constructor(target){
        this.target=target
        this.parent=null
        this.start=0
        this.timeLen=5
        this.loop=false
        this.keyMap=new Map()
    }
    update(t){
        const {keyMap,timeLen,target,loop}=this
        let time=t-this.start
        if(loop){
            time-time%timeLen
        }
        for(const [key,fms] of keyMap.entries()){
            const last=fms.length-1
            if(time<fms[0][0]){
                target[key]=fms[0][1]}
            else if(time>fms[last][0]){
                target[key]=fms[last][1]
            }else{
                target[key]=getValBetweenFms(time,fms,last)
            }
        }
    }
}
function getValBetweenFms(time,fms,last){
    for(let i=0;i<last;i++){
        const [t1,v1]=fms[i]
        const [t2,v2]=fms[i+1]
        if(time>=t1&&time<t2){
            // return v1+(v2-v1)*(time-t1)/(t2-t1)
            const delta = {
                x: t2 - t1,
                y: v2 - v1
            }
            const k = delta.y / delta.x
            const b = v1 - k * t1
            return k * time + b
        }
    }
}
/**
 * 思路：
 * 遍历所有关键帧
 * 判断当前时间在哪两个关键帧之间
 * 基于这两个关键帧的时间和状态，求点斜式
 * 基于点斜式求本地时间对应的状态
 */