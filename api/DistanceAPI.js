import { GOOGLE_API_KEY } from "@env";

//Function to call the backend Google API
const distanceApi = async (
  start,
  destin1,
  destin2,
  destin3,
  destin4,
  destin5,
  destin6
) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start}&destinations=${destin1}|${destin2}|${destin3}|${destin4}|${destin5}|${destin6}&key=${GOOGLE_API_KEY}`
  );
  let sortedDuration = [];

  try {
    const json = await response.json();

    //Looping through the returned array of elements from json and converting those into an array of objects that are sorted by distance
    json.rows[0].elements.forEach((element, index) => {
      const distanceObj = element.distance;

      for (let time in distanceObj) {
        if (time == "value") {
          sortedDuration.push({
            key: Math.random(),
            value: distanceObj[time],
            name: json.destination_addresses[index],
            text: element.distance.text,
          });
        }
      }
    });

    return sortedDuration.sort((a, b) => a.value - b.value);
  } catch (error) {
    console.log(error);
  }
};

export default distanceApi;
