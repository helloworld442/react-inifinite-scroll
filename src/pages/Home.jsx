import { readPetData } from "../api/api";
import Layout from "../components/ui/Layout";
import PetList from "../features/pets/PetList";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Loader from "../components/ui/Loader";

const Home = () => {
  const targetRef = useRef(null);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((page) => page + 1);
  });

  const fetchData = async (page) => {
    const petData = await readPetData(page);
    setData(petData.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(page);
  }, [page]);

  //데이터가 초과량이 되었을 때 데이터를 그만 받아오기
  useEffect(() => {
    const totalData = 100;
    if (data.length >= totalData) {
      targetRef.current.style.display = "none";
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      unobserve(targetRef.current);
    } else {
      observe(targetRef.current);
    }
  }, [isLoading]);

  return (
    <Layout>
      <PetList>
        {data.map((item, idx) => (
          <PetList.Item item={item} key={item.id} idx={idx} />
        ))}
        {isLoading && <Loader />}
      </PetList>
      <div ref={targetRef} style={{ width: "100%", height: 30 }} />
    </Layout>
  );
};

export default Home;
