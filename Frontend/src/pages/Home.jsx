import React from "react";
import BodyText from "../components/BodyText";
import Services from "../components/Services";
import ServiceCard from "../components/ServiceCard";
import Whyus from "../components/Whyus";
import Appointment from "../components/Appointment";

function Home() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex relative flex-col items-center justify-center w-full">
          <BodyText />
          <Services />
          <div className="hiddden lg:absolute lg:top-[37%] lg:z-10 lg:w-full">
            <ServiceCard />
          </div>
        </div>
        <Whyus />
        <Appointment />
      </div>
    </div>
  );
}

export default Home;
