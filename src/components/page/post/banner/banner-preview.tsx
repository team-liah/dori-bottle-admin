import { IBannerFormValue } from "@/client/banner";

interface IBannerPreviewProps {
  banner: IBannerFormValue;
}

const BannerPreview = ({ banner }: IBannerPreviewProps) => {
  return (
    <div
      className="relative flex max-w-[375px] h-[150px] overflow-hidden w-full flex-row items-start justify-between whitespace-pre-wrap rounded-[25px] bg-red p-6"
      style={{
        backgroundColor: banner.backgroundColor,
        backgroundImage: banner.backgroundImageUrl ? `url(${banner.backgroundImageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-start justify-between gap-2">
        <div className="text-[16px] font-bold leading-[1.2] tracking-[-0.48px] text-gray1">{banner.title}</div>
        <div className="text-[12px] leading-[1.2] tracking-[-0.36px] text-gray2">{banner.content}</div>
      </div>
      {banner.imageUrl && <img className="h-[86px]" src={banner.imageUrl} alt="배너 이미지" />}
    </div>
  );
};

export default BannerPreview;
