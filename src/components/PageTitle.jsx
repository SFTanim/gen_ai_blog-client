import { PropTypes } from "prop-types";

const PageTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center lg:text-left" data-aos="fade-left">
      <h2 className="text-xl lg:text-4xl font-semibold PageTitle text-center lg:text-left w-fit lg:w-full mx-auto">{heading}</h2>
      <p className="text-sm lg:text-base mt-1 font-light max-w-[700px]">{subHeading}</p>
    </div>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default PageTitle;
