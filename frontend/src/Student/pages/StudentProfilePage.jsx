import React, { useEffect, useState } from "react";

const StudentProfilePage = ({UserDataData}) => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setStudentData(UserDataData);
    console.log("Orm",studentData);
    if(studentData){
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
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 mr-4 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="Profile"
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold mb-1">
                        Hrushikesh Ambike
                      </h1>
                      <p className="text-lg text-gray-500">Hrushi@gmail.com</p>
                    </div>
                  </div>
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Personal Information
                      </h3>
                      {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Edit your personal information and save changes here.
                </p> */}
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Full name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Hrushikesh Ambike
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            hrushi@example.com
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Phone number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            9359402672
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            b1-101,Swapnapurti,
                            <br />
                            Pune,411028
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Technical Skills
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Here are some of the technical skills I've learned:
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Programming languages
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            JavaScript, Python, C++,C
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Frameworks and libraries
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            React, Angular, Django, NumPy, Pandas
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Database technologies
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            MySQL, MongoDB
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Past Performance
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Here are some of my past achievements:
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Project X
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Led a team of 5 to develop a web application using
                            React and Django, which was deployed to production
                            and used by over 10,000 users.
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Hackathon Y
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Won 2nd place in a hackathon with a team of 3, by
                            developing a mobile app using React Native and
                            Firebase.
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Internship Z
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Completed a 3-month internship at XYZ company, where
                            I developed and maintained their e-commerce website
                            using React and Redux.
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentProfilePage;
