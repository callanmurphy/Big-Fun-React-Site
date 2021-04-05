// import React, { Component } from "react";
// import './Home.css';
// import {getUser} from '../../backend/userAPI'
// import Input from '@material-ui/core/Input';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

class RivalTable extends Component {

  render() {
    const {search, rivals} = this.props
    const rivalRows = rivals.map((rival, i) => (
      <RivalRow
        user={getUser(rival)}
        key={i}
      />
    ))
    return (
      <ul className="rivals">
        <li className="rivalsHeader">
          <h2 id="rivalsTitle">RIVALS</h2>
        </li>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <form id="rivalSearch">
                <Input type="text" placeholder="Search Rivals..." title="Type in a Rival's Name" onChange={search} />
              </form>
            </TableRow>
          </TableHead>
          <TableBody>
            {rivalRows}
          </TableBody>
        </Table>  
      </ul>
    )
  }
}



export default RivalTable;
