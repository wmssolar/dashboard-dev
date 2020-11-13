export const PieData = {
  chart: {
    styledMode: true,
    type: "pie",
    background: '#2a2a2b',
    options3d: {
      enabled: true,
      alpha: 45
    },
    width: "450px",
    height: "350px"
  },
  title: {
    text: "Charges per carrier"
  },
  subtitle: {
    text: "Includes minutes and Aircharges"
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [
    {
      name: "Carrier Revenue",
      data: [
        ["ALLIED WIRELESS COMMUN.CORP.", 34613.00],
        ["APPALACHIAN WIRELESS", 24561.00],
        ["AT&T MOBILITY", 65.02],
        ["BLUEGRASS CELLULAR INC", 53183.35],
        ["CELLCOM", 27970.12],
        ["ELEMENT MOBILE", 138.24],
        ["OPEN MOBILE", 69918.25],
        ["SPRINT PCS", 13040144.93],
        ["UNITED STATES CELLULAR", 949784.35],
        ["VZW-VERIZON WIRELESS", 68712969.06],
        ["WI-RSA LTD PTNRSHP", 1375.94]
      ]
    }
  ]
};
