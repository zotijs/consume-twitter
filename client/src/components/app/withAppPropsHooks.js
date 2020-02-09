import React, { memo } from "react";
import { useProps } from "libraries/model";
import { twits, isLoading, error } from "models/app/props";
import { fetchTwits } from "models/app/actions";

const withAppProps = Component => {
  const MemoizedComponent = memo(Component);

  return props => {
    const modelProps = useProps(
      {
        twits,
        isLoading,
        error
      },
      {
        fetchTwits
      }
    );

    return <MemoizedComponent {...modelProps} {...props} />;
  };
};

export default withAppProps;
