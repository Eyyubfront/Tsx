interface CustomButtonProps {
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  width?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  outline?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

function CustomButton({
  color,
  borderRadius,
  padding,
  margin,
  fontSize,
  width,
  onClick,
  text,
  className,
  backgroundColor,
  outline,
  type = "submit",
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        color: color,
        fontSize: fontSize,
        backgroundColor: backgroundColor,
        width: width,
        padding: padding,
        margin: margin,
        borderRadius: borderRadius,
        outline: outline,
      }}
      type={type}
    >
      {text}
    </button>
  );
}

export default CustomButton;
