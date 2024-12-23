interface CustomTextProps {
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  text: string;
  fontWeight?:string
  className?:string
}

function CustomText({ color, fontSize, lineHeight,fontWeight,text }: CustomTextProps) {
  return (
    <div>
      <p
        style={{
          color: color,
          fontSize: fontSize,
          lineHeight: lineHeight,
          fontWeight:fontWeight,
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default CustomText;
