import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm";
import { Suspense } from "react";

const VerifyEmailPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
};

export default VerifyEmailPage;
