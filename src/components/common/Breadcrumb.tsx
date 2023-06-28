import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { ChevronRight } from 'react-feather';
import tw from 'tailwind-styled-components';

//#region Styled Component

const Container = tw.div`
  flex flex-row items-center`;

const BreadcrumbText = tw.span`
  cursor-pointer font-bold`;

const ChevronRightIcon = tw(ChevronRight)`
  w-3 h-3 mx-1 stroke-[3px]`;

//#endregion

const Breadcrumb = () => {
  const router = useRouter();

  const [breadcrumbList, setBreadcrumbList] = useState<string[]>();

  useEffect(() => {
    setBreadcrumbList(router.asPath.split('/').filter((item) => item !== ''));
  }, [router.asPath]);

  return (
    <Container>
      {breadcrumbList?.map((item, index) => (
        <Fragment key={Math.random()}>
          <BreadcrumbText
            onClick={() =>
              router.push('/' + breadcrumbList.slice(0, index + 1).join('/'))
            }
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </BreadcrumbText>
          {index < breadcrumbList.length - 1 && <ChevronRightIcon />}
        </Fragment>
      ))}
    </Container>
  );
};

export default Breadcrumb;
