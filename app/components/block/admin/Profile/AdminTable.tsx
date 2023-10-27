import moment from "moment";
import React from "react";

export default function AdminTable({ admins }: { admins: any }) {
  console.log(admins);
  return (
    <div className="sc-card-activity style1 w-100">
      <div className="content">
        <table className="table responsive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Email</th> */}
              <th>Admin Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((val: any, index: any) => (
              <tr key={index}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{moment(val?.createdAt).format("DD MMM YYYY hh:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
