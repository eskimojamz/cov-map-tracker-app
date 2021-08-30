import { Line } from 'react-chartjs-2'
import { CountryContext } from '../App';
import { useState, useEffect, useContext } from 'react'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
        radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
        label: function (tooltipItem, data) {
            return numeral(tooltipItem.value).format("+0,0");
        },
        },
    },
    scales: {
        xAxes: [
        {
            type: "time",
            time: {
                unit: 'month',
                unitStepSize: 1,
                displayFormats: {
                    'month': 'MMM YY'
                },
                parser: 'MM YY'
            },
            title: {
                display: true,
                text: 'Date'
            }
        },
        ],
        yAxes: [
        {
            gridLines: {
            display: false,
            },
            ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
                return numeral(value).format("0a");
            },
            },
        },
        ],
    },
};

const buildChartDataWorld = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }

    return chartData;
};

const buildChartDataCountry = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.timeline[casesType]) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data.timeline[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data.timeline[casesType][date];
    }

    return chartData;
};

const CountryLineChart = ({ casesType }) => {
    const [data, setData] = useState({});
    const { selectedCountry, setSelectedCountry } = useContext(CountryContext)

    console.log(casesType)

    useEffect(() => {
      const fetchData = async () => {
        const url = 
            selectedCountry === "Worldwide"
            ? `https://disease.sh/v3/covid-19/historical/all?lastdays=all`
            : `https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=all`
        await fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (selectedCountry === "Worldwide"){
                let chartData = buildChartDataWorld(data, casesType);
                setData(chartData);
            } else{
                let chartData = buildChartDataCountry(data, casesType);
                setData(chartData);
            }
          });
      };
  
      fetchData();
    }, [selectedCountry, casesType]);

    return (
        <div className="chart h-64">
        {data?.length > 0 && (
            <Line 
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderCapStyle: "round",
                            borderColor: "#f54242",
                            borderWidth: 1,
                            data: data,
                        },
                    ],
                }}
                options={options}
            />
        )}
        </div>
    )
}

export default CountryLineChart
