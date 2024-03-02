import React from "next";
import PropTypes from "prop-types";


const Loading = ({ loading, fixed='absolute', ...other}) => {
  return (
    <div className={`${loading} ${fixed} loading` } style={other}>
      <span className="loader"></span>
    </div>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool
};

export default Loading;
