import { PropTypes } from "prop-types";

const PageTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center lg:text-left">
      <h2 className="text-xl lg:text-3xl font-semibold underline underline-offset-4 text-center lg:text-left">{heading}</h2>
      <p className="text-sm lg:text-base mt-1 font-light">{subHeading}</p>
    </div>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default PageTitle;
