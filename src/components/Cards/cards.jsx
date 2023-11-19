import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAds } from "../../api";
import * as T from "./card.styled";
export const ContentCard = ({ userId }) => {
  const [data, setDataAds] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      getAllAds(userId)
        .then((data) => {
          setDataAds(data);
        })
        .catch((error) => {
          console.error("Error fetching workout data:", error);
        });
    };

    fetchData();
  }, [userId]);

  return (
    <>
      {data?.length !== 0 ? (
        <T.ContentCards>
          {data &&
            data.map((item) => (
              <T.CardsItem key={item.id}>
                <T.CardsCard>
                  <T.CardImage>
                    <Link to={`/ads/${item.id}`}>
                      <T.CardImageImg
                        src={`http://localhost:8090/${item.images[0].url}`}
                        alt="picture"
                      />
                    </Link>
                  </T.CardImage>
                  <T.CardContent>
                    <Link to={`/ads/${item.id}`}>
                      <T.CardTitle>{item.title}</T.CardTitle>
                    </Link>
                    <T.CardPrice>{item.price}&nbsp;₽</T.CardPrice>
                    <T.CardPlace>{item.city}</T.CardPlace>
                    <T.CardDate>
                      {new Date(item.created_on).toLocaleString("ru", {
                        addSuffix: true,
                      })}
                    </T.CardDate>
                  </T.CardContent>
                </T.CardsCard>
              </T.CardsItem>
            ))}
        </T.ContentCards>
      ) : (
        <T.CardTitle>Объявлений пока нет</T.CardTitle>
      )}
    </>
  );
};