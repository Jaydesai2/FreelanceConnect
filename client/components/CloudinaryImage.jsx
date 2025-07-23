import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "CloudServerDB" 
  }
});

const CloudinaryImage = ({ publicId, ...props }) => {
  if (!publicId) return null;
  const img = cld.image(publicId);
  return <AdvancedImage cldImg={img} {...props} />;
};

export default CloudinaryImage; 