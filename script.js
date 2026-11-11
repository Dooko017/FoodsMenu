const foodContainer = document.getElementById("foods");
const searchInput = document.getElementById("searchInput");

let foods = [];
let currentFoods = [];

const seeAllFoodList = async () => {
  const response = await fetch(
    "https://menu-api.parent-content-parent-content-service.workers.dev/foods",
  );
  foods = await response.json();

  currentFoods = foods;

  showFoods(foods);
};
const searchFoodByType = async (type) => {
  const response = await fetch(
    "https://menu-api.parent-content-parent-content-service.workers.dev/foods?type=" +
      type,
  );

  currentFoods = await response.json();

  showFoods(currentFoods);
};

const showFoods = (FoodList) => {
  foodContainer.textContent = "";

  foodContainer.className = "grid grid-cols-5 gap-8 w-200";

  FoodList.forEach((food) => {
    const box = document.createElement("div");
    box.className = "bg-violet-200 w-40 h-50 border-1 rounded-3xl ";

    const imageEl = document.createElement("img");
    imageEl.src = food.image;
    imageEl.className = " w-full h-30 rounded-3xl";
    box.appendChild(imageEl);

    const newTitle = document.createElement("h1");
    newTitle.textContent = food.title;
    newTitle.className = "text-sm px-2  ";
    box.appendChild(newTitle);

    const price = document.createElement("p");
    price.textContent = food.price + "₮";
    price.className = "text-sm px-2 pb-2 ";
    box.appendChild(price);

    const orts = document.createElement("p");
    orts.textContent = " Орц: " + food.ingredients;
    box.appendChild(orts);
    orts.className = "text-[6px] px-2 pb-2 ";

    foodContainer.appendChild(box);
  });
};

const searchFood = () => {
  const searchValue = searchInput.value.toLowerCase();
  const result = foods.filter((food) => {
    return food.title.toLowerCase().includes(searchValue);
  });
  showFoods(result);
};

seeAllFoodList();
