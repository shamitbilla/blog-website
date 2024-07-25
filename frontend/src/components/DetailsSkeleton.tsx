export const DetailsSkeleton = ()=>{
    return <>
<div role="status" className="max-w-sm animate-pulse mx-auto ml-12">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-104 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[1196px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[767px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[1118px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[936px]"></div>
    <span className="sr-only">Loading...</span>
</div>
    </>
}