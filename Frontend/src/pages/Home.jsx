import React from "react";
import Navbar from "../components/Navbar";
import BodyText from "../components/BodyText";
import Services from "../components/Services";
import ServiceCard from "../components/ServiceCard";
import Whyus from "../components/Whyus";
import Appointment from "../components/Appointment";

function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full">
        <BodyText />
        <div className="absolute -bottom-[170px] w-full">
          <ServiceCard />
        </div>
        <Services />
        <Whyus />
        <Appointment />
      </div>
    </div>
  );
}

export default Home;
