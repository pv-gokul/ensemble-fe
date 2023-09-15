import ImageUploader from "./ImageUploader";
import TextArea from "./TextArea";

export { TextArea, ImageUploader };

export const getComponentBytype = (type) =>
  ({
    text: TextArea,
    image: ImageUploader,
  }[type]);
