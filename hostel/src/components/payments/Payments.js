import React from 'react'

function Payments() {
  return (
    <div>
      <div className=" ">
        <div className="table-responsive-md table-scrollable ">
          <table className="table  m-2 mr-3">
            <thead>
              <tr>
                <th scope="col" width="100">
                  S.no
                </th>
                <th scope="col" width="100">
                  Mess Bill
                </th>
                <th scope="col" width="100">
                  Room Rent
                </th>
                <th scope="col" width="100">
                  Electricity Bill
                </th>
                <th scope="col" width="100">
                  Water Bill
                </th>
                <th scope="col" width="130">
                  Establishment
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>800</td>
                <td>150</td>
                <td>20</td>
                <td>20</td>
                <td>450</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>800</td>
                <td>150</td>
                <td>20</td>
                <td>20</td>
                <td>450</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments