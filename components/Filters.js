const Filters = ({ prefix, items, selected, onChange }) => {
    return items.map(item => (
        <span className='Filters__Filter' key={`${prefix}-${item.value}`}>
            <input id={`${prefix}-${item.value}`} type='radio' value={item.value} checked={selected === item.value} onChange={onChange} /> <label htmlFor={`${prefix}-${item.value}`}>{ item.label }</label>
        </span>
    ))
}

export default Filters
