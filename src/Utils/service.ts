import axios from 'axios';

const API_KEY_1 = '936c3f70260547df866d95ccc8e2549a';
const API_KEY_2 = '164ae127c65a4d14a857403f3d08297a';

export const getStories = (query: number, pageSize: number = 100) => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${API_KEY_1}&pageSize=${pageSize}`,
  );
};

//936c3f70260547df866d95ccc8e2549a
//164ae127c65a4d14a857403f3d08297a
