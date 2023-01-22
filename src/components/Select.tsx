import react, { ChangeEventHandler } from 'react';

type SelectProps = {
    options: {value: string, label: string}[]
    onChange: ChangeEventHandler
};

function Select(props: SelectProps) {
    const options = props.options.map((option, index) => {
        return (
            <option 
                key={`${option.value}-${index}`} 
                value={option.value}>{option.label}
            </option>
        );
    });

    return (
        <select onChange={props.onChange}>
            {options}
        </select>
    );
}

export default Select;