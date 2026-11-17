import { Suspense } from "react";

import { PesananSaya } from "@/components/dashboard/PesananSaya";

export default function PesananPage() {
  return (
    <Suspense>
      <PesananSaya />
    </Suspense>
  );
}
