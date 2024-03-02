import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default function RHFTextField({
  name,
  className,
  placeholder,
}) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={className}>
      <textarea
        placeholder={placeholder}
        name={name}
        id={name}
        rows={4}
        className="block w-full border-0 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        {...register(name)}
      />
      {errors[name] && (<p style={{ color: "red", fontSize: '12px'}}>{errors[name].message}</p>)}
      
    </div>
  );
}
