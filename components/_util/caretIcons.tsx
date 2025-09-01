import React from 'react';
import Icon from '@ant-design/icons';

const UpOutlinedIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor" {...props}>
    <path d="M512 256L128 640L192 704L512 384L832 704L896 640L512 256Z" />
  </svg>
);

const DownOutlinedIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor" {...props}>
    <path d="M512 768L896 384L832 320L512 640L192 320L128 384L512 768Z" />
  </svg>
);

export const CaretUpOutlined = (props: any) => <Icon component={UpOutlinedIcon} {...props} />;
export const CaretDownOutlined = (props: any) => <Icon component={DownOutlinedIcon} {...props} />;
