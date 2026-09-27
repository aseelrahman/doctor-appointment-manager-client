import { Spinner } from "@heroui/react";

const Loading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
