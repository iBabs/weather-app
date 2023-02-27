import React from "react";
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

function Description({ weather, units }) {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "Min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "Max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "Feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "Pressure",
      data: weather.pressure.toFixed(),
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "Humidity",
      data: weather.humidity.toFixed(),
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "Speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];

  return (
    <div className="w-full  gap-5 grid grid-cols-2 md:grid-cols-3">
      {cards.map(({ id, icon, title, data, unit }) => {
      return ( <div
          className="flex flex-col bg-darkblue bg-opacity-60 rounded-xl w-full py-2 justify-center items-center"
          key={id}
        >
          <div className="flex">
            {icon}
            <span>{title}</span>
          </div>
          <h2 className="text-xl font-bold">{`${data} ${unit}`}</h2>
        </div>)
      })}
    </div>
  );
}

export default Description;
