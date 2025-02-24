'use client';

import { types } from '@/lib/type';
import { cn } from '@/lib/utils';
import { useVideoTypeStore } from '@/store';

export default function TypeCarousel() {
  const { videoType, setVideoType } = useVideoTypeStore();

  return (
    // <Carousel setApi={setApi} className="w-full max-w-xs">
    //   <CarouselContent>
    //     {types.map((type, index) => (
    //       <CarouselItem key={index} className="basis-1/3">
    //         <Link
    //           href={`/search?type=${type.key}`}
    //           className="hover:font-semibold"
    //         >
    //           <p className="flex items-center justify-center p-2">
    //             <span className="text-sm">{type.label}</span>
    //           </p>
    //         </Link>
    //       </CarouselItem>
    //     ))}
    //   </CarouselContent>
    //   {/* <CarouselPrevious />
    //   <CarouselNext /> */}
    // </Carousel>

    <div className="flex justify-center items-center gap-x-2">
      {types.map((filter) => (
        <button
          key={filter.key}
          className={cn(
            'cursor-pointer hover:font-semibold hover:bg-muted-foreground/10 px-4 py-1 rounded-full',
            filter.key === videoType && 'font-semibold bg-muted-foreground/10'
          )}
          onClick={() => setVideoType(filter.key)}
        >
          <span className="text-sm">{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
