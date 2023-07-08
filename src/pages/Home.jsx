import { useQuery } from "react-query";
import { readPetData } from "../api/api";
import Error from "../components/ui/Error";
import Layout from "../components/ui/Layout";
import PetList from "../features/pets/PetList";
import { useEffect, useState } from "react";
import Loader from "../components/ui/Loader";

const Home = () => {
  const { isLoading, isError, data } = useQuery("pets", readPetData);
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState([]);
  const [fetch, setFetch] = useState(false);

  if (data && fetch) {
    const fetchedData = data.data.slice(page * 5, (page + 1) * 5);
    setMoreData([...moreData, ...fetchedData]);
    setPage((page + 1) % 2);
    setFetch(false);
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // 페이지 끝에 도달하고 fetch가 진행되지 않는 상태일 때 동작
    if (scrollTop + clientHeight >= scrollHeight) {
      setFetch(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <PetList>
          <Loader />
        </PetList>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <PetList>
          <Error />
        </PetList>
      </Layout>
    );
  }

  return (
    <Layout>
      <PetList>
        {data &&
          data.data.map((item, idx) => (
            <PetList.Item item={item} key={item.id} idx={idx} />
          ))}
        {moreData &&
          moreData.map((item, idx) => (
            <PetList.Item item={item} key={item.id} idx={idx + 5} />
          ))}
      </PetList>
    </Layout>
  );
};

export default Home;
