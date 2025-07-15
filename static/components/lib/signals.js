export default function createSignal(initialValue){
    let value = initialValue
    const listeners = new Set()

     const getter = () => value
     const setter = (v) => {
        value = typeof v === 'function' ? v(value) : v
        listeners.forEach(fn => fn(value))
     }

     const onChange = fn => {
        listeners.add(fn)
        fn(value)
        return () => listeners.delete(fn);
     }

     return [getter, setter, onChange]
}