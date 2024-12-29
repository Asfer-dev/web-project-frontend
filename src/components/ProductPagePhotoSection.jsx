import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export default function ProductPagePhotoSection({ product }) {
  const [viewingPhoto, setViewingPhoto] = useState(product.images[0]);

  useEffect(() => {
    setViewingPhoto(product.images[0]);
  }, [product]);

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-neutral-200 p-1 w-full flex justify-center items-center">
        <img
          className="h-full block"
          src={`http://localhost:3000${viewingPhoto}`}
          alt=""
        />
      </div>
      <div className="flex gap-2 overflow-auto">
        {product?.images?.map((photoUrl) => (
          <div
            className={cn(
              "w-28 h-28 flex items-center border-zinc-200 p-1",
              photoUrl !== viewingPhoto && "border"
            )}
          >
            <img
              onClick={() => setViewingPhoto(photoUrl)}
              className={"w-full block max-h-full cursor-pointer hoverable"}
              src={`http://localhost:3000${photoUrl}`}
              key={photoUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
