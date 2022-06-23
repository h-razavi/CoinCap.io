let params = new URLSearchParams(document.location.search);
let coin_name = params.get("coin");

function coin_url(name) {
  return `https://api.coincap.io/v2/assets/${name}/history?interval=d1`;
}

async function get_coin() {
  let url = coin_url(coin_name);
  let respons = await fetch(url);
  let json = await respons.json();

  let data = json.data;

  let yValues = [];
  let xValues = [];

  data.forEach((item) => {
    yValues.push(item.priceUsd);
    xValues.push(item.time);
  });

  return {
    x: xValues,
    y: yValues,
  };
}

// ---  render CoinData to Page -----

get_coin().then(function (values) {
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: values.x,
      datasets: [
        {
          backgroundColor: "rgba(238,130,238,0.5)",
          borderColor: "rgba(255,0,0,1)",
          data: values.y,
        },
      ],
    },
    options: { yValues: values.y },
  });
});
