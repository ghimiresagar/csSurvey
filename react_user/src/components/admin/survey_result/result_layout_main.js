import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import BootstrapTable from 'react-bootstrap-table-next';

function ResultLayoutMain(props) {

    const [valuesRates, setValuesRates] = useState([]);
    const [valuesComments, setValuesComments] = useState([]);

    for (const [x, y] of props.value.entries()) {
        if (y.q_type === "Rate") {
            let rateArr = [y.rate['1'], y.rate['2'], y.rate['3'], y.rate['4'], y.rate['5']];
            let rateAvg = (rateArr[0]+rateArr[1]+rateArr[2]+rateArr[3]+rateArr[4]) / rateArr.length;
            valuesRates.push({
                id: x+1,
                title: y.q_title,
                rate1: rateArr[0],
                rate2: rateArr[1],
                rate3: rateArr[2],
                rate4: rateArr[3],
                rate5: rateArr[4],
                avg: rateAvg
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
      }, {
        dataField: 'avg',
        text: 'Avg'
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