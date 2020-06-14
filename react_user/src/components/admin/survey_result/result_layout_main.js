import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import BootstrapTable from 'react-bootstrap-table-next';

import ResultLayoutRate from './result_layout_rate';
import ResultLayoutComment from './result_layout_comment';

function ResultLayoutMain(props) {

    const [values, setValues] = useState([]);

    for (const [x, y] of props.value.entries()) {
        if (y.q_type === "Rate") {
            values.push({
                id: x+1,
                title: y.q_title,
                rate1: y.rate[0][1],
                rate2: y.rate[0][2],
                rate3: y.rate[0][3],
                rate4: y.rate[0][4],
                rate5: y.rate[0][5]
            });
        } else {
            values.push({
                id: x+1,
                title: y.q_title,
                comment: y.comment
            });
        }
    }

    const columns = [{
        dataField: 'id',
        text: '#',
        sort: true
      }, {
        dataField: 'title',
        text: 'Question',
        sort: true
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
        dataField: 'comment',
        text: 'Comments'
      }];

    return (
        <BootstrapTable 
            keyField="id"
            data={ values }
            columns={ columns } />
    )
}

export default ResultLayoutMain;