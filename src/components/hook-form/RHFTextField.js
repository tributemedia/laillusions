import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
};

export default function RHFTextField({
  label,
  name,
  className,
  type = "text",
  autoComplete,
  placeholder,
}) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2"  style={{ position: "relative"}}>
        <input
          placeholder={placeholder}
          type={type}
          id={name}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          {...register(name)}
        />
        {errors[name] && (<p style={{ color: "red",position: "absolute", left: 0, top: "100%", fontSize: '12px'}}>{errors[name].message}</p>)}
      </div>
    </div>
  );
}
