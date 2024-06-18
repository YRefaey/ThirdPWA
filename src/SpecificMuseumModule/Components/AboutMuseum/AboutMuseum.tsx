import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../Utls/BaseUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import Highlights from "../Highlights/Highlights";
import { useTranslation } from "react-i18next";
import Loading from "../../../SharedModules/Components/Loading/Loading";
import { Table } from "flowbite-react";
import { IoLogoYoutube } from "react-icons/io5";

export interface destination {
  name: string;
  description: string;
  image: {
    secure_url: string;
  };
  destinationID: string;
  cityId: {
    _id: string;
  };
  _id: string;
  video: string;
  subImages: {
    secure_url: string;
  }[];
}

export default function AboutMuseum() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    setIsSpeaking(true);
    const text = destination?.description;
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsSpeaking(false);
  };

  let { cityId, destinationId } = useParams();
  const [destination, setDestination] = useState<destination>();

  const getSpecificAttraction = () => {
    axios
      .get(`${baseUrl}city/${cityId}/destination/${destinationId}`)
      .then((res) => {
        console.log(res?.data?.touristDestination);
        setDestination(res?.data?.touristDestination);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSpecificAttraction();
    console.log(destination);
  }, []);

  const bookNow = () => {
    localStorage.setItem("destData", JSON.stringify(destination));
    navigate("/home/booking");
  };

  return (
    <div className="min:h-[100vh] ">
      {destination ? (
        <>
          <div className="mx-auto max-w-7xl pl-1 sm:px-6 lg:px-8 py-6">
            <div className="navigation">
              <label className="md:text-4xl mx-2 text-xl text-main flex items-center mb-8">
                <Link to="/">
                  <TiHome />
                </Link>
                <span className="text-xl font-bold">
                  <IoIosArrowForward />
                </span>
                <Link to={`/museums/${destination?.cityId?._id}`}>
                  {t("Museums")}
                </Link>
                <span className="text-xl font-bold">
                  <IoIosArrowForward />
                </span>
                {destination?.name}
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 bg- shadow-2xl rounded-3xl overflow-hidden m-3 h-full md:h-[auto]">
              <div
                className={` w-full h-auto lg:h-auto md:h-[70vh] overflow-hidden`}
              >
                <img
                  className="w-full rounded-3xl"
                  src={destination?.image?.secure_url}
                  alt="mesume-photo"
                />
              </div>
              <div className="lg:col-span-3 p-4 flex flex-col justify-between">
                <div className="name">
                  <div className=" flex justify-between items-center">
                    <h2 className="text-3xl font-semibold mb-2">
                      {destination?.name}
                    </h2>
                    <div className="youtube flex items-center my-2">
                      <div className="clock border border-red-950 block p-2 cursor-pointer rounded-full shadow-sm border-dashed">
                        <Link target="_blank" to={destination?.video}>
                          <IoLogoYoutube className="text-xl text-red-700" />
                        </Link>
                      </div>
                    </div>
                  </div>
                <p className="text-lg">{destination?.description}</p>
                </div>


                <div className="booking grid sm:grid-cols-2 grid-cols-1  mt-8">
                  <div>
                    <p className="flex text-main items-center">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </p>
                    <p>{t("Prices may vary depending on selected date")}.</p>
                  </div>
                  <div className="btn text-end">
                    <button
                      onClick={bookNow}
                      className="px-4   py-2 sm:w-auto w-full sm:m-0 mt-2  font-bold rounded-full bg-main border-main hover:text-main duration-700 border-2 text-white hover:bg-transparent"
                    >
                      {t("Book Now")}
                    </button>
                    <button
                      onClick={isSpeaking ? handlePause : handleSpeak}
                      className="px-4  py-2 sm:w-auto w-full sm:m-0 mt-2  font-bold rounded-full bg-main border-main hover:text-main duration-700 border-2 text-white hover:bg-transparent"
                    >
                      {!isSpeaking ? "Speak" : "Pause"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Highlights
            firstImagee={String(destination?.subImages[0]?.secure_url)}
            secImagee={String(destination?.subImages[1]?.secure_url)}
            thirdImagee={String(destination?.subImages[2]?.secure_url)}
          />

          <div className="mx-auto max-w-7xl pl-1 sm:px-6 lg:px-8 mt-3 pb-5">
            <div className="Highlights text-center border-[12px] rounded-xl">
              <h2 className="text-main text-6xl font-bold py-6 ">
                {t("Opening Hours")}
              </h2>
              <div className="overflow-x-auto w-[70%] m-auto py-2 mb-5">
                <Table className="text-center" hoverable>
                  <Table.Head className="">
                    <Table.HeadCell
                      colSpan={4}
                      className=" text-center text-3xl bg-main text-white"
                    >
                      {t("Opening Hours")}
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-zinc-800 divide-y-8">
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("MON")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("TUE")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200 ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("WED")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("THU")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200 ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("FRI")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("SAT")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("SUN")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
