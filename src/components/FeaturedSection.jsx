import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedSection() {
  return (
    <section className="overflow-hidden relative">
      <div className={"flex w-screen"}>
        <a href="#products">
          <div className="">
            {/* <Image src={imgFeatured1} alt="featured-1" fill={true} /> */}
            <img
              className="w-full object-cover object-center"
              src="https://vision-vault.s3.eu-north-1.amazonaws.com/featured_1.jpg"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
