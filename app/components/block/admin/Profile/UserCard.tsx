import moment from "moment";
import React from "react";

export default function UserCard({ user }: { user: any }) {
  console.log(user);
  return (
    <div className="sc-card-activity style1 w-100">
      <div className="content">
        <table className="table responsive">
          <thead>
            <tr>
              <th>Wallet Address</th>
              <th>Wallet Type</th>
              <th>Requested NFTs</th>
              {/* <th>Email</th> */}
              <th>User Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((val: any, index: any) => (
              <tr key={index}>
                <td>{val.web3Address}</td>
                <td>{val.provider}</td>
                <td>{val?.web3Tunes?.length}</td>
                {/* <td>{sadsdasd}</td> */}
                <td>{moment(val?.createdAt).format("DD MMM YYYY hh:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
