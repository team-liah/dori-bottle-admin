import { IPenalty } from "@/client/penalty";
import dayjs from "dayjs";

interface IUserPenaltyDetailProps {
  penalty: IPenalty;
}

//#region Styled Component

//#endregion

const UserPenaltyDetail = ({ penalty }: IUserPenaltyDetailProps) => {
  return (
    <div>
      <div>{penalty.cause}</div>
      <div>{dayjs(penalty.createdDate).format("YYYY/MM/DD HH:mm")}</div>
    </div>
  );
};

export default UserPenaltyDetail;
