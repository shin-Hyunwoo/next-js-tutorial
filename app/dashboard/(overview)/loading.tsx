// loading.tsx는 React Suspense 기반으로 만들어진 Next.js 파일
// 페이지 콘텐츠가 로드되는 동안 대체로 표시될 UI를 만들 수 있도록 함

import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading(){
  return <DashboardSkeleton/>;
}