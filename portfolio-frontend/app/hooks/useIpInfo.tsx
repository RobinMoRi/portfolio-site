"use client";
import { useEffect, useState } from "react";

const useIpInfo = () => {
  const [ipinfo, setIpinfo] = useState({});
  useEffect(() => {
    fetch("https://ipinfo.io/json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setIpinfo(json);
      });
  }, []);
  return { ipinfo };
};

export default useIpInfo;
