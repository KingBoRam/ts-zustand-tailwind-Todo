// import axios from 'axios';

// const Posts3 = () => {
//   const [post, setPost] = useState({ title: '', body: '' });

//   const postData = async () => {
//     const res = await axios.post(
//       'https://jsonplaceholder.typicode.com/posts',
//       {
//         title: 'boram',
//         body: '공부하기 싫은데요',
//         userId: 1,
//       },
//       { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
//     );
//     setPost(res.data);
//   };

//   return (
//     <>
//       <button onClick={postData}>click</button>
//       <div className='posting'>
//         <h1>title : {post.title}</h1>
//         <p>text : {post.body}</p>
//       </div>
//     </>
//   );
// };

// export default Posts3;

///////////////////////////////////////////////////////////////////////////////

// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';

// const Posts3 = () => {
// const postData = async () => {
//   const res = await axios.post(
//     'https://jsonplaceholder.typicode.com/posts',
//     {
//       title: 'boram',
//       body: '공부하기 싫은데요',
//       userId: 1,
//     },
//     { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
//   );
// };

//   const mutation = useMutation({
//     mutationFn: () => {
//       return axios.post(
//         'https://jsonplaceholder.typicode.com/posts',
//         {
//           title: 'boram',
//           body: '공부하기 싫은데요',
//           userId: 1,
//         },
//         { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
//       );
//     },
//   });

//   return (
//     <>
//       <button onClick={() => mutation.mutate()}>button</button>
//       <div className='posting'>
//         {mutation.isPending ? (
//           <p>Adding post</p>
//         ) : (
//           <>
//             {mutation.isError ? (
//               <p>An error occured:{mutation.error.message}</p>
//             ) : null}
//           </>
//         )}
//         {mutation.isSuccess ? (
//           <>
//             <h1>title :</h1>
//             <p>text : </p>
//           </>
//         ) : null}
//       </div>
//     </>
//   );
// };

// export default Posts3;

///////////////////////////////////////////////////////////////////////////////

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface post {
  title: string;
  body: string;
  userId: number;
  id: number;
}

const Posts3 = () => {
  const [post, setPost] = useState<post | null>(null);

  //https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: 'boram',
          body: '공부하기 싫은데요',
          userId: 1,
        },
        { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
      );
    },
    onSuccess: (data) => {
      setPost(data.data); // 응답 데이터 상태에 저장
    },
  });

  return (
    <>
      <button onClick={() => mutation.mutate()}>button</button>
      <div className='posting'>
        {mutation.isPending ? (
          <p>Adding post</p>
        ) : (
          <>
            {mutation.isError ? (
              <p>An error occured: {mutation.error.message}</p>
            ) : null}
          </>
        )}
        {mutation.isSuccess && post ? (
          <>
            <p>성공</p>
            <h1>title : {post.title}</h1>
            <p>text : {post.body}</p>
            <p>userId : {post.userId}</p>
            <p>id : {post.id}</p>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Posts3;
