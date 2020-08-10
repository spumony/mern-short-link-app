import React from 'react';
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';

const LinksList = ({links}) => {
  if (!links.length) {
    return <p className="mt-5 text-center">List is empty</p>
  }
  return (
    <>
      <Table hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Original link</th>
            <th>Short link</th>
            <th>Open</th>
          </tr>
        </thead>
        <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          )
        }) }
        </tbody>
      </Table>
    </>
  );
}

export default LinksList;
