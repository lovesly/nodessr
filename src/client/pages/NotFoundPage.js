import React, { useState } from 'react';

const NotFoundPage = ({ staticContext = {} }) => {
  // 可以在本地改吗？不行吧？
  // 这里有点问题，缓存吗？browser 端没有这个值，因为那时候就是 browserRouter 接管了
  // 这个是 StaticRouter 做的，不过为什么要这么做呢，费解。
  staticContext.notFound = true;
  return <h1>Ooops, route not found.</h1>;
};

export default {
    component: NotFoundPage, 
};