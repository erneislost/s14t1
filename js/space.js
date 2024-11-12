const contenedor = document.getElementById("contenedor");

document.getElementById("btnBuscar").addEventListener("click", function() {
    const search = document.getElementById("inputBuscar").value;
    if(!search) {
        alert("Debe ingresar almenos un carácter");
    } else fetchImages(search);
});

async function fetchImages(searchTerm) {
    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`)
        const data = await response.json();
        if(data.collection.items.length === 0) {
            contenedor.innerHTML = `<p>No se encontraron resultados para "${searchTerm}".</p>`;
        } else showImages(data.collection.items);
    } catch(error) {
        console.error("Error al obtener datos: ", error);
    }
}

function showImages(items) {
    contenedor.innerHTML = "";
    let htmlContentToAppend = `<div class="row g-4">`
    
    for(let item of items) {
        if(item.data && item.data[0] && item.links && item.links[0]) {
            const { title, description, date_created } = item.data[0];
            const card = `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="${item.links[0].href}" class="card-img-top img-fluid" style="object-fit: cover; height: 25vh" alt="${title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${title}</h5>
                        <div class="card-text-wrapper flex-fill overflow-auto" style="max-height: 15vh">
                            <p class="card-text">${description}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">${date_created}</small>
                    </div>
                </div>
            </div>
            `;
            htmlContentToAppend += card;
        }
    }

    htmlContentToAppend += `</div>`
    contenedor.innerHTML = htmlContentToAppend;
}