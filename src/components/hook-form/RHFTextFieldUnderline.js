import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

RHFTextFieldUnderline.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
};

export default function RHFTextFieldUnderline({
  name,
  type = "text",
  autoComplete,
  placeholder,
}) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mt-2">
      <input
        placeholder={placeholder}
        type={type}
        id={name}
        autoComplete={autoComplete}
        className="formSubmit__input w-full"
        {...register(name)}
      />
      {errors[name] && (<p style={{ color: "red", fontSize: '12px'}}>{errors[name].message}</p>)}
    </div>
  );
}
