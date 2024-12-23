interface CustomHeadingProps {
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  text: string;
  fontWeight?: string;
  className?: string;
}
function CustomHeading({ color, fontSize, lineHeight,fontWeight,text}: CustomHeadingProps) {
  return (
    <h1
      style={{
        color: color,
        lineHeight: lineHeight,
        fontSize: fontSize,
        fontWeight:fontWeight,
      }}
    >
      {text}
    </h1>
  );
}

export default CustomHeading;
