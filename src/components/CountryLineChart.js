import { Line } from 'react-chartjs-2'
import { CasesTypeContext, CountryContext } from '../App';
import { useState, useEffect, useContext } from 'react'
import numeral from 'numeral'

const options = {
    plugins: {
        legend: {
            display: false,
        },
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
            type: "linear",
            title: {
                display: true,
                text: 'Date'
            },
        },
        ],
        yAxes: [
        {
            ticks: {
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
    if (data.timeline) {
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
    } else {
        let chartData = "noData"
        return chartData;
    }
};

const CountryLineChart = () => {
    const [data, setData] = useState({});
    const { selectedCountry, setSelectedCountry } = useContext(CountryContext)
    const { casesType, setCasesType } = useContext(CasesTypeContext)
    const [chartColor, setChartColor] = useState('#2675F4')

    console.log(chartColor)

    useEffect(() => {
        if (casesType === 'cases') {
            setChartColor('#2675F4')
        } else if (casesType === 'deaths'){
            setChartColor('#F4323C')
        } else if(casesType === 'recovered'){
            setChartColor('#00B376')
        }
    }, [casesType])

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
        <div className="chart h-72 w-full flex justify-center items-center bg-white rounded-md p-2 pr-0 mt-4">
        {data?.length > 6 && (
            <Line 
                data={{
                    datasets: [
                        {
                            backgroundColor: `${chartColor}`,
                            borderCapStyle: "round",
                            borderColor: `${chartColor}`,
                            borderWidth: 1,
                            data: data,
                            fill: true,
                            label: casesType
                        },
                    ],
                }}
                options={options}
            />
        )}
        {data === "noData" && (
            <h1>Historical Data Not Available</h1>
        )}
        </div>
    )
}

export default CountryLineChart
