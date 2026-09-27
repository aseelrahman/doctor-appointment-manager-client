"use client";

import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <Card className="w-full max-w-lg">
        <Card.Content className="flex flex-col items-center gap-4 py-12 text-center">
          <span className="text-7xl font-bold text-primary">404</span>

          <div>
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <p className="mt-2 text-muted">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or may
              have been moved.
            </p>
          </div>

          <Button onPress={() => router.back()} className="mt-3">
            <FaArrowLeft className="size-4" />
            Move Back
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default NotFound;
