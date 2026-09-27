"use client";

import { Button, Card } from "@heroui/react";
import { FaArrowRotateRight } from "react-icons/fa6";

const Error = ({ reset }) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <Card className="w-full max-w-lg">
        <Card.Content className="flex flex-col items-center gap-4 py-12 text-center">
          <span className="text-7xl font-bold text-danger">Oops!</span>

          <div>
            <h1 className="text-2xl font-bold">Something Went Wrong</h1>

            <p className="mt-2 text-muted">
              We couldn&apos;t load this page. Please try again.
            </p>
          </div>

          <Button onPress={() => reset()} className="mt-3">
            <FaArrowRotateRight className="size-4" />
            Try Again
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Error;
