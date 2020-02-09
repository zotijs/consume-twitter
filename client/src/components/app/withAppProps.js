import { withProps } from "libraries/model";
import { twits, isLoading, error } from "models/app/props";
import { fetchTwits } from "models/app/actions";

const withAppProps = withProps(
  {
    twits,
    isLoading,
    error
  },
  { fetchTwits }
);

export default withAppProps;
