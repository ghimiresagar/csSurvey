import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import BootstrapTable from 'react-bootstrap-table-next';

function ResultLayoutMain(props) {

    const [valuesRates, setValuesRates] = useState([]);
    const [valuesComments, setValuesComments] = useState([]);

    for (const [x, y] of props.value.entries()) {
        if (y.q_type === "Rate") {
            valuesRates.push({
                id: x+1,
                title: y.q_title,
                rate1: y.rate['1'],
                rate2: y.rate['2'],
                rate3: y.rate['3'],
                rate4: y.rate['4'],
                rate5: y.rate['5']
            });
        } else {
            valuesComments.push({
                id: x+1,
                title: y.q_title,
                comment: y.comment
            });
        }
    }

    const columnsRates = [{
        dataField: 'id',
        text: '#',
        sort: true
      }, {
        dataField: 'title',
        text: 'Question',
        sort: true,
        headerStyle: {
          width: '70%', textAlign: 'center'
        }
      }, {
        dataField: 'rate5',
        text: '5'
      }, {
        dataField: 'rate4',
        text: '4'
      }, {
        dataField: 'rate3',
        text: '3'
      }, {
        dataField: 'rate2',
        text: '2'
      }, {
        dataField: 'rate1',
        text: '1'
      }];

      const columnsComments = [{
        dataField: 'id',
        text: '#',
        sort: true
      }, {
        dataField: 'title',
        text: 'Question',
        sort: true,
        headerStyle: {
          width: '70%', textAlign: 'center'
        }
      }, {
        dataField: 'comment',
        text: 'Comments'
      }];

    return (
      <>
        <BootstrapTable 
            keyField="id"
            data={ valuesRates }
            columns={ columnsRates } />
            <br />
          <BootstrapTable 
              keyField="id"
              data={ valuesComments }
              columns={ columnsComments } />
      </>
    );
}

export default ResultLayoutMain;