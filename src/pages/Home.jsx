import { readPetData } from "../api/api";
import Layout from "../components/ui/Layout";
import PetList from "../features/pets/PetList";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Home = () => {
  const targetRef = useRef(null);
  const [page, setPage] = useState(1);
  const [prevData, setPrevData] = useState([]);
  const [backData, setBackData] = useState([]);
  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((page) => page + 1);
  });

  const moreData = async (page) => {
    const backData = await readPetData(page);
    setBackData(backData.data);
  };

  const fetchData = async (page) => {
    const petData = await readPetData(page);
    setPrevData(petData.data);
    moreData(page + 1);
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  useEffect(() => {
    observe(targetRef.current);
    setPrevData(prevData.concat(backData));
    moreData(page + 1);
  }, [page]);

  useEffect(() => {
    const lastData = 100;
    if (prevData.length >= lastData) {
      unobserve(targetRef.current);
    }
  }, [prevData]);

  return (
    <Layout>
      <PetList>
        {prevData.map((item, idx) => (
          <PetList.Item item={item} key={idx} idx={idx} />
        ))}
      </PetList>
      <div ref={targetRef} style={{ width: "100%", height: 30 }} />
    </Layout>
  );
};

export default Home;
