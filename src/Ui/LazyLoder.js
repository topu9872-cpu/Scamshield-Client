import dynamic from "next/dynamic";

export const LazyLoader = (loder) => dynamic(()=>loder,{
    loading:()=><div flex justify-center items-center><span className="loading loading-spinner loading-lg"></span>
</div>
})