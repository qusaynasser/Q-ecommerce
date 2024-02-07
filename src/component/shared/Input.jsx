import React from 'react'

export default function Input({type='text',name,id,title,value,onChange,errors,onBlur,touched,className}) {
    // console.log(errors);
return (
    <>
    <div className="input-group d-flex flex-column mb-3">
        <div className='mb-3'>
        <label htmlFor={id}>{title}</label>
        </div>

        <div>
        <input type={type} name={name} id={id} value={value} onChange={onChange} onBlur={onBlur} className={className}></input>
        </div>

        <div>
        {touched[name] && errors[name] && <p className='text text-danger'>{errors[name]}</p>}
        </div>
    </div>
    </>
)
}
