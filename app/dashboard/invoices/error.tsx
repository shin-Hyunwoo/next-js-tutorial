// error.tsx 파일은 반드시 클라이언트 컴포넌트여야 함.
'use client';

import { useEffect } from 'react';

export default function Error({
  error, // JavaScript 기본 객체인 Error의 인스턴스
  reset, // 오류 발생 부분을 다치 초기화하는 역할. 함수 실행 시 해당 루트 섹션을 다시 렌더링 시도
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
