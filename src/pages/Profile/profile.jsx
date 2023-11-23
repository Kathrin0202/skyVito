import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers, getTokenFromLocalStorage, getUser } from "../../api";
import { useAuthSelector } from "../../store/slices/auth";
import { MyProfile } from "./myprofile";
import { SellerProfile } from "./sellerProfile";

export const Profiled = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [pageMode, setPageMode] = useState("guest");
  const userID = useParams().id;
  const navigate = useNavigate();
  const useAuth = useAuthSelector();

  useEffect(() => {
    const fetchData = () => {
      if (userID) {
        if (userID === "me" || parseInt(userID) === useAuth) {
          getUser(getTokenFromLocalStorage())
            .then((data) => {
              setUserProfile(data);
              setPageMode("my-profile");
            })
            .catch((error) => {
              console.error("Error fetching workout data:", error);
              navigate("/login");
            });
        }
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
              };

              setUserProfile(findUser(data));
            }
          })
          .catch((error) => {
            console.error("Error fetching workout data:", error);
            setPageMode("error");
          });
      }
    };

    fetchData();
  }, [userID, useAuth]);
  return (
    <>
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
