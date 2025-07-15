export default function camel(str){
    return str.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())
}