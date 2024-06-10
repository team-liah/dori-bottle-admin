const DefaultText = ({ value }: { value?: any }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        margin: 0,
        padding: "4px 11px",
        // color: "rgba(0, 0, 0, 0.88)",
        fontSize: 14,
        lineHeight: 1.5714285714285714,
        listStyle: "none",
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
        position: "relative",
        display: "inline-block",
        width: "100%",
        minWidth: 0,
        backgroundColor: "#ffffff",
        backgroundImage: "none",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 6,
        transition: "all 0.2s",
        borderColor: "transparent",
        whiteSpace: "pre-line",
      }}
    >
      {value}
    </div>
  );
};

export default DefaultText;
