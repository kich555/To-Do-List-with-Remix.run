// import { json } from '@remix-run/node';
// import { useLoaderData } from '@remix-run/react';
// import invariant from 'tiny-invariant';
import HomContent from '~/pages/home/HomeContent';

/**
@author kich555
@description tiny-invariant에 대한 간단한 테스트 
*/
// export const loader = async () => {
//   const data = 123;
//   invariant(typeof data === 'string', `${data} should be string`);
//   return json({ data });
// };

export default function MainRoute() {
  // const { data } = useLoaderData();
  // console.log('-->', data);
  // throw new Error('Testing Error Boundary');
  return <HomContent />;
}
