import { Upload } from 'antd';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomComponent';

interface IImageUploadProps {
  src?: string;
  width: string;
  height: string;
  onChange?: (file: File) => void;
  onDelete?: () => void;
}

//#region Styled Component
const Container = tw.div`
  w-fit h-fit`;

const ImageContainer = tw.div`
  relative flex justify-center items-center rounded-md overflow-hidden bg-[#E0E0E0]`;

const Dimmed = tw.div`
  absolute w-full h-full bg-[#000000] opacity-50`;

const Button = tw(Custom.Button)`
  w-[50%] h-[30px] absolute bg-white text-gray border-[1px] border-solid border-gray`;

const EmptyText = tw.div`
  text-[10px] text-gray`;

const StyledImage = tw(Image)`
  object-cover`;

//#endregion

const ImageUpload = (props: IImageUploadProps) => {
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setPreview(props.src || '');
  }, [props.src]);

  return (
    <Container
      style={{
        width: props.width,
        height: props.height,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Upload
        multiple={false}
        accept="image/*"
        onChange={(e) => {
          const reader = new FileReader();
          if (e.file.originFileObj) {
            reader.readAsDataURL(e.file.originFileObj);
            reader.onloadend = () => {
              setPreview(reader.result as string);
              props.onChange?.(e.file.originFileObj!);
              setError(false);
            };
          }
        }}
        showUploadList={false}
      >
        <ImageContainer
          style={{
            width: props.width,
            height: props.height,
          }}
        >
          {error ? (
            <EmptyText>이미지를 표시할 수 없습니다.</EmptyText>
          ) : preview ? (
            <Fragment>
              <StyledImage
                alt={''}
                src={preview}
                fill={true}
                onError={() => setError(true)}
              />
              {hover && (
                <Fragment>
                  <Dimmed />
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview('');
                      props.onDelete?.();
                    }}
                  >
                    삭제
                  </Button>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Button type="button">업로드</Button>
          )}
        </ImageContainer>
      </Upload>
    </Container>
  );
};

export default ImageUpload;
