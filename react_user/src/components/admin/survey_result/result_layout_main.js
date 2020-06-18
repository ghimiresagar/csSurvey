import React, { useState } from 'react';
import SurveyBarchart from './survey_barchart';

import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';

function ResultLayoutMain(props) {

    const [valuesRates, setValuesRates] = useState([]);
    const [valuesComments, setValuesComments] = useState([]);
    const [barShow, setBarShow] = useState(false);
    let [barChart, setBarChart] = useState(null);

    for (const [x, y] of props.value.entries()) {
        if (y.q_type === "Rate") {

            let rateArr = [y.rate['0'], y.rate['1'], y.rate['2'], y.rate['3'], y.rate['4'], y.rate['5']];
            let total = [y.rate['0'] * 0, y.rate['1'] * 1, y.rate['2'] * 2, y.rate['3'] * 3, y.rate['4'] * 4, y.rate['5'] * 5];
            let sumTotal = total.reduce((a, b) => a+b, 0);
            let rateAvg = sumTotal / props.numberOfParts;
            let perArr = rateArr.map(element => (element*100/props.numberOfParts).toPrecision(3));

            valuesRates.push({
                id: x+1,
                title: y.q_title,
                rate0: rateArr[0],
                rate1: rateArr[1],
                rate2: rateArr[2],
                rate3: rateArr[3],
                rate4: rateArr[4],
                rate5: rateArr[5],
                avg: rateAvg.toPrecision(3),
                per0: perArr[0],
                per1: perArr[1],
                per2: perArr[2],
                per3: perArr[3],
                per4: perArr[4],
                per5: perArr[5],
                graph: <Button onClick={(e) => showGraph(e, y.q_title, rateArr)} >
                        { barShow ? "Close" : "Graph" }
                        </Button>
            });
        } else {
            valuesComments.push({
                id: x+1,
                title: y.q_title,
                comment: y.comment+" "
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
          width: '60%', textAlign: 'center'
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
        dataField: 'rate0',
        text: 'N/A'
      }, {
        dataField: 'avg',
        text: 'Avg'
      }, {
        dataField: 'per5',
        text: '5%'
      }, {
        dataField: 'per4',
        text: '4%'
      }, {
        dataField: 'per3',
        text: '3%'
      }, {
        dataField: 'per2',
        text: '2%'
      }, {
        dataField: 'per1',
        text: '1%'
      }, {
        dataField: 'per0',
        text: 'N/A%'
      }, {
        dataField: 'graph',
        text: 'Graph'
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

    function showGraph(e, title, rateArray) {
        e.preventDefault();
        // needs to render everything to toggel the value of the button
        setValuesComments([]);
        setValuesRates([]);
        
        if (barShow === true) {
          setBarShow(false);
          setBarChart(null);
        } else {
          setBarShow(true);
          setBarChart(<SurveyBarchart title={title} rateArray={rateArray} />);
        }
    }

    function hideGraph(e) {
      // close the barchart shown
      e.preventDefault();
      setValuesComments([]);
      setValuesRates([]);
      setBarShow(false);
      setBarChart(null);
    }

    return (
      <>
        { barShow ? barChart : null }
        
        <div className="text-center">
          { barShow ? 
            <Button variant="danger" onClick={hideGraph} > Close </Button>
          : null}
          <br></br><br />
        </div>

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