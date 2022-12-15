export function getImageUrl(
  imageName: string,
  transformation:
    | string
    | { width?: string; height?: string; aspect_ratio?: string }
) {
  let imageUrl: string;
  if (typeof transformation === "object") {
    imageUrl = applyTransformationOptions(imageName, transformation);
  } else if (typeof transformation === "string") {
    imageUrl = `https://images.clinicspots.com/tr:n-${transformation}/${imageName}`;
  } else {
    imageUrl = `https://images.clinicspots.com/${imageName}`;
  }
  return imageUrl;
}

function applyTransformationOptions(
  imageName: string,
  transformationOptions: {
    width?: string;
    height?: string;
    aspect_ratio?: string;
  }
) {
  let transformationString = "";

  if (transformationOptions?.width) {
    transformationString =
      transformationString?.length > 0
        ? `${transformationString},w-${transformationOptions?.width}`
        : `w-${transformationOptions?.width}`;
  }
  if (transformationOptions?.height) {
    transformationString =
      transformationString?.length > 0
        ? `${transformationString},h-${transformationOptions?.width}`
        : `h-${transformationOptions?.width}`;
  }
  if (transformationOptions?.aspect_ratio) {
    transformationString =
      transformationString?.length > 0
        ? `${transformationString},ar-${transformationOptions?.width}`
        : `ar-${transformationOptions?.width}`;
  }
  return `https://images.clinicspots.com/tr:${transformationString}/${imageName}`;
}
