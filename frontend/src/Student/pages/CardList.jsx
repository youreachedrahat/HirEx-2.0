import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const Card = ({
  organization,
  jobPosition,
  interviewDate,
  interviewTime,
  qsnNumber,
  timeDuration,
  jobDesc
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 mx-4 my-8">
      <div className="p-4">
        <h3 className="font-bold text-2xl mb-2">{organization}</h3>
        <p className="text-gray-700 text-base mb-2 font-bold">{jobPosition}</p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold ">Description:</span> &nbsp;
          {jobDesc}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold ">Interview Date :</span> &nbsp;
          {interviewDate}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold ">Interview Time:</span> &nbsp;
          {interviewTime}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold ">Number of Questions:</span> &nbsp;
          {qsnNumber}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-bold ">Duration:</span> &nbsp;
          {timeDuration} Minutes
        </p>
      </div>
    </div>
  );
};

const CardList = ({ cards, UserDataData, setItrId }) => {
  const [testEmail, setTestEmail] = useState("");
  const [IntrList, setIntrList] = useState([]);
  const BASEURL = process.env.REACT_APP_SAMPLE;
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);

  const findInterviewList = async () => {
    console.log("testEmail", testEmail);

    const viewData = await axios
      .post(`${BASEURL}/ViewInterviewList`, {
        Res_Interviewer_Email: testEmail,
      })
      .then((Data) => {
        setIntrList(Data.data.data1);
        console.log("kkkkk=====", Data);
        setLoading(false);
      })
      .catch((ErrorR) => {
        console.log("kkkkk", ErrorR);
      });
  };
  useEffect(() => {
    setTestEmail(UserDataData.emailId);
    findInterviewList();
    if (IntrList[0] && testEmail) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {" "}
          <div className="flex flex-wrap justify-center">
            {IntrList.map((card) => (
              <div
                onClick={() => {
                  setItrId(card.Interview_ID);
                }}
              >
                <Link to="/interview">
                  <div
                    key={card.organization}
                    className="transform hover:scale-110 transition-all duration-500"
                  >
                    <Card
                      organization={card.Company_Name}
                      jobPosition={card.Name_Technology}
                      jobDesc={card.Description}
                      interviewDate={card.Date_Of_Interview}
                      interviewTime={card.Time_Of_Interview}
                      qsnNumber={card.Number_Of_Questions}
                      timeDuration={card.Time_Duration}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CardList;
