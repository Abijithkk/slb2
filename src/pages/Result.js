import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Avatar } from "@mui/material";
import Header from "../components/Header";
function Result() {
  return (
    <div>
      <Header />
      <p className="ms-5 mt-5">
        <b>Search Result :</b>
      </p>
      <center>
        <Table style={{ backgroundColor: "white", width: "90%" ,borderTop:"1px solid #D4D4D4"}}>
          <thead>
            <tr>
              <th style={{fontWeight:"500"}}>Employee Name</th>
              <th style={{fontWeight:"500"}}>Employee ID</th>
              <th style={{fontWeight:"500"}}>CIL gate Pass No.</th>
              <th style={{fontWeight:"500"}}>Company Name</th>
              <th style={{fontWeight:"500"}}>OTC</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
                    sx={{ mr: 2 }}
                  />
                  Mark
                </div>
              </td>
              <td>356327</td>
              <td>DL26374</td>
              <td>MLP</td>
              <td>78%</td>
              <td>
                <Button variant="primary">Update Profile</Button>{" "}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
                    sx={{ mr: 2 }}
                  />
                  Mark
                </div>
              </td>
              <td>356327</td>
              <td>DL26374</td>
              <td>MLP</td>
              <td>78%</td>
              <td>
                <Button variant="primary">Update Profile</Button>{" "}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
                    sx={{ mr: 2 }}
                  />
                  Mark
                </div>
              </td>
              <td>356327</td>
              <td>DL26374</td>
              <td>MLP</td>
              <td>78%</td>
              <td>
                <Button variant="primary">Update Profile</Button>{" "}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
                    sx={{ mr: 2 }}
                  />
                  Mark
                </div>
              </td>
              <td>356327</td>
              <td>DL26374</td>
              <td>MLP</td>
              <td>78%</td>
              <td>
                <Button variant="primary">Update Profile</Button>{" "}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
                    sx={{ mr: 2 }}
                  />
                  Mark
                </div>
              </td>
              <td>356327</td>
              <td>DL26374</td>
              <td>MLP</td>
              <td>78%</td>
              <td>
                <Button variant="primary">Update Profile</Button>{" "}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png"
                    sx={{ mr: 2 }}
                  />
                  Mark
                </div>
              </td>
              <td>356327</td>
              <td>DL26374</td>
              <td>MLP</td>
              <td>78%</td>
              <td>
                <Button variant="primary">Update Profile</Button>{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </center>
    </div>
  );
}
export default Result;