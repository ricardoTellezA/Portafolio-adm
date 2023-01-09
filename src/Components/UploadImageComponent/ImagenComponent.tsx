import { useRef } from "react";
import { Button, FormLayout, Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
import { ImageComponent } from "../../interfaces/Register";

const ImagenComponent = ({ onChange, title }: ImageComponent) => {
  const ref = useRef<HTMLDivElement>(null);
  const reference = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className="img-component">
      <FormLayout.Group>
        <p onClick={() => reference()} className="icon">
          <Button>{title}</Button>
        </p>
      </FormLayout.Group>

      <input
        type="file"
        ref={ref as any}
        style={{ display: "none" }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default ImagenComponent;
