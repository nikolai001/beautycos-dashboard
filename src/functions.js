async function fetchLocation() {
    const response = await fetch("http://localhost:3000/Location/GetLocations", {
        method: "GET",
        headers: {
            cors: "cors",
            XApiKey: "b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3",
            Accept: "application/json",
        },
    })
    const data = await response.json()
    return data;
}

async function fetchUtc() {
    const response = await fetch("http://localhost:3000/Location/GetUtcNow", {
        method: "GET",
        headers: {
            cors: "cors",
            XApiKey: "b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3",
            Accept: "application/json",
        },
    })
    const data = response.json()
    return data;
}

async function fetchLong(currentUtc) {
    const response = await fetch("http://localhost:3000/Location/LongPull", {
        method: "POST",
        headers: {
            cors: "cors",
            XApiKey: "b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3",
            Accept: "application/json",
        },
        body: {
            'last_pull': currentUtc
        }
    })
    const data = response.json()
    return data;
}

export { fetchLocation, fetchUtc, fetchLong }