import { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot, doc } from "firebase/firestore";

export const useCollection = (collectionName, forceReload = false) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const db = getFirestore();
      const productsCollection = collection(db, collectionName);

      const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
        setProductos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      });

      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName, forceReload]);

  return { productos, loading, refetch: fetchData };
};

export const useUnico = (collectionName, id) => {
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const singleProduct = doc(db, collectionName, id);

    const unsubscribe = onSnapshot(singleProduct, (snapshot) => {
      setProducto({ id: snapshot.id, ...snapshot.data() });
      setLoading(false);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, [collectionName, id]);

  return { producto, loading };
};