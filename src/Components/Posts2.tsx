import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Posts2 = () => {
  const fetchPost = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['post'],
    queryFn: fetchPost,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>title : {data.title}</h1>
      <div>text : {data.body}</div>
    </>
  );
};

export default Posts2;

// 위 데이터를 zustand로 활용하는법 그리고 JSONapi로 post요청 -> mutation쓰는법
