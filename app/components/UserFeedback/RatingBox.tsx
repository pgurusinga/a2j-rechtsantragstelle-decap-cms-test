import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined";
import Button from "../Button";
import ButtonContainer from "../ButtonContainer";
import Heading from "../Heading";

export const userRatingFieldname = "wasHelpful";

export interface RatingBoxProps {
  heading: string;
  url: string;
  context?: string;
  yesButtonLabel: string;
  noButtonLabel: string;
}

export const RatingBox = ({
  heading,
  url,
  context,
  yesButtonLabel,
  noButtonLabel,
}: RatingBoxProps) => {
  const ratingFetcher = useFetcher();
  const [jsAvailable, setJsAvailable] = useState(false);
  useEffect(() => setJsAvailable(true), []);

  return (
    <>
      <Heading look="ds-label-01-bold" tagName="h2" text={heading} />
      <ratingFetcher.Form
        method="post"
        action={`/action/send-rating?url=${url}&context=${
          context ?? ""
        }&js=${String(jsAvailable)}`}
      >
        <ButtonContainer>
          <Button
            iconLeft={<ThumbUpIcon />}
            look="tertiary"
            name={userRatingFieldname}
            value="yes"
            type="submit"
          >
            {yesButtonLabel}
          </Button>
          <Button
            iconLeft={<ThumbDownIcon />}
            look="tertiary"
            name={userRatingFieldname}
            value="no"
            type="submit"
          >
            {noButtonLabel}
          </Button>
        </ButtonContainer>
      </ratingFetcher.Form>
    </>
  );
};
