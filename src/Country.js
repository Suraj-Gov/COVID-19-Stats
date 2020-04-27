import React, { useState, useEffect } from "react";

export default function Country({ country }) {
  const [isLoaded, setIsLoaded] = useState(false);
  let [countryStat, setCountryStat] = useState([]);
  let [countryDetails, setCountryDetails] = useState([]);
  const continents = {
    BD: "Asia",
    BE: "Europe",
    BF: "Africa",
    BG: "Europe",
    BA: "Europe",
    BB: "North America",
    WF: "Oceania",
    BL: "North America",
    BM: "North America",
    BN: "Asia",
    BO: "South America",
    BH: "Asia",
    BI: "Africa",
    BJ: "Africa",
    BT: "Asia",
    JM: "North America",
    BV: "Antarctica",
    BW: "Africa",
    WS: "Oceania",
    BQ: "North America",
    BR: "South America",
    BS: "North America",
    JE: "Europe",
    BY: "Europe",
    BZ: "North America",
    RU: "Europe",
    RW: "Africa",
    RS: "Europe",
    TL: "Oceania",
    RE: "Africa",
    TM: "Asia",
    TJ: "Asia",
    RO: "Europe",
    TK: "Oceania",
    GW: "Africa",
    GU: "Oceania",
    GT: "North America",
    GS: "Antarctica",
    GR: "Europe",
    GQ: "Africa",
    GP: "North America",
    JP: "Asia",
    GY: "South America",
    GG: "Europe",
    GF: "South America",
    GE: "Asia",
    GD: "North America",
    GB: "Europe",
    GA: "Africa",
    SV: "North America",
    GN: "Africa",
    GM: "Africa",
    GL: "North America",
    GI: "Europe",
    GH: "Africa",
    OM: "Asia",
    TN: "Africa",
    JO: "Asia",
    HR: "Europe",
    HT: "North America",
    HU: "Europe",
    HK: "Asia",
    HN: "North America",
    HM: "Antractica",
    VE: "South America",
    PR: "North America",
    PS: "Asia",
    PW: "Oceania",
    PT: "Europe",
    SJ: "Europe",
    PY: "South America",
    IQ: "Asia",
    PA: "North America",
    PF: "Oceania",
    PG: "Oceania",
    PE: "South America",
    PK: "Asia",
    PH: "Asia",
    PN: "Oceania",
    PL: "Europe",
    PM: "North America",
    ZM: "Africa",
    EH: "Africa",
    EE: "Europe",
    EG: "Africa",
    ZA: "Africa",
    EC: "South America",
    IT: "Europe",
    VN: "Asia",
    SB: "Oceania",
    ET: "Africa",
    SO: "Africa",
    ZW: "Africa",
    SA: "Asia",
    ES: "Europe",
    ER: "Africa",
    ME: "Europe",
    MD: "Europe",
    MG: "Africa",
    MF: "North America",
    MA: "Africa",
    MC: "Europe",
    UZ: "Asia",
    MM: "Asia",
    ML: "Africa",
    MO: "Asia",
    MN: "Asia",
    MH: "Oceania",
    MK: "Europe",
    MU: "Africa",
    MT: "Europe",
    MW: "Africa",
    MV: "Asia",
    MQ: "North America",
    MP: "Oceania",
    MS: "North America",
    MR: "Africa",
    IM: "Europe",
    UG: "Africa",
    TZ: "Africa",
    MY: "Asia",
    MX: "North America",
    IL: "Asia",
    FR: "Europe",
    IO: "Asia",
    SH: "Africa",
    FI: "Europe",
    FJ: "Oceania",
    FK: "South America",
    FM: "Oceania",
    FO: "Europe",
    NI: "North America",
    NL: "Europe",
    NO: "Europe",
    NA: "Africa",
    VU: "Oceania",
    NC: "Oceania",
    NE: "Africa",
    NF: "Oceania",
    NG: "Africa",
    NZ: "Oceania",
    NP: "Asia",
    NR: "Oceania",
    NU: "Oceania",
    CK: "Oceania",
    XK: "Europe",
    CI: "Africa",
    CH: "Europe",
    CO: "South America",
    CN: "Asia",
    CM: "Africa",
    CL: "South America",
    CC: "Asia",
    CA: "North America",
    CG: "Africa",
    CF: "Africa",
    CD: "Africa",
    CZ: "Europe",
    CY: "Europe",
    CX: "Asia",
    CR: "North America",
    CW: "North America",
    CV: "Africa",
    CU: "North America",
    SZ: "Africa",
    SY: "Asia",
    SX: "North America",
    KG: "Asia",
    KE: "Africa",
    SS: "Africa",
    SR: "South America",
    KI: "Oceania",
    KH: "Asia",
    KN: "North America",
    KM: "Africa",
    ST: "Africa",
    SK: "Europe",
    KR: "Asia",
    SI: "Europe",
    KP: "Asia",
    KW: "Asia",
    SN: "Africa",
    SM: "Europe",
    SL: "Africa",
    SC: "Africa",
    KZ: "Asia",
    KY: "North America",
    SG: "Asia",
    SE: "Europe",
    SD: "Africa",
    DO: "North America",
    DM: "North America",
    DJ: "Africa",
    DK: "Europe",
    VG: "North America",
    DE: "Europe",
    YE: "Asia",
    DZ: "Africa",
    US: "North America",
    UY: "South America",
    YT: "Africa",
    UM: "Oceania",
    LB: "Asia",
    LC: "North America",
    LA: "Asia",
    TV: "Oceania",
    TW: "Asia",
    TT: "North America",
    TR: "Asia",
    LK: "Asia",
    LI: "Europe",
    LV: "Europe",
    TO: "Oceania",
    LT: "Europe",
    LU: "Europe",
    LR: "Africa",
    LS: "Africa",
    TH: "Asia",
    TF: "Antarctica",
    TG: "Africa",
    TD: "Africa",
    TC: "North America",
    LY: "Africa",
    VA: "Europe",
    VC: "North America",
    AE: "Asia",
    AD: "Europe",
    AG: "North America",
    AF: "Asia",
    AI: "North America",
    VI: "North America",
    IS: "Europe",
    IR: "Asia",
    AM: "Asia",
    AL: "Europe",
    AO: "Africa",
    AQ: "Antarctica",
    Asia: "Oceania",
    AR: "South America",
    AU: "Oceania",
    AT: "Europe",
    AW: "North America",
    IN: "Asia",
    AX: "Europe",
    AZ: "Asia",
    IE: "Europe",
    ID: "Asia",
    UA: "Europe",
    QA: "Asia",
    MZ: "Africa",
  };
  useEffect(() => {
    fetch(`https://api.covid19api.com/total/country/${country}`)
      .then((res) => res.json())
      .then(function (receivedJSON) {
        setIsLoaded(true);
        setCountryStat(receivedJSON[receivedJSON.length - 1]);
      });
  }, [country]);
  useEffect(() => {
    fetch(`https://api.covid19api.com/live/country/${country}`)
      .then((res) => res.json())
      .then(function (receivedJSON) {
        setCountryDetails(receivedJSON[receivedJSON.length - 1]);
      });
  }, [country]);

  if (!isLoaded)
    return (
      <div className="country">
        <div className="loading-bg"></div>
        <div className="country-detail">
          <div className="country-flag">Loading...</div>
          <h3>Loading...</h3>
          <h6>Loading...</h6>
        </div>
        <div className="stat-box-container">
          <div className="confirmed stat-box">
            <p className="heading">Confirmed</p>
            <p className="count">Loading...</p>
          </div>
          <div className="active stat-box">
            <p className="heading">Active</p>
            <p className="count">Loading...</p>
          </div>
          <div className="recovered stat-box">
            <p className="heading">Recovered</p>
            <p className="count">Loading...</p>
          </div>
          <div className="deceased stat-box">
            <p className="heading">Deceased</p>
            <p className="count">Loading...</p>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div className="country">
        <img
          className="country-flag"
          src={
            "https://www.countryflags.io/" +
            countryDetails.CountryCode +
            "/flat/64.png"
          }
          alt={countryStat.Country}
        />
        <div className="country-detail">
          <h3>{countryStat.Country}</h3>
          <h6>{continents[countryDetails.CountryCode]}</h6>
        </div>
        <div className="stat-box-container">
          <div className="confirmed stat-box">
            <p className="heading">Confirmed</p>
            <p className="count">{countryStat.Confirmed}</p>
          </div>
          <div className="active stat-box">
            <p className="heading">Active</p>
            <p className="count">
              {countryStat.Confirmed -
                countryStat.Recovered -
                countryStat.Deaths}
            </p>
          </div>
          <div className="recovered stat-box">
            <p className="heading">Recovered</p>
            <p className="count">{countryStat.Recovered}</p>
          </div>
          <div className="deceased stat-box">
            <p className="heading">Deceased</p>
            <p className="count">{countryStat.Deaths}</p>
          </div>
        </div>
      </div>
    );
  }
}
