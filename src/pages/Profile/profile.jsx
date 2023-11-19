import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers, getTokenFromLocalStorage, getUser } from "../../api";
import { MyProfile } from "./myprofile";
import { SellerProfile } from "./sellerProfile";

export const Profiled = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [pageMode, setPageMode] = useState("guest");
  const userID = useParams().id;

  useEffect(() => {
    const fetchData = () => {
      if (userID) {
        if (userID === "me") {
          getUser(getTokenFromLocalStorage())
            .then((data) => {
              console.log(data);
              setUserProfile(data);
              setPageMode("my-profile");
            })
            .catch((error) => {
              console.error("Error fetching workout data:", error);
              setPageMode("error");
            });
        } else {
          getAllUsers()
            .then((data) => {
              if (data) {
                const findUser = (arrUsers) => {
                  for (let i = 0; i < arrUsers?.length; i++) {
                    if (arrUsers[i].id === parseInt(userID)) {
                      setPageMode("guest");
                      return arrUsers[i];
                    }
                  }
                  setPageMode("not-found-user");
                  return null;
                };

                setUserProfile(findUser(data));
              }
            })
            .catch((error) => {
              console.error("Error fetching workout data:", error);
              setPageMode("error");
            });
        }
      }
    };

    fetchData();
  }, [userID]);
  return (
    <>
      {pageMode === "not-found-user" && (
        <div>
          <p>Пользователь не найден</p>
        </div>
      )}
      {pageMode === "not-logged" && (
        <div>
          <p>Пользователь не загружен</p>
        </div>
      )}

      {pageMode === "my-profile" && userProfile && (
        <>
          <MyProfile
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        </>
      )}

      {pageMode === "guest" && userProfile && (
        <>
          <SellerProfile userProfile={userProfile} />
        </>
      )}
    </>
  );
};
