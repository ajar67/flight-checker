import { fetchDepFlights } from "../js/api";
import { heroDiv, template } from "../js/const";
import FlightsList from "./FlightsList";

export default class DepartureFlightsList extends FlightsList {
  constructor(countryCode) {
    super(countryCode);
  }
  async createList(airportCode) {
    this.showClearButton();
    heroDiv.classList.add("hidden");

    await this.fetchAirlines();
    const flights = await fetchDepFlights(airportCode);
    const validFlights = await this.getValidFlights(flights);
    const sortedFlights = this.sortFlights(validFlights);

    const table = document.importNode(template.content, true);
    const tableDiv = table.querySelector("div");
    tableDiv.id = "dep-table";
    const title = table.querySelector("#table-title");
    title.textContent = "departure";
    const tableBody = table.querySelector("#table-content");

    for (let flight of sortedFlights) {
      if (this.flightCounter >= 50) {
        break;
      }
      const row = this.createFlightRow(flight);
      tableBody.appendChild(row);
      this.flightCounter++;
    }

    const tableContainer = document.querySelector("#dep-container");
    tableContainer.appendChild(table);
  }
}