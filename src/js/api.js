const baseUrl = "https://airlabs.co/api/v9";
const apiKey = import.meta.env.VITE_API_KEY;

export async function fetchLocation() {
  try {
    const response = await fetch("https://api.vatcomply.com/geolocate");
    let data = await response.json();
    const location = {
      name: data.name,
      code: data.iso2,
      flag: data.emoji,
    };
    console.log(location);
    return location;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    const countries = data.map((item) => ({
      name: item.name.common,
      continent: item.region,
      code: item.cca2,
    }));
    console.log(countries);
    return countries;
  } catch (err) {
    console.error("Error fetching countries: ", err);
  }
}

export async function fetchAirports(country) {
  try {
    const response = await fetch(
      `${baseUrl}/airports?api_key=${apiKey}&country_code=${country}`
    );
    let data = await response.json();
    const airports = data.response.filter((airport) => airport.iata_code);
    console.log(airports);
    return airports;
  } catch (err) {
    console.error("Error fetching airports: ", err);
  }
}

export async function fetchFlights(airport) {
  try {
    const response = await fetch(
      `${baseUrl}/schedules?api_key=${apiKey}&dep_iata=${airport}`
    );
    let data = await response.json();
    const flights = data.response;
    console.log(flights);
    return flights;
  } catch (err) {
    console.error("Error fetching flights: ", err);
  }
}
