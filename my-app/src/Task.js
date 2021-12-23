import { useEffect, useState } from "react";
import axios from "axios";

function Task() {
  const [api, setApi] = useState([]);
  useEffect(() => {
    async function getData() {
      let foodData = await axios.get(`https://lfapi.html5.run/weeks`);
      console.log(await foodData.data);
      let awiatedResults = await foodData.data;
      let prepareData = [];
      awiatedResults.map((curr) => {
        let daysFindToDeliver = Object.keys(curr.deliveryDays).map((elementName) => {
            if (curr.deliveryDays[elementName] == true) {
              return elementName;
            }
          }).filter((e) => {
            return e != undefined;
          });

        let findHowManyMealsInTheSpecifiedDays = curr.meals.reduce((acc, curr) => {
            if (daysFindToDeliver.includes(curr.name.toLowerCase())) {
              acc.push({ dayName: curr.name, mealsLength: curr.meals.length });
            }
            return acc;
          },
          []
        );
        
        return prepareData.push({
          weekName: curr.week,
          mealsCollectionByDeliveryDays: findHowManyMealsInTheSpecifiedDays,
        });
      }, []);
      setApi(prepareData);
    }
    getData();
  }, []);

  return (
    <div className='Task'>
      {api.map((element) => (
        <>
        <ul>
          {element.mealsCollectionByDeliveryDays.map((subElement) => (
            <>
            <li>
            {element.weekName} {subElement.dayName} has {subElement.mealsLength} meals
            </li>
            </>
          ))}
          </ul>
        </>
      ))}
    </div>
  );
}

export default Task;
