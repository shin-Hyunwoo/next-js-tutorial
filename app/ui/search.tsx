'use client'; // 클라이언트 컴포넌트 > Event Listener나 Hook 사용 가능

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // 디바운싱
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 디바운싱 : 디바운싱을 통해 DB로 전송되는 요청 수를 줄여 리소스를 절약 가능
  // 사용자가 누를 때마다 실행되던 이벤트를 사용자의 마지막 입력 후 0.3초가 지나면 해당 이벤트 실행하도록 하여 요청 수를 줄임
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    // URLSearchParams : URL 쿼리 파라미터를 조작하기 위해 사용되는 유틸리티 메서드 등을 제공하는 웹 API
    // URLSearchParams 인스턴스 생성
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
