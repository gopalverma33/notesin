import { Suspense } from "react";
import TemplatesClient from "./TemplatesClient";

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TemplatesClient />
    </Suspense>
  );
}
