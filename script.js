document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    searchPlaces();
  });

async function searchPlaces() {
  const query = document.getElementById("query").value;
  const response = await fetch("http://127.0.0.1:5000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      query: query,
    }),
  });

  const data = await response.json();
  displayResults(data.places);
}

function displayResults(places) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (places.length === 0) {
    resultsContainer.innerHTML =
      "<p class='text-center'>Nenhum resultado encontrado.</p>";
  } else {
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered");
    table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>Site</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${places
                          .map(
                            (place) => `
                            <tr>
                                <td>${place.name}</td>
                                <td>${place.address}</td>
                                <td>${place.phone}</td>
                                <td>${
                                  place.website
                                    ? `<a href="${place.website}" target="_blank">${place.website}</a>`
                                    : "N/A"
                                }</td>
                            </tr>`
                          )
                          .join("")}
                    </tbody>
                `;
    resultsContainer.appendChild(table);
  }
}
