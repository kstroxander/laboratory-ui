import './TextField.css';

function TextField({register = () => {}, name, ...rest}) {
    return <input className="text-field"
                  {...register(name)}
                  {...rest} />
}

export default TextField;