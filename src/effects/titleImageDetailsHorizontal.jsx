import { ShimmerContentBlock,ShimmerBadge } from "react-shimmer-effects";

export const titleImageDetailsHorizontal = () => {
  return (
    <div>
      <ShimmerBadge width={200} />
      <ShimmerContentBlock title text cta thumbnailWidth={370} thumbnailHeight={370} />
    </div>
  );
};

