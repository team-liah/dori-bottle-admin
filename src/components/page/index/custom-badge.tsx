import { Badge } from "antd";
import { BadgeProps } from "antd/lib";

const CustomBadge = ({ status, text }: { status?: BadgeProps["status"]; text: string }) => {
  return (
    <Badge
      style={{
        lineHeight: "14px",
        fontSize: "11px",
      }}
      status={status}
      text={<span className="text-[12px]">{text}</span>}
    />
  );
};

export default CustomBadge;
